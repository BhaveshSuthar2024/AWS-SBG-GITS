import React, { useEffect, useRef } from "react";

/* =====================================================================
   CONFIGURATION
   Tune counts, speeds, opacities, colors and spacing here without
   touching any rendering logic below.
===================================================================== */
const CONFIG = {
  colors: {
    background: "#050816",
    grid: "rgba(255,255,255,0.04)",
    cloudBlue: "#E5A05A",
    auroraPurple: "#B96636",
    awsOrange: "#FF9900",
    white: "#F8FAFC",
  },
  grid: {
    spacing: 84,
    parallaxStrength: 10,
    scrollStrength: 14,
  },
  cards: {
    counts: { desktop: 32, tablet: 18, mobile: 8 },
    minOpacity: 0.08,
    maxOpacity: 0.18,
    maxFloatOffset: 20,
    depthLayers: [
      { speed: 0.15, scale: 0.82, parallax: 6, opacity: 0.7 },
      { speed: 0.28, scale: 1.0, parallax: 14, opacity: 0.9 },
      { speed: 0.42, scale: 1.18, parallax: 24, opacity: 1.0 },
    ],
    minGap: 130,
  },
  graphs: {
    // Free-roaming node field, scattered across the whole viewport.
    // Connections form and break purely based on live proximity.
    nodeCounts: { desktop: 60, tablet: 34, mobile: 14 },
    connectDistance: 150,
    disconnectDistance: 210,
    connectEase: 0.05,
    lifespan: [14000, 26000],
    fadeSpeed: 0.02,
    wanderJitter: 0.0026,
    maxSpeed: 0.075,
    edgeMargin: 90,
    edgeSteer: 0.0009,
    repelRadius: 130,
    repelStrength: 34,
    restoreEase: 0.04,
    lineOpacity: 0.85,
    nodeOpacity: [0.12, 0.32],
    parallax: 8,
  },
  packets: {
    spawnIntervalMs: [400, 1100],
    minEdgeStrength: 0.55,
    speed: 0.014,
  },
  particles: {
    counts: { desktop: 55, tablet: 32, mobile: 16 },
    maxOpacity: 0.24,
    speed: 0.18,
  },
  mouse: {
    ease: 0.06,
  },
};

const LIGHT_THEME = {
  colors: {
    background: "#fffaec",
    grid: "rgba(255, 153, 0, 0.1)",
    cloudBlue: "#ff9500",
    auroraPurple: "#ff8800",
    awsOrange: "#ff9d0b",
    white: "#ffffff",
  },
};

/* Category -> icon shape + accent color, applied to AWS service badges. */
const CATEGORIES = {
  compute: { icon: "cube", color: CONFIG.colors.awsOrange },
  storage: { icon: "bucket", color: CONFIG.colors.cloudBlue },
  database: { icon: "disc", color: CONFIG.colors.cloudBlue },
  network: { icon: "globe", color: CONFIG.colors.auroraPurple },
  security: { icon: "shield", color: CONFIG.colors.white },
  monitor: { icon: "gauge", color: CONFIG.colors.cloudBlue },
  messaging: { icon: "queue", color: CONFIG.colors.auroraPurple },
  ai: { icon: "spark", color: CONFIG.colors.auroraPurple },
  analytics: { icon: "chart", color: CONFIG.colors.awsOrange },
  devops: { icon: "gear", color: CONFIG.colors.cloudBlue },
  iot: { icon: "antenna", color: CONFIG.colors.cloudBlue },
};

