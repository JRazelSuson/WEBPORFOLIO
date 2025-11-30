(function(){
  const canvas = document.getElementById('galaxy');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = 0, h = 0, dpr = 1;
  let stars = [];
  // orbit parameters for circular movement
  let orbitAngle = 0;
  let orbitSpeed = 0.0004; // radians per ms (faster)
  let orbitRadius = 0; // computed on resize
  // shooting stars
  let shootingStars = [];
  let lastShooting = 0;
  // nebula layers
  let nebulaLayers = [];

  function resize(){
    dpr = Math.max(1, window.devicePixelRatio || 1);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    // Use setTransform so drawing coordinates are in CSS pixels
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // compute orbit radius as a small fraction of viewport
    orbitRadius = Math.min(w, h) * 0.035;
    initNebula();
    initStars();
  }

  function initStars(){
    stars = [];
    const area = w * h;
    const baseCount = Math.floor(area / 6000); // density

    // random background stars with twinkling and orbit capability
    for (let i = 0; i < baseCount; i++){
      const x = Math.random() * w;
      const y = Math.random() * h;
      const r = Math.random() * 1.2 + 0.2;
      const baseA = Math.random() * 0.8 + 0.15;
      const speed = Math.random() * 0.02 + 0.003;
      const twinkle = Math.random() * Math.PI * 2;
      const layer = Math.random() * 1.0; // used for parallax/orbit effect
      stars.push({x, y, r, baseA, a: baseA, speed, twinkle, layer});
    }
    // reset shooting stars
    shootingStars = [];
  }

  function initNebula(){
    nebulaLayers = [];
    const colors = [ 'rgba(40,20,60,0.03)', 'rgba(30,10,50,0.02)', 'rgba(50,20,30,0.02)' ];
    for (let i = 0; i < 3; i++){
      nebulaLayers.push({
        x: Math.random() * w,
        y: Math.random() * h,
        rx: Math.min(w,h) * (0.6 + Math.random()*0.8),
        ry: Math.min(w,h) * (0.25 + Math.random()*0.6),
        speedX: (Math.random()*2-1) * 0.01,
        speedY: (Math.random()*2-1) * 0.008,
        color: colors[i % colors.length]
      });
    }
  }
  function clear(){
    // darker gradient background
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, '#000005');
    g.addColorStop(0.5, '#030008');
    g.addColorStop(1, '#020006');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    // a very faint milky band for depth
    const mid = ctx.createLinearGradient(w*0.2, h*0.1, w*0.8, h*0.9);
    mid.addColorStop(0, 'rgba(255,255,255,0.005)');
    mid.addColorStop(0.5, 'rgba(200,200,255,0.01)');
    mid.addColorStop(1, 'rgba(255,255,255,0.005)');
    ctx.fillStyle = mid;
    ctx.beginPath();
    ctx.ellipse(w*0.5, h*0.45, w*0.6, h*0.25, -0.5, 0, Math.PI*2);
    ctx.fill();

    // draw slow-moving nebula layers
    const t = performance.now() * 0.00008;
    for (let i = 0; i < nebulaLayers.length; i++){
      const n = nebulaLayers[i];
      // update position gently
      n.x += Math.sin(t * (i+1) * 0.7) * n.speedX * 40;
      n.y += Math.cos(t * (i+1) * 0.5) * n.speedY * 40;
      const rg = ctx.createRadialGradient(n.x, n.y, 1, n.x, n.y, Math.max(n.rx, n.ry));
      rg.addColorStop(0, n.color);
      rg.addColorStop(0.35, 'rgba(0,0,0,0.00)');
      ctx.fillStyle = rg;
      ctx.beginPath();
      ctx.ellipse(n.x, n.y, n.rx, n.ry, Math.sin(t+i)*0.8, 0, Math.PI*2);
      ctx.fill();
    }
  }

  function drawStars(dt){
    // orbit offset for circular movement; parallax applied by star.layer
    const orbitX = Math.cos(orbitAngle);
    const orbitY = Math.sin(orbitAngle);
    for (let s of stars){
      if (s.speed){
        s.twinkle += s.speed * dt * 0.06;
        s.a = s.baseA + Math.sin(s.twinkle) * 0.45 * s.baseA;
      }
      const alpha = Math.max(0, Math.min(1, s.a));
      const par = (s.layer !== undefined) ? s.layer : 1;
      const ox = orbitX * orbitRadius * (0.25 + 0.75 * par);
      const oy = orbitY * orbitRadius * (0.25 + 0.75 * par);
      const x = s.x + ox;
      const y = s.y + oy;
      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      // small glow using shadow for softer look
      ctx.shadowColor = `rgba(255,255,255,${alpha*0.6})`;
      ctx.shadowBlur = Math.min(18, (s.r+1) * 6);
      ctx.arc(x, y, s.r, 0, Math.PI*2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.closePath();
    }
  }

  function drawConstellations(time){
    // orbit offset for constellation lines (slower for depth)
  const ox = Math.cos(orbitAngle) * orbitRadius * 0.6 + targetMouseX * orbitRadius * 0.4;
  const oy = Math.sin(orbitAngle) * orbitRadius * 0.6 + targetMouseY * orbitRadius * 0.25;
    ctx.lineWidth = 1.2;
    ctx.strokeStyle = 'rgba(180,210,255,0.45)'; // soft blue
    ctx.shadowColor = 'rgba(180,210,255,0.7)';
    ctx.shadowBlur = 10;
    for (let c of constellations){
      // Build smoothed path using quadratic midpoint smoothing
      const pts = c.points.map((p, idx) => {
        const x = p.x + ox * (0.6 + 0.4 * (idx / c.points.length));
        const y = p.y + oy * (0.6 + 0.4 * (idx / c.points.length));
        return {x,y};
      });

      if (pts.length > 1){
        ctx.beginPath();
        ctx.moveTo(pts[0].x, pts[0].y);
        for (let i=1;i<pts.length;i++){
          const prev = pts[i-1];
          const cur = pts[i];
          const midX = (prev.x + cur.x) / 2;
          const midY = (prev.y + cur.y) / 2;
          ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
        }
        // connect to last point
        const lastPt = pts[pts.length-1];
        ctx.lineTo(lastPt.x, lastPt.y);
        ctx.stroke();
        ctx.closePath();
      }

      // draw constellation nodes with pulsing
      let hovered = false;
      for (let p of pts){
        const pulse = 0.68 + 0.32 * Math.sin((time*0.002) + (p.x+p.y)%17);
        const pr = 2.8 * pulse;
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${0.95 * pulse})`;
        ctx.arc(p.x, p.y, pr, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();

        // hover test against mouse pixel coords
        if (typeof mousePX === 'number' && typeof mousePY === 'number'){
          const dx = mousePX - p.x;
          const dy = mousePY - p.y;
          if ((dx*dx + dy*dy) < (24 * 24)) hovered = true;
        }
      }

      // show label when hovered or when user is touching
      if (c.name && hovered){
        const mid = pts[Math.floor(pts.length/2)];
        ctx.fillStyle = 'rgba(200,220,255,0.18)';
        ctx.font = '13px Roboto, Arial';
        ctx.fillText(c.name, mid.x + 8, mid.y - 8);
      }
    }
    ctx.shadowBlur = 0;
  }

  // shooting stars
  function maybeSpawnShooting(now){
    if (now - lastShooting > 2000 + Math.random()*8000){
      lastShooting = now;
      spawnShootingStar();
    }
  }

  function spawnShootingStar(){
    // start somewhere near top-left to top-right region
    const startX = Math.random() * w;
    const startY = Math.random() * h * 0.35;
    const angle = (Math.PI/4) + (Math.random() * Math.PI/6); // down-right
    const speed = 0.9 + Math.random() * 1.6;
    const len = 120 + Math.random()*220;
    shootingStars.push({x: startX, y: startY, vx: Math.cos(angle)*speed, vy: Math.sin(angle)*speed, len, life: 0, maxLife: 600 + Math.random()*800});
    // keep array small
    if (shootingStars.length > 6) shootingStars.shift();
  }

  function drawShootingStars(dt){
    for (let i = shootingStars.length-1; i >= 0; i--){
      const s = shootingStars[i];
      s.life += dt;
      s.x += s.vx * (dt*0.06);
      s.y += s.vy * (dt*0.06);
      const t = s.life / s.maxLife;
      const alpha = Math.max(0, 1 - t);
      const tail = s.len * (1 - t);
      // draw tail as gradient line
      ctx.beginPath();
      const gx = ctx.createLinearGradient(s.x, s.y, s.x - s.vx*tail, s.y - s.vy*tail);
      gx.addColorStop(0, `rgba(255,255,255,${alpha})`);
      gx.addColorStop(1, `rgba(255,255,255,${alpha*0.0})`);
      ctx.strokeStyle = gx;
      ctx.lineWidth = 1.8;
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(s.x - s.vx*tail, s.y - s.vy*tail);
      ctx.stroke();
      ctx.closePath();
      // small head
      ctx.beginPath();
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;
      ctx.arc(s.x, s.y, 1.6, 0, Math.PI*2);
      ctx.fill();
      ctx.closePath();
      if (s.life > s.maxLife) shootingStars.splice(i,1);
    }
  }

  let last = performance.now();
  function frame(now){
    const dt = now - last;
    last = now;
    // advance orbit angle
    orbitAngle += orbitSpeed * dt;
    // spawn shooting occasionally
    maybeSpawnShooting(now);
    clear();
    drawStars(dt);
    drawShootingStars(dt);
    requestAnimationFrame(frame);
  }

  window.addEventListener('resize', () => {
    // small debounce
    clearTimeout(window._galaxyResize);
    window._galaxyResize = setTimeout(resize, 120);
  });

  document.addEventListener('DOMContentLoaded', () => {
    resize();
    last = performance.now();
    requestAnimationFrame(frame);
  });

})();
