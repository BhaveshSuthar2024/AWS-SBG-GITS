import React, { useEffect, useRef } from "react";

const SKY_STOPS = [
  { t: 0, top: [11, 16, 42], mid: [42, 48, 92], bot: [196, 92, 38], sun: [255, 176, 80], glow: 0.55, stars: 0.15, night: 0.25 },
  { t: 0.08, top: [255, 107, 53], mid: [255, 168, 76], bot: [255, 214, 165], sun: [255, 244, 214], glow: 0.85, stars: 0, night: 0 },
  { t: 0.22, top: [77, 166, 255], mid: [135, 206, 235], bot: [244, 209, 155], sun: [255, 247, 209], glow: 0.7, stars: 0, night: 0 },
  { t: 0.4, top: [30, 107, 184], mid: [94, 177, 255], bot: [232, 200, 122], sun: [255, 252, 232], glow: 0.45, stars: 0, night: 0 },
  { t: 0.58, top: [42, 95, 158], mid: [232, 165, 75], bot: [212, 120, 42], sun: [255, 204, 102], glow: 0.7, stars: 0, night: 0 },
  { t: 0.78, top: [26, 21, 53], mid: [196, 61, 26], bot: [255, 107, 53], sun: [255, 94, 58], glow: 0.95, stars: 0.25, night: 0.45 },
  { t: 1, top: [5, 8, 22], mid: [26, 16, 40], bot: [61, 31, 20], sun: [255, 153, 0], glow: 0.35, stars: 1, night: 1 },
];

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function lerpColor(a, b, t) {
  return [
    Math.round(lerp(a[0], b[0], t)),
    Math.round(lerp(a[1], b[1], t)),
    Math.round(lerp(a[2], b[2], t)),
  ];
}

function sampleSky(progress) {
  const p = Math.min(1, Math.max(0, progress));
  let i = 0;
  while (i < SKY_STOPS.length - 1 && SKY_STOPS[i + 1].t < p) i += 1;
  const a = SKY_STOPS[i];
  const b = SKY_STOPS[Math.min(i + 1, SKY_STOPS.length - 1)];
  const span = b.t - a.t || 1;
  const t = (p - a.t) / span;
  return {
    top: lerpColor(a.top, b.top, t),
    mid: lerpColor(a.mid, b.mid, t),
    bot: lerpColor(a.bot, b.bot, t),
    sun: lerpColor(a.sun, b.sun, t),
    glow: lerp(a.glow, b.glow, t),
    stars: lerp(a.stars, b.stars, t),
    night: lerp(a.night, b.night, t),
    sunX: lerp(0.1, 0.9, p),
    sunY: 0.7 - Math.sin(p * Math.PI) * 0.5,
  };
}

function rgb(c, a = 1) {
  return `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${a})`;
}