const AWS_SERVICES = [
  // Compute
  ["Lambda", "compute"],
  ["EC2", "compute"],
  ["ECS", "compute"],
  ["EKS", "compute"],
  ["Fargate", "compute"],
  ["Elastic Beanstalk", "compute"],
  ["App Runner", "compute"],
  ["Batch", "compute"],
  ["Lightsail", "compute"],
  ["Outposts", "compute"],
  // Storage
  ["S3", "storage"],
  ["EBS", "storage"],
  ["EFS", "storage"],
  ["FSx", "storage"],
  ["Storage Gateway", "storage"],
  ["Backup", "storage"],
  // Database
  ["DynamoDB", "database"],
  ["Aurora", "database"],
  ["RDS", "database"],
  ["Elasticache", "database"],
  ["Redshift", "database"],
  ["Neptune", "database"],
  ["DocumentDB", "database"],
  ["Timestream", "database"],
  ["QLDB", "database"],
  // Networking
  ["CloudFront", "network"],
  ["Route 53", "network"],
  ["VPC", "network"],
  ["API Gateway", "network"],
  ["Direct Connect", "network"],
  ["Transit Gateway", "network"],
  ["PrivateLink", "network"],
  ["Global Accelerator", "network"],
  ["WAF", "network"],
  ["Shield", "network"],
  // Security
  ["IAM", "security"],
  ["Secrets Manager", "security"],
  ["Cognito", "security"],
  ["KMS", "security"],
  // Monitoring
  ["CloudWatch", "monitor"],
  ["X-Ray", "monitor"],
  // Messaging / integration
  ["SNS", "messaging"],
  ["SQS", "messaging"],
  ["EventBridge", "messaging"],
  ["Step Functions", "messaging"],
  ["AppSync", "messaging"],
  ["Kinesis", "messaging"],
  ["MSK", "messaging"],
  // AI / ML
  ["Bedrock", "ai"],
  ["Rekognition", "ai"],
  ["Textract", "ai"],
  ["SageMaker", "ai"],
  ["Comprehend", "ai"],
  ["Polly", "ai"],
  ["Lex", "ai"],
  ["Translate", "ai"],
  ["Transcribe", "ai"],
  ["Personalize", "ai"],
  ["Forecast", "ai"],
  // Analytics
  ["OpenSearch", "analytics"],
  ["Athena", "analytics"],
  ["Glue", "analytics"],
  ["MediaConvert", "analytics"],
  ["QuickSight", "analytics"],
  ["DataSync", "analytics"],
  // DevOps / management
  ["CloudFormation", "devops"],
  ["CodePipeline", "devops"],
  ["CodeBuild", "devops"],
  ["CloudTrail", "devops"],
  ["Config", "devops"],
  ["Systems Manager", "devops"],
  ["Organizations", "devops"],
  ["Control Tower", "devops"],
  ["Service Catalog", "devops"],
  ["Amplify", "devops"],
  // IoT
  ["IoT Core", "iot"],
  ["Greengrass", "iot"],
];

/* =====================================================================
   UTILITIES
===================================================================== */
const lerp = (a, b, t) => a + (b - a) * t;
const rand = (min, max) => min + Math.random() * (max - min);
const pick = (arr) => arr[(Math.random() * arr.length) | 0];
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

function getTier(width) {
  if (width < 640) return "mobile";
  if (width < 1200) return "tablet";
  return "desktop";
}

function hexToRgb(hex) {
  const m = hex.replace("#", "");
  const num = parseInt(m, 16);
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}
const COLOR_CACHE = {};
function rgba(hex, alpha) {
  const key = hex + "_" + alpha;
  if (COLOR_CACHE[key]) return COLOR_CACHE[key];
  const { r, g, b } = hexToRgb(hex);
  const out = `rgba(${r},${g},${b},${alpha})`;
  COLOR_CACHE[key] = out;
  return out;
}

