export const refractionLensVertexShader = `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec3 vWorldPosition;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    
    // Normal in world space
    vNormal = normalize(mat3(modelMatrix) * normal);
    
    // Direction from fragment to camera in world space
    vViewDir = normalize(cameraPosition - worldPosition.xyz);
    
    gl_Position = projectionMatrix * viewMatrix * worldPosition;
  }
`;

export const refractionLensFragmentShader = `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec3 vWorldPosition;
  varying vec2 vUv;

  uniform sampler2D uBackground;
  uniform vec2 uResolution;
  uniform float uIOR;
  uniform float uRefractionStrength;
  uniform float uChromaticAberration;
  uniform float uFresnelPower;
  uniform float uOpacity;
  uniform float uTime;
  uniform vec2 uCubeScreenCenter;
  uniform float uBgScale;
  uniform vec2 uBgOffset;

  // Authentic 7-color spectral diffraction function (Newton's Rainbow: ROYGBIV)
  // Red -> Orange -> Yellow -> Green -> Blue -> Indigo -> Violet
  vec3 getSpectral7(float phase) {
    float p = fract(phase) * 6.0;
    if (p < 1.0) {
      // 1. Red to 2. Orange
      return mix(vec3(1.0, 0.05, 0.05), vec3(1.0, 0.52, 0.0), p);
    } else if (p < 2.0) {
      // 2. Orange to 3. Yellow
      return mix(vec3(1.0, 0.52, 0.0), vec3(1.0, 0.95, 0.05), p - 1.0);
    } else if (p < 3.0) {
      // 3. Yellow to 4. Green
      return mix(vec3(1.0, 0.95, 0.05), vec3(0.05, 0.95, 0.25), p - 2.0);
    } else if (p < 4.0) {
      // 4. Green to 5. Blue
      return mix(vec3(0.05, 0.95, 0.25), vec3(0.0, 0.72, 1.0), p - 3.0);
    } else if (p < 5.0) {
      // 5. Blue to 6. Indigo
      return mix(vec3(0.0, 0.72, 1.0), vec3(0.28, 0.12, 0.95), p - 4.0);
    } else {
      // 6. Indigo to 7. Violet
      return mix(vec3(0.28, 0.12, 0.95), vec3(0.75, 0.05, 0.88), p - 5.0);
    }
  }

  void main() {
    vec3 N = normalize(vNormal);
    vec3 V = normalize(vViewDir);

    // Screen UV of current fragment [0.0, 1.0]
    vec2 screenUV = gl_FragCoord.xy / uResolution;

    // Aspect ratio correction
    float aspect = uResolution.x / uResolution.y;

    // Center background mapping behind the glass cube - scaled down texture coverage
    vec2 bgCenter = uCubeScreenCenter;
    vec2 offsetFromCenter = screenUV - bgCenter;
    vec2 bgUV = offsetFromCenter * vec2(1.0, 1.0 / aspect) * uBgScale + uBgOffset;

    // Multi-wavelength chromatic dispersion (R, G, B channels split through pure optical glass)
    float iorR = uIOR - uChromaticAberration;
    float iorG = uIOR;
    float iorB = uIOR + uChromaticAberration;

    vec3 refractR = refract(-V, N, 1.0 / iorR);
    vec3 refractG = refract(-V, N, 1.0 / iorG);
    vec3 refractB = refract(-V, N, 1.0 / iorB);

    if (length(refractR) < 0.01) refractR = reflect(-V, N);
    if (length(refractG) < 0.01) refractG = reflect(-V, N);
    if (length(refractB) < 0.01) refractB = reflect(-V, N);

    // Displace background sampling coordinates through surface normals - really low refraction
    float strength = uRefractionStrength;
    vec2 uvR = bgUV + refractR.xy * strength;
    vec2 uvG = bgUV + refractG.xy * strength;
    vec2 uvB = bgUV + refractB.xy * strength;

    // Minimal optical lens curvature (keeps image clear, crisp and undistorted)
    float distFromAxis = length(vUv - vec2(0.5));
    float barrel = 1.0 + 0.03 * distFromAxis * distFromAxis;
    uvR = (uvR - vec2(0.5)) * barrel + vec2(0.5);
    uvG = (uvG - vec2(0.5)) * barrel + vec2(0.5);
    uvB = (uvB - vec2(0.5)) * barrel + vec2(0.5);

    // Sample background texture: COMPLETELY CLEAR, NO ORANGE TINT/SHADE
    float colR = texture2D(uBackground, clamp(uvR, 0.001, 0.999)).r;
    float colG = texture2D(uBackground, clamp(uvG, 0.001, 0.999)).g;
    float colB = texture2D(uBackground, clamp(uvB, 0.001, 0.999)).b;

    vec3 clearGlassColor = vec3(colR, colG, colB);

    // Optical Fresnel Calculation (crystal clear transparency in center, reflective at grazing angles)
    float NdotV = max(0.0, dot(N, V));
    float fresnel = pow(1.0 - NdotV, uFresnelPower);
    float edgeSheen = pow(1.0 - NdotV, 5.5);

    // Pure White Studio Lighting Setup:
    // Key light: Pure white studio directional light from upper-right front
    vec3 whiteLightDir = normalize(vec3(0.65, 1.25, 1.35));
    vec3 halfKey = normalize(whiteLightDir + V);
    float keySpec = pow(max(0.0, dot(N, halfKey)), 95.0);
    float broadSpec = pow(max(0.0, dot(N, halfKey)), 24.0);

    // Secondary pure white rim light from left
    vec3 rimLightDir = normalize(vec3(-1.1, 0.2, -0.6));
    vec3 halfRim = normalize(rimLightDir + V);
    float rimSpec = pow(max(0.0, dot(N, halfRim)), 45.0);

    // =========================================================================
    // DIFFRACTION OF WHITE LIGHT INTO 7 SPECTRAL COLORS (ROYGBIV)
    // Pure white light strikes the glass facet bevels and diffracts into
    // the 7 rainbow spectral colors based on incidence angle and surface normal
    // =========================================================================
    float diffractionPhase = dot(N, whiteLightDir) * 2.8 + fresnel * 3.4 + dot(N, V) * 1.6;
    vec3 spectral7 = getSpectral7(diffractionPhase);

    // Composite: 100% CLEAR glass with ZERO orange shade inside
    vec3 color = clearGlassColor;

    // 1. White light diffracted into 7 rainbow colors at the bevel edges & facet boundaries
    color += spectral7 * fresnel * 0.85;
    color += spectral7 * edgeSheen * 1.25;

    // 2. Prismatic rainbow dispersion on white specular highlights
    // Brilliant white specular core with 7-color spectral fringe
    color += mix(vec3(1.0, 1.0, 1.0), spectral7, 0.70) * keySpec * 1.9;
    color += vec3(1.0, 1.0, 1.0) * broadSpec * 0.22;

    // 3. Crisp white rim specular highlight with subtle spectral diffraction
    color += mix(vec3(1.0, 1.0, 1.0), spectral7, 0.45) * rimSpec * 0.9;

    // Completely clear optical glass: high transparency in center, reflective at edges
    float alpha = clamp(uOpacity * (0.88 + fresnel * 0.12 + keySpec * 0.35), 0.0, 1.0);

    gl_FragColor = vec4(color, alpha);
  }
`;