export default function RajasthanScrollScene() {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const layersRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const stars = useRef([]);
  const dust = useRef([]);
  const birds = useRef([]);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isLowPowerDevice =
      navigator.deviceMemory <= 4 || navigator.connection?.saveData === true;
    const frameInterval = isLowPowerDevice
      ? 1000 / 20
      : window.innerWidth <= 768
        ? 1000 / 24
        : 1000 / 30;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const w = window.innerWidth;
      const h = window.innerHeight;
      const starCount = isLowPowerDevice ? 45 : 70;
      const dustCount = isLowPowerDevice ? 24 : 36;
      stars.current = Array.from({ length: starCount }, () => ({
        x: Math.random() * w,
        y: Math.random() * h * 0.55,
        r: Math.random() * 1.4 + 0.3,
        tw: Math.random() * Math.PI * 2,
      }));
      dust.current = Array.from({ length: dustCount }, () => ({
        x: Math.random() * w,
        y: h * 0.45 + Math.random() * h * 0.5,
        r: Math.random() * 1.8 + 0.4,
        s: 0.15 + Math.random() * 0.35,
        o: 0.08 + Math.random() * 0.18,
      }));
      birds.current = Array.from({ length: 7 }, (_, i) => ({
        x: Math.random() * w,
        y: 80 + Math.random() * 180,
        s: 0.4 + Math.random() * 0.5,
        phase: i,
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    const onMove = (e) => {
      mouse.current.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0;
    let lastFrameTime = 0;
    let isRunning = false;
    const tick = (now) => {
      if (!isRunning) return;
      if (now - lastFrameTime < frameInterval) {
        raf = requestAnimationFrame(tick);
        return;
      }
      lastFrameTime = now;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const max = Math.max(document.documentElement.scrollHeight - h, 1);
      const progress = Math.min(1, window.scrollY / max);
      const sky = sampleSky(progress);

      mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.06;
      mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.06;

      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, rgb(sky.top));
      g.addColorStop(0.42, rgb(sky.mid));
      g.addColorStop(1, rgb(sky.bot));
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      const sunX = sky.sunX * w + mouse.current.x * 12;
      const sunY = sky.sunY * h + mouse.current.y * 8;
      const sunR = Math.min(w, h) * 0.09;
      const halo = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunR * 6);
      halo.addColorStop(0, rgb(sky.sun, 0.55 * sky.glow));
      halo.addColorStop(0.35, rgb(sky.sun, 0.16 * sky.glow));
      halo.addColorStop(1, rgb(sky.sun, 0));
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, w, h);

      ctx.beginPath();
      ctx.arc(sunX, sunY, sunR, 0, Math.PI * 2);
      ctx.fillStyle = rgb(sky.sun);
      ctx.fill();

      if (sky.stars > 0.02) {
        stars.current.forEach((st) => {
          const tw = 0.35 + Math.sin(now / 700 + st.tw) * 0.3;
          ctx.fillStyle = `rgba(255,255,255,${sky.stars * tw})`;
          ctx.beginPath();
          ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      dust.current.forEach((d) => {
        d.x += d.s;
        if (d.x > w + 10) d.x = -10;
        ctx.fillStyle = `rgba(255, 214, 170, ${d.o})`;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      });

      if (!reduced.current) {
        birds.current.forEach((b) => {
          b.x += b.s;
          if (b.x > w + 40) b.x = -40;
          const flap = Math.sin(now / 180 + b.phase) * 7;
          ctx.strokeStyle = `rgba(20, 16, 12, ${0.35 + sky.night * 0.2})`;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(b.x - 8, b.y + flap * 0.2);
          ctx.quadraticCurveTo(b.x, b.y - flap, b.x + 8, b.y + flap * 0.2);
          ctx.stroke();
        });
      }

      if (layersRef.current) {
        const mx = mouse.current.x;
        const my = mouse.current.y;
        layersRef.current.style.setProperty("--mx", `${mx}`);
        layersRef.current.style.setProperty("--my", `${my}`);
        layersRef.current.style.setProperty("--scroll", `${progress}`);
        layersRef.current.style.setProperty("--night", `${sky.night}`);
        layersRef.current.style.setProperty("--dune-shift", `${progress * 40}px`);
      }

      if (!reduced.current) {
        raf = requestAnimationFrame(tick);
      } else {
        isRunning = false;
      }
    };

    const start = () => {
      if (isRunning || document.hidden) return;
      isRunning = true;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      isRunning = false;
      cancelAnimationFrame(raf);
    };
    const onVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };
    const onScroll = () => {
      if (reduced.current) start();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("scroll", onScroll, { passive: true });
    start();

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div className="rj-scene" ref={wrapRef} aria-hidden="true">
      <canvas ref={canvasRef} className="rj-sky" />
      <div className="rj-layers" ref={layersRef}>
        <svg className="rj-svg rj-far" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice">
          <path
            className="rj-dune rj-dune-a"
            d="M0 620 C180 540 320 700 520 580 C720 460 880 640 1100 540 C1260 470 1360 560 1440 520 L1440 900 L0 900 Z"
          />
        </svg>
        <svg className="rj-svg rj-fort-layer" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice">
          <g className="rj-fort" fill="#1a120c">
            <path d="M860 430 L860 360 L890 360 L890 310 L920 280 L950 310 L950 360 L980 360 L980 320 L1010 300 L1040 320 L1040 360 L1070 360 L1070 300 L1105 260 L1140 300 L1140 430 Z" />
            <rect x="880" y="430" width="250" height="160" />
            <rect x="840" y="470" width="40" height="120" />
            <rect x="1130" y="455" width="55" height="135" />
            <path d="M820 470 L840 430 L880 430 L880 590 L820 590 Z" />
            <path d="M1185 455 L1225 410 L1260 455 L1260 590 L1185 590 Z" />
            <g className="rj-fort-windows">
              <rect x="910" y="470" width="14" height="22" rx="7" />
              <rect x="950" y="470" width="14" height="22" rx="7" />
              <rect x="990" y="470" width="14" height="22" rx="7" />
              <rect x="1030" y="470" width="14" height="22" rx="7" />
              <rect x="1070" y="470" width="14" height="22" rx="7" />
              <rect x="930" y="520" width="12" height="18" rx="6" />
              <rect x="970" y="520" width="12" height="18" rx="6" />
              <rect x="1010" y="520" width="12" height="18" rx="6" />
              <rect x="1050" y="520" width="12" height="18" rx="6" />
            </g>
            <path d="M990 360 L1005 250 L1020 360" fill="#2a1b12" />
          </g>
        </svg>
        <svg className="rj-svg rj-mid" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice">
          <path
            className="rj-dune rj-dune-b"
            d="M0 680 C220 600 380 740 620 650 C860 560 980 730 1220 640 C1340 590 1400 650 1440 630 L1440 900 L0 900 Z"
          />
          <g className="rj-village" fill="#24170f">
            <ellipse cx="210" cy="700" rx="70" ry="22" />
            <path d="M160 700 L210 640 L260 700 Z" />
            <path d="M240 705 L290 655 L340 705 Z" />
            <path d="M130 710 L165 672 L200 710 Z" />
            <rect x="188" y="678" width="10" height="16" className="rj-door" />
            <g className="rj-people">
              <g transform="translate(300 690)">
                <circle cx="0" cy="-16" r="5" />
                <path d="M0 -10 L0 8 M-8 0 L8 2 M-4 8 L-6 20 M4 8 L7 20" fill="none" stroke="#24170f" strokeWidth="3" strokeLinecap="round" />
              </g>
              <g transform="translate(328 694)">
                <circle cx="0" cy="-14" r="4.5" />
                <path d="M0 -8 L0 6 M-7 0 L6 1 M-3 6 L-5 16 M3 6 L6 16" fill="none" stroke="#24170f" strokeWidth="2.6" strokeLinecap="round" />
              </g>
              <g transform="translate(352 698)">
                <circle cx="0" cy="-11" r="3.5" />
                <path d="M0 -6 L0 4 M-5 0 L5 1 M-2 4 L-3 12 M2 4 L4 12" fill="none" stroke="#24170f" strokeWidth="2.2" strokeLinecap="round" />
              </g>
            </g>
            <g className="rj-palm" transform="translate(145 700)">
              <rect x="-3" y="-70" width="6" height="70" rx="2" />
              <path d="M0 -68 C-40 -80 -48 -52 -8 -60" fill="#1a140c" />
              <path d="M0 -68 C40 -82 50 -50 10 -58" fill="#1a140c" />
              <path d="M0 -72 C-20 -110 20 -110 4 -70" fill="#1a140c" />
            </g>
          </g>
        </svg>
        <div className="rj-caravan">
          <svg viewBox="0 0 220 90" className="rj-camel">
            <g fill="#1c140e">
              <path d="M20 70 C28 48 48 42 62 48 C70 28 92 22 108 40 C122 18 150 22 158 46 C176 46 196 58 200 70 C186 66 170 72 158 70 C148 78 130 80 118 70 C104 80 86 82 74 70 C58 78 40 76 28 70 Z" />
              <path d="M52 48 C40 30 28 34 22 22 C36 28 48 18 58 36" />
              <circle cx="24" cy="20" r="5" />
              <path d="M36 70 L32 88 M48 70 L52 88 M128 70 L124 88 M144 70 L148 88" stroke="#1c140e" strokeWidth="5" fill="none" />
            </g>
          </svg>
          <svg viewBox="0 0 220 90" className="rj-camel rj-camel-b">
            <g fill="#24180f">
              <path d="M20 70 C28 48 48 42 62 48 C70 28 92 22 108 40 C122 18 150 22 158 46 C176 46 196 58 200 70 C186 66 170 72 158 70 C148 78 130 80 118 70 C104 80 86 82 74 70 C58 78 40 76 28 70 Z" />
              <path d="M52 48 C40 30 28 34 22 22 C36 28 48 18 58 36" />
              <circle cx="24" cy="20" r="5" />
              <path d="M36 70 L32 88 M48 70 L52 88 M128 70 L124 88 M144 70 L148 88" stroke="#24180f" strokeWidth="5" fill="none" />
            </g>
          </svg>
        </div>
        <svg className="rj-svg rj-near" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice">
          <path
            className="rj-dune rj-dune-c"
            d="M0 780 C160 720 300 820 500 760 C740 690 900 830 1140 760 C1280 720 1380 780 1440 750 L1440 900 L0 900 Z"
          />
        </svg>
        <div className="rj-haze" />
        <div className="rj-vignette" />
      </div>
    </div>
  );
}