/* =====================================================================
   ICON DRAWING (small abstract glyphs, not copyrighted artwork)
===================================================================== */
function drawIcon(ctx, type, cx, cy, s, color, alpha) {
  ctx.save();
  ctx.strokeStyle = rgba(
    color === CONFIG.colors.white ? "#F8FAFC" : color,
    alpha,
  );
  ctx.fillStyle = rgba(
    color === CONFIG.colors.white ? "#F8FAFC" : color,
    alpha * 0.6,
  );
  ctx.lineWidth = Math.max(0.6, s * 0.09);
  ctx.beginPath();
  switch (type) {
    case "cube":
      ctx.rect(cx - s / 2, cy - s / 2, s, s);
      ctx.stroke();
      ctx.moveTo(cx - s / 2, cy - s / 4);
      ctx.lineTo(cx + s / 2, cy - s / 4);
      ctx.stroke();
      break;
    case "bucket":
      ctx.moveTo(cx - s / 2, cy - s / 2);
      ctx.lineTo(cx - s / 2.6, cy + s / 2);
      ctx.lineTo(cx + s / 2.6, cy + s / 2);
      ctx.lineTo(cx + s / 2, cy - s / 2);
      ctx.closePath();
      ctx.stroke();
      break;
    case "disc":
      ctx.ellipse(cx, cy - s / 4, s / 2, s / 5, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.moveTo(cx - s / 2, cy - s / 4);
      ctx.lineTo(cx - s / 2, cy + s / 4);
      ctx.moveTo(cx + s / 2, cy - s / 4);
      ctx.lineTo(cx + s / 2, cy + s / 4);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(cx, cy + s / 4, s / 2, s / 5, 0, 0, Math.PI * 2);
      ctx.stroke();
      break;
    case "globe":
      ctx.arc(cx, cy, s / 2, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(cx, cy, s / 4, s / 2, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx - s / 2, cy);
      ctx.lineTo(cx + s / 2, cy);
      ctx.stroke();
      break;
    case "shield":
      ctx.moveTo(cx, cy - s / 2);
      ctx.lineTo(cx + s / 2, cy - s / 4);
      ctx.lineTo(cx + s / 2, cy + s / 6);
      ctx.quadraticCurveTo(cx + s / 2, cy + s / 2, cx, cy + s / 2);
      ctx.quadraticCurveTo(cx - s / 2, cy + s / 2, cx - s / 2, cy + s / 6);
      ctx.lineTo(cx - s / 2, cy - s / 4);
      ctx.closePath();
      ctx.stroke();
      break;
    case "gauge":
      ctx.arc(cx, cy, s / 2, Math.PI, 0);
      ctx.stroke();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + s / 3, cy - s / 4);
      ctx.stroke();
      break;
    case "queue":
      for (let i = -1; i <= 1; i++) {
        ctx.rect(cx - s / 2 + i * (s / 3), cy - s / 4, s / 4, s / 2);
      }
      ctx.stroke();
      break;
    case "spark":
      ctx.moveTo(cx, cy - s / 2);
      ctx.lineTo(cx + s / 6, cy - s / 8);
      ctx.lineTo(cx + s / 2, cy);
      ctx.lineTo(cx + s / 6, cy + s / 8);
      ctx.lineTo(cx, cy + s / 2);
      ctx.lineTo(cx - s / 6, cy + s / 8);
      ctx.lineTo(cx - s / 2, cy);
      ctx.lineTo(cx - s / 6, cy - s / 8);
      ctx.closePath();
      ctx.stroke();
      break;
    case "chart":
      ctx.moveTo(cx - s / 2, cy + s / 2);
      ctx.lineTo(cx - s / 2, cy - s / 4);
      ctx.moveTo(cx - s / 6, cy + s / 2);
      ctx.lineTo(cx - s / 6, cy - s / 2);
      ctx.moveTo(cx + s / 6, cy + s / 2);
      ctx.lineTo(cx + s / 6, cy);
      ctx.moveTo(cx + s / 2, cy + s / 2);
      ctx.lineTo(cx + s / 2, cy - s / 8);
      ctx.stroke();
      break;
    case "antenna":
      ctx.moveTo(cx, cy + s / 2);
      ctx.lineTo(cx, cy - s / 6);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy - s / 6, s / 4, Math.PI * 1.15, Math.PI * 1.85);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy - s / 6, s / 2.1, Math.PI * 1.15, Math.PI * 1.85);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy - s / 6, s / 8, 0, Math.PI * 2);
      ctx.fill();
      break;
    case "gear":
      ctx.arc(cx, cy, s / 3, 0, Math.PI * 2);
      ctx.stroke();
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        ctx.moveTo(cx + (Math.cos(a) * s) / 3, cy + (Math.sin(a) * s) / 3);
        ctx.lineTo(cx + (Math.cos(a) * s) / 2, cy + (Math.sin(a) * s) / 2);
      }
      ctx.stroke();
      break;
    default:
      ctx.arc(cx, cy, s / 3, 0, Math.PI * 2);
      ctx.stroke();
  }
  ctx.restore();
}

/* =====================================================================
   FLOATING SERVICE CARD
===================================================================== */
class ServiceCard {
  constructor(width, height, layerIndex) {
    this.layerIndex = layerIndex;
    this.reset(width, height, true);
  }

  reset(width, height, initial = false) {
    const [name, cat] = pick(AWS_SERVICES);
    this.name = name;
    this.category = CATEGORIES[cat];
    this.w = rand(74, 96);
    this.h = 34;
    this.baseOpacity = rand(CONFIG.cards.minOpacity, CONFIG.cards.maxOpacity);
    this.dir = pick(["lr", "rl", "tb", "bt"]);
    const layer = CONFIG.cards.depthLayers[this.layerIndex];
    const speed = rand(0.08, 0.22) * layer.speed * 4;

    if (initial) {
      this.x = rand(0, width);
      this.y = rand(0, height);
    } else if (this.dir === "lr") {
      this.x = -this.w;
      this.y = rand(0, height);
    } else if (this.dir === "rl") {
      this.x = width + this.w;
      this.y = rand(0, height);
    } else if (this.dir === "tb") {
      this.x = rand(0, width);
      this.y = -this.h;
    } else {
      this.x = rand(0, width);
      this.y = height + this.h;
    }

    this.vx =
      this.dir === "lr"
        ? speed
        : this.dir === "rl"
          ? -speed
          : rand(-0.03, 0.03);
    this.vy =
      this.dir === "tb"
        ? speed
        : this.dir === "bt"
          ? -speed
          : rand(-0.03, 0.03);

    this.floatPhase = rand(0, Math.PI * 2);
    this.floatSpeed = rand(0.15, 0.35);
    this.age = 0;
  }

  update(dt, width, height, mouseX, mouseY) {
    this.age += dt;
    this.x += this.vx * dt;
    this.y += this.vy * dt;

    const margin = 140;
    if (
      this.x < -margin ||
      this.x > width + margin ||
      this.y < -margin ||
      this.y > height + margin
    ) {
      this.reset(width, height, false);
    }
  }

  draw(ctx, width, height, mouseX, mouseY, time) {
    const layer = CONFIG.cards.depthLayers[this.layerIndex];
    const floatY =
      Math.sin(time * this.floatSpeed + this.floatPhase) *
      CONFIG.cards.maxFloatOffset *
      0.5;
    const floatX =
      Math.cos(time * this.floatSpeed * 0.7 + this.floatPhase) *
      CONFIG.cards.maxFloatOffset *
      0.3;

    const px = this.x + floatX - mouseX * layer.parallax;
    const py = this.y + floatY - mouseY * layer.parallax;
    const h = this.h * layer.scale;
    const maxWidth = width - 16;
    if (maxWidth <= 0 || height <= h + 16) return;

    ctx.save();
    ctx.font = `${10 * layer.scale}px 'JetBrains Mono', monospace`;
    const textWidth = ctx.measureText(this.name).width;
    const w = Math.min(
      Math.max(this.w * layer.scale, textWidth + 38 * layer.scale),
      maxWidth,
    );
    const availableTextWidth = Math.max(0, w - 38 * layer.scale);
    let label = this.name;
    if (ctx.measureText(label).width > availableTextWidth) {
      while (
        label.length > 0 &&
        ctx.measureText(`${label}…`).width > availableTextWidth
      ) {
        label = label.slice(0, -1);
      }
      label = label ? `${label}…` : "";
    }

    const edgeFade = Math.max(60, w / 2);
    let fade = 1;
    if (px < edgeFade) fade = Math.min(fade, clamp(px / edgeFade, 0, 1));
    if (px > width - edgeFade)
      fade = Math.min(fade, clamp((width - px) / edgeFade, 0, 1));
    if (py < edgeFade) fade = Math.min(fade, clamp(py / edgeFade, 0, 1));
    if (py > height - edgeFade)
      fade = Math.min(fade, clamp((height - py) / edgeFade, 0, 1));

    const alpha = this.baseOpacity * layer.opacity * clamp(fade, 0, 1);
    if (alpha <= 0.002) {
      ctx.restore();
      return;
    }

    const x = clamp(px - w / 2, 8, width - w - 8);
    const y = clamp(py - h / 2, 8, height - h - 8);
    const radius = 8 * layer.scale;

    const theme = document.documentElement.getAttribute("data-theme");
    const colors = theme === "light" ? LIGHT_THEME.colors : CONFIG.colors;
    ctx.beginPath();
    roundRect(ctx, x, y, w, h, radius);
    ctx.fillStyle = rgba(colors.white, alpha * 0.05);
    ctx.fill();
    ctx.strokeStyle = rgba(colors.white, alpha * 0.14);
    ctx.lineWidth = 1;
    ctx.stroke();

    // Soft glow
    ctx.shadowColor = rgba(this.category.color, alpha * 0.5);
    ctx.shadowBlur = 10 * layer.scale;
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Icon badge
    drawIcon(
      ctx,
      this.category.icon,
      x + 16 * layer.scale,
      py,
      14 * layer.scale,
      this.category.color,
      alpha * 3.2,
    );
    // Label
    ctx.fillStyle = rgba(colors.white, alpha * 2.6);
    ctx.fillStyle = rgba(colors.white, alpha * 2.6);
    ctx.textBaseline = "middle";
    ctx.fillText(label, x + 30 * layer.scale, y + h / 2 + 0.5);
    ctx.restore();
  }
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/* =====================================================================
   NETWORK NODE
   A single free-roaming node in the network field. Nodes wander the
   entire viewport independently; edges are computed live from
   whichever nodes happen to be near each other (see NetworkField).
===================================================================== */
class NetworkNode {
  constructor(width, height) {
    this.reset(width, height, true);
  }

  reset(width, height, initial = false) {
    this.x = rand(0, width);
    this.y = rand(0, height);
    const angle = rand(0, Math.PI * 2);
    const speed = rand(CONFIG.graphs.maxSpeed * 0.3, CONFIG.graphs.maxSpeed);
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.r = rand(1.4, 2.6);
    const theme = document.documentElement.getAttribute("data-theme");
    const colors = theme === "light" ? LIGHT_THEME.colors : CONFIG.colors;
    this.color = pick([colors.cloudBlue, colors.white, colors.auroraPurple]);
    this.opacity = initial ? 0 : 0;
    this.targetOpacity = rand(...CONFIG.graphs.nodeOpacity);
    this.age = 0;
    this.lifespan = rand(...CONFIG.graphs.lifespan);
    this.dying = false;
  }

  update(dt, width, height, mouseX, mouseY, mouseActive) {
    this.age += dt * 16.6;

    if (!this.dying && this.age > this.lifespan) this.dying = true;

    const fade = CONFIG.graphs.fadeSpeed * dt;
    if (this.dying) {
      this.opacity = Math.max(0, this.opacity - fade);
      if (this.opacity <= 0.001) this.reset(width, height, false);
    } else {
      this.opacity = lerp(this.opacity, this.targetOpacity, fade);
    }

    // gentle random-walk wander so paths never look mechanical
    this.vx += rand(-1, 1) * CONFIG.graphs.wanderJitter * dt;
    this.vy += rand(-1, 1) * CONFIG.graphs.wanderJitter * dt;

    // steer back in from the edges so nodes roam the *whole* screen
    // instead of clustering at a fixed spot
    const m = CONFIG.graphs.edgeMargin;
    if (this.x < m) this.vx += CONFIG.graphs.edgeSteer * dt;
    if (this.x > width - m) this.vx -= CONFIG.graphs.edgeSteer * dt;
    if (this.y < m) this.vy += CONFIG.graphs.edgeSteer * dt;
    if (this.y > height - m) this.vy -= CONFIG.graphs.edgeSteer * dt;

    const speed = Math.hypot(this.vx, this.vy);
    if (speed > CONFIG.graphs.maxSpeed) {
      const s = CONFIG.graphs.maxSpeed / speed;
      this.vx *= s;
      this.vy *= s;
    }

    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.x = clamp(this.x, -20, width + 20);
    this.y = clamp(this.y, -20, height + 20);

    // mouse repel - independent per node, magnetic-field feel
    if (mouseActive) {
      const dx = this.x - mouseX;
      const dy = this.y - mouseY;
      const md = Math.hypot(dx, dy);
      if (md < CONFIG.graphs.repelRadius && md > 0.001) {
        const force =
          (1 - md / CONFIG.graphs.repelRadius) *
          CONFIG.graphs.repelStrength *
          0.02 *
          dt;
        this.x += (dx / md) * force;
        this.y += (dy / md) * force;
      }
    }
  }
}

/* =====================================================================
   NETWORK FIELD
   Manages the whole pool of nodes plus the live, distance-based edges
   between them. Edges fade in as nodes drift close and fade out again
   as they drift apart - nothing is pinned to a fixed cluster location.
===================================================================== */
class NetworkField {
  constructor(width, height, count) {
    this.nodes = Array.from(
      { length: count },
      () => new NetworkNode(width, height),
    );
    this.edges = new Map(); // "i_j" -> { strength, connected }
    this.packets = [];
    this.nextPacketAt = rand(...CONFIG.packets.spawnIntervalMs);
  }

  resize(count, width, height) {
    const nodes = this.nodes;
    if (count > nodes.length) {
      while (nodes.length < count) nodes.push(new NetworkNode(width, height));
    } else if (count < nodes.length) {
      nodes.length = count;
    }
  }

  update(dt, width, height, mouseX, mouseY, mouseActive) {
    const nodes = this.nodes;
    for (const node of nodes)
      node.update(dt, width, height, mouseX, mouseY, mouseActive);

    const connectD = CONFIG.graphs.connectDistance;
    const connectD2 = connectD * connectD;
    const disconnectD2 =
      CONFIG.graphs.disconnectDistance * CONFIG.graphs.disconnectDistance;
    const ease = CONFIG.graphs.connectEase * dt;
    const touched = this.touchedKeys || (this.touchedKeys = new Set());
    touched.clear();

    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 > disconnectD2) continue; // too far apart, never mind

        const key = i + "_" + j;
        let entry = this.edges.get(key);
        if (!entry) {
          entry = { strength: 0, connected: false };
          this.edges.set(key, entry);
        }

        if (d2 < connectD2) entry.connected = true;
        else if (d2 > disconnectD2) entry.connected = false;

        const target = entry.connected ? 1 : 0;
        entry.strength = lerp(entry.strength, target, ease);
        touched.add(key);
      }
    }

    // prune edges that have faded out and are no longer in range
    for (const [key, entry] of this.edges) {
      if (!touched.has(key)) {
        entry.connected = false;
        entry.strength = lerp(entry.strength, 0, ease);
        if (entry.strength < 0.01) this.edges.delete(key);
      }
    }

    // packets travelling along currently-active connections
    this.nextPacketAt -= dt * 16.6;
    if (this.nextPacketAt <= 0) {
      this.nextPacketAt = rand(...CONFIG.packets.spawnIntervalMs);
      const candidates = [];
      for (const [key, entry] of this.edges) {
        if (entry.strength >= CONFIG.packets.minEdgeStrength)
          candidates.push(key);
      }
      if (candidates.length) {
        const theme = document.documentElement.getAttribute("data-theme");
        const colors = theme === "light" ? LIGHT_THEME.colors : CONFIG.colors;
        const [i, j] = pick(candidates).split("_").map(Number);
        this.packets.push({
          i,
          j,
          t: 0,
          color: pick([
            colors.cloudBlue,
            colors.auroraPurple,
            colors.awsOrange,
            colors.white,
          ]),
        });
      }
    }
    this.packets = this.packets.filter(
      (p) => p.t < 1 && this.edges.has(p.i + "_" + p.j),
    );
    for (const p of this.packets) p.t += CONFIG.packets.speed * dt;
  }

  draw(ctx, mouseX, mouseY) {
    const parallax = CONFIG.graphs.parallax;
    const ox = -mouseX * parallax;
    const oy = -mouseY * parallax;
    const nodes = this.nodes;

    ctx.lineWidth = 1;
    for (const [key, entry] of this.edges) {
      if (entry.strength < 0.02) continue;
      const [i, j] = key.split("_").map(Number);
      const a = nodes[i];
      const b = nodes[j];
      if (!a || !b) continue;
      const alpha =
        entry.strength *
        Math.min(a.opacity, b.opacity) *
        CONFIG.graphs.lineOpacity;
      if (alpha < 0.003) continue;
      const theme = document.documentElement.getAttribute("data-theme");
      const colors = theme === "light" ? LIGHT_THEME.colors : CONFIG.colors;
      ctx.strokeStyle = rgba(colors.cloudBlue, alpha);
      ctx.beginPath();
      ctx.moveTo(a.x + ox, a.y + oy);
      ctx.lineTo(b.x + ox, b.y + oy);
      ctx.stroke();
    }

    for (const node of nodes) {
      if (node.opacity < 0.005) continue;
      const nx = node.x + ox;
      const ny = node.y + oy;
      ctx.beginPath();
      ctx.fillStyle = rgba(node.color, node.opacity);
      ctx.shadowColor = rgba(node.color, node.opacity * 0.8);
      ctx.shadowBlur = 4;
      ctx.arc(nx, ny, node.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    for (const p of this.packets) {
      const a = nodes[p.i];
      const b = nodes[p.j];
      if (!a || !b) continue;
      const nx = lerp(a.x, b.x, p.t) + ox;
      const ny = lerp(a.y, b.y, p.t) + oy;
      const fade = Math.sin(p.t * Math.PI);
      ctx.beginPath();
      ctx.fillStyle = rgba(p.color, 0.75 * fade);
      ctx.shadowColor = rgba(p.color, fade);
      ctx.shadowBlur = 6;
      ctx.arc(nx, ny, 1.8, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }
}

/* =====================================================================
   AMBIENT PARTICLE
===================================================================== */
class AmbientParticle {
  constructor(width, height) {
    this.reset(width, height);
  }
  reset(width, height) {
    this.x = rand(0, width);
    this.y = rand(0, height);
    this.size = rand(0.5, 1.6);
    this.speedX = rand(-1, 1) * CONFIG.particles.speed;
    this.speedY = rand(-1, 1) * CONFIG.particles.speed;
    const theme = document.documentElement.getAttribute("data-theme");
    const colors = theme === "light" ? LIGHT_THEME.colors : CONFIG.colors;
    this.alpha = rand(0.04, CONFIG.particles.maxOpacity);
    this.color = pick([colors.cloudBlue, colors.white, colors.auroraPurple]);
  }
  update(dt, width, height) {
    this.x += this.speedX * dt;
    this.y += this.speedY * dt;
    if (this.x < 0 || this.x > width || this.y < 0 || this.y > height)
      this.reset(width, height);
  }
  draw(ctx, mouseX, mouseY) {
    const dx = mouseX * 4;
    const dy = mouseY * 4;
    ctx.beginPath();
    ctx.fillStyle = rgba(this.color, this.alpha);
    ctx.arc(this.x - dx, this.y - dy, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

/* =====================================================================
   GRID LAYER
===================================================================== */
function drawGrid(ctx, width, height, mouseX, mouseY, scrollProgress) {
  const spacing = CONFIG.grid.spacing;
  const dx =
    -mouseX * CONFIG.grid.parallaxStrength +
    scrollProgress * CONFIG.grid.scrollStrength;
  const dy =
    -mouseY * CONFIG.grid.parallaxStrength -
    scrollProgress * (CONFIG.grid.scrollStrength * 0.6);
  const theme = document.documentElement.getAttribute("data-theme");
  const colors = theme === "light" ? LIGHT_THEME.colors : CONFIG.colors;

  ctx.strokeStyle = colors.grid;
  ctx.lineWidth = 1;
  ctx.beginPath();
  for (let x = (dx % spacing) - spacing; x < width + spacing; x += spacing) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
  }
  for (let y = (dy % spacing) - spacing; y < height + spacing; y += spacing) {
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
  }
  ctx.stroke();
}

/* =====================================================================
   MAIN COMPONENT
===================================================================== */
export default function InteractiveBackground({ scope = "viewport" }) {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, active: false });
  const scrollRef = useRef(0);
  const stateRef = useRef({
    cards: [],
    field: null,
    particles: [],
    tier: "desktop",
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const getBounds = () => scope === "hero"
      ? canvas.parentElement.getBoundingClientRect()
      : { left: 0, top: 0, width: window.innerWidth, height: window.innerHeight };
    let bounds = getBounds();
    let width = (canvas.width = Math.max(1, Math.round(bounds.width)));
    let height = (canvas.height = Math.max(1, Math.round(bounds.height)));
    let animationFrameId;
    let lastTime = performance.now();
    let lastFrameTime = 0;
    let isRunning = false;
    let isInView = scope !== "hero";
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isLowPowerDevice =
      navigator.deviceMemory <= 4 || navigator.connection?.saveData === true;
    const frameInterval = isLowPowerDevice
      ? 1000 / 20
      : width <= 768
        ? 1000 / 24
        : 1000 / 30;

    const buildScene = () => {
      const tier = isLowPowerDevice ? "mobile" : getTier(width);
      const state = stateRef.current;
      state.tier = tier;

      const cardCount = CONFIG.cards.counts[tier];
      state.cards = Array.from(
        { length: cardCount },
        (_, i) =>
          new ServiceCard(width, height, i % CONFIG.cards.depthLayers.length),
      );

      const nodeCount = CONFIG.graphs.nodeCounts[tier];
      state.field = new NetworkField(width, height, nodeCount);

      const particleCount = CONFIG.particles.counts[tier];
      state.particles = Array.from(
        { length: particleCount },
        () => new AmbientParticle(width, height),
      );
    };

    buildScene();

    const handleMouseMove = (e) => {
      const currentBounds = getBounds();
      const localX = e.clientX - currentBounds.left;
      const localY = e.clientY - currentBounds.top;
      mouse.current.targetX = (localX / width) * 2 - 1;
      mouse.current.targetY = (localY / height) * 2 - 1;
      mouse.current.active = true;
      mouse.current.rawX = localX;
      mouse.current.rawY = localY;
    };
    const handleMouseLeave = () => {
      mouse.current.active = false;
    };
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        bounds = getBounds();
        width = canvas.width = Math.max(1, Math.round(bounds.width));
        height = canvas.height = Math.max(1, Math.round(bounds.height));
        const newTier = isLowPowerDevice ? "mobile" : getTier(width);
        if (newTier !== stateRef.current.tier) {
          buildScene();
        }
      }, 200);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    const draw = (now) => {
      if (!isRunning) return;
      if (now - lastFrameTime < frameInterval) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }
      const dt = clamp(now - lastTime, 0, 48) / 16.6; // normalized to ~60fps steps
      lastTime = now;
      lastFrameTime = now;
      const time = now * 0.001;

      mouse.current.x = lerp(
        mouse.current.x,
        mouse.current.targetX,
        CONFIG.mouse.ease,
      );
      mouse.current.y = lerp(
        mouse.current.y,
        mouse.current.targetY,
        CONFIG.mouse.ease,
      );
      const mx = mouse.current.x;
      const my = mouse.current.y;

      ctx.clearRect(0, 0, width, height);

      const theme = document.documentElement.getAttribute("data-theme");
      const colors = theme === "light" ? LIGHT_THEME.colors : CONFIG.colors;

      // base background
      ctx.fillStyle = colors.background;
      ctx.fillRect(0, 0, width, height);

      const scrollProgress = scrollRef.current / Math.max(height, 1);

      // Layer 1+2: background + grid
      drawGrid(ctx, width, height, mx, my, scrollProgress);

      // ambient glows
      const g1x = width * 0.18 + Math.sin(time * 0.2) * width * 0.1 - mx * 30;
      const g1y =
        height * 0.22 + Math.cos(time * 0.16) * height * 0.14 - my * 30;
      const g1 = ctx.createRadialGradient(
        g1x,
        g1y,
        10,
        g1x,
        g1y,
        Math.max(width, height) * 0.4,
      );
      g1.addColorStop(0, rgba(colors.cloudBlue, 0.06));
      g1.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, width, height);

      const g2x = width * 0.82 + Math.cos(time * 0.14) * width * 0.12 - mx * 45;
      const g2y =
        height * 0.78 + Math.sin(time * 0.18) * height * 0.1 - my * 45;
      const g2 = ctx.createRadialGradient(
        g2x,
        g2y,
        10,
        g2x,
        g2y,
        Math.max(width, height) * 0.35,
      );
      g2.addColorStop(0, rgba(colors.auroraPurple, 0.04));
      g2.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, width, height);

      const state = stateRef.current;

      // Layer 5: ambient particles (drawn behind graphs/cards for depth)
      for (const p of state.particles) {
        p.update(dt, width, height);
        p.draw(ctx, mx, my);
      }

      // Layer 4: network graph field - scattered across the whole screen,
      // nodes wander freely and connections form/break live by proximity
      if (state.field) {
        state.field.update(
          dt,
          width,
          height,
          mouse.current.rawX || 0,
          mouse.current.rawY || 0,
          mouse.current.active,
        );
        state.field.draw(ctx, mx, my);
      }

      // Layer 3: floating service cards (sorted back-to-front by depth layer)
      for (const card of state.cards) {
        card.update(dt, width, height, mx, my);
        card.draw(ctx, width, height, mx, my, time);
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(draw);
      } else {
        isRunning = false;
      }
    };

    const start = () => {
      if (isRunning || document.hidden || !isInView) return;
      isRunning = true;
      lastTime = performance.now();
      animationFrameId = requestAnimationFrame(draw);
    };
    const stop = () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
    };
    const handleVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };
    const observer = scope === "hero" ? new IntersectionObserver(([entry]) => {
      isInView = entry.isIntersecting;
      if (isInView) start();
      else stop();
    }, { threshold: 0 }) : null;
    observer?.observe(canvas);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    if (isInView) start();

    return () => {
      stop();
      observer?.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearTimeout(resizeTimeout);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: scope === "hero" ? "absolute" : "fixed",
        top: 0,
        left: 0,
        width: scope === "hero" ? "100%" : "100vw",
        height: scope === "hero" ? "100%" : "100vh",
        zIndex: scope === "hero" ? 0 : -1,
        pointerEvents: "none",
        backgroundColor: "transparent",
      }}
    />
  );
}
