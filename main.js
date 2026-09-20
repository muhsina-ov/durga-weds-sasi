/* ==========================================================================
   PREMIUM CINEMATIC DIGITAL WEDDING INVITATION - LOGIC & ANIMATION ENGINE
   Durga & Sasi Wedding — 30th January 2027, Singapore
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Element References
  const posterImg = document.getElementById('doorPoster');
  const video = document.getElementById('doorVideo');
  const videoSource = document.getElementById('videoSource');
  const staticCanvas = document.getElementById('staticFrameCanvas');
  const canvasCtx = staticCanvas.getContext('2d');
  
  const tapOverlay = document.getElementById('tapOverlay');
  const invitationOverlay = document.getElementById('invitationOverlay');
  
  // Controls & Modals
  const doorSelectBtn = document.getElementById('doorSelectBtn');
  const audioToggleBtn = document.getElementById('audioToggleBtn');
  const audioIconOn = document.getElementById('audioIconOn');
  const audioIconOff = document.getElementById('audioIconOff');
  const replayBtn = document.getElementById('replayBtn');
  
  // Background Audio Element (Looping)
  const bgmAudio = document.getElementById('bgmAudio');
  if (bgmAudio) {
    bgmAudio.volume = 0.8;
  }
  
  // Modals
  const doorModal = document.getElementById('doorModal');
  const closeDoorModal = document.getElementById('closeDoorModal');
  const mapModal = document.getElementById('mapModal');
  const openMapBtn = document.getElementById('openMapBtn');
  const closeMapModal = document.getElementById('closeMapModal');
  const addToCalendarBtn = document.getElementById('addToCalendarBtn');

  // Application State
  let currentDoorId = '1';
  let isAudioMuted = false;
  let isPlaying = false;
  let hasOpened = false;
  let audioCtx = null;

  // --- Audio Context Helper ---
  function initAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // --- 3D Depth Floating Sky Lanterns Engine ---
  function initFloatingLanterns() {
    const container = document.getElementById('lanternsContainer');
    if (!container) return;

    container.innerHTML = '';
    const lanternCount = 22;
    const depthTiers = ['depth-far', 'depth-far', 'depth-mid', 'depth-mid', 'depth-near'];

    for (let i = 0; i < lanternCount; i++) {
      const lantern = document.createElement('div');
      const depthClass = depthTiers[Math.floor(Math.random() * depthTiers.length)];
      lantern.className = `lantern-item ${depthClass}`;

      const leftPos = (Math.random() * 92 + 4).toFixed(1);
      const duration = (Math.random() * 14 + 14).toFixed(1);
      const delay = (Math.random() * 20).toFixed(1);
      const swayX = (Math.random() * 24 + 10).toFixed(0);
      const rotDeg = (Math.random() * 6 - 3).toFixed(1);

      lantern.style.left = `${leftPos}%`;
      lantern.style.animationDuration = `${duration}s`;
      lantern.style.animationDelay = `${delay}s`;
      lantern.style.setProperty('--sway-x', `${swayX}px`);
      lantern.style.setProperty('--rot-deg', `${rotDeg}deg`);

      lantern.innerHTML = `
        <div class="lantern-paper">
          <div class="lantern-core-flame"></div>
        </div>
        <div class="lantern-tassel"></div>
      `;

      container.appendChild(lantern);
    }
  }

  // Initialize floating sky lanterns
  initFloatingLanterns();

  // --- Capture Final Video Frame onto Canvas for 100% Static Hold ---
  function freezeFinalFrame() {
    if (video.videoWidth && video.videoHeight) {
      staticCanvas.width = video.videoWidth;
      staticCanvas.height = video.videoHeight;
      canvasCtx.drawImage(video, 0, 0, staticCanvas.width, staticCanvas.height);
      
      staticCanvas.classList.add('active');
      video.pause();
    }
  }

  // --- Helper: Reveal Invitation Content ---
  function revealInvitationContent() {
    freezeFinalFrame();
    hasOpened = true;
    isPlaying = false;

    // Reveal invitation text overlay smoothly over static final door frame
    invitationOverlay.classList.remove('hidden');
    void invitationOverlay.offsetWidth;
    invitationOverlay.classList.add('revealed');

    // Initialize HTML5 Scratch Canvas once overlay is visible
    setTimeout(() => {
      initScratchCanvas();
    }, 150);
  }

  // --- HTML5 Scratch Card Engine ---
  const scratchCanvas = document.getElementById('scratchCanvas');
  const scratchHint = document.getElementById('scratchHint');
  const quickRevealBtn = document.getElementById('quickRevealBtn');
  let scratchCtx = null;
  let isScratching = false;
  let hasScratchedCleared = false;
  let dragCount = 0;

  function initScratchCanvas() {
    if (!scratchCanvas) return;
    scratchCtx = scratchCanvas.getContext('2d');
    
    const container = document.getElementById('scratchContainer');
    if (!container) return;
    
    scratchCanvas.width = container.offsetWidth || 320;
    scratchCanvas.height = container.offsetHeight || 120;
    
    // Render Metallic Gold Foil Gradient
    const grad = scratchCtx.createLinearGradient(0, 0, scratchCanvas.width, scratchCanvas.height);
    grad.addColorStop(0, '#E5C158');
    grad.addColorStop(0.35, '#FFF4D0');
    grad.addColorStop(0.7, '#D4A338');
    grad.addColorStop(1, '#A67C1E');
    
    scratchCtx.fillStyle = grad;
    scratchCtx.fillRect(0, 0, scratchCanvas.width, scratchCanvas.height);
    
    // Add shimmering gold foil texture speckles
    scratchCtx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    for (let i = 0; i < 160; i++) {
      const x = Math.random() * scratchCanvas.width;
      const y = Math.random() * scratchCanvas.height;
      const r = Math.random() * 2 + 0.5;
      scratchCtx.beginPath();
      scratchCtx.arc(x, y, r, 0, Math.PI * 2);
      scratchCtx.fill();
    }
    
    // Add prompt text on foil
    scratchCtx.font = '600 12px Cormorant Garamond, serif';
    scratchCtx.fillStyle = 'rgba(10, 10, 15, 0.75)';
    scratchCtx.textAlign = 'center';
    scratchCtx.fillText('✦ SCRATCH TO UNLOCK DATE ✦', scratchCanvas.width / 2, scratchCanvas.height / 2 + 4);
  }

  function scratchAt(x, y) {
    if (!scratchCtx || hasScratchedCleared) return;
    
    scratchCtx.globalCompositeOperation = 'destination-out';
    scratchCtx.beginPath();
    scratchCtx.arc(x, y, 22, 0, Math.PI * 2);
    scratchCtx.fill();
    
    dragCount++;
    if (dragCount % 10 === 0) {
      checkScratchPercentage();
    }
  }

  function getScratchCoords(e) {
    const rect = scratchCanvas.getBoundingClientRect();
    let clientX = e.clientX;
    let clientY = e.clientY;
    
    if (e.touches && e.touches[0]) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }
    
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }

  function checkScratchPercentage() {
    if (hasScratchedCleared || !scratchCtx) return;
    
    const imgData = scratchCtx.getImageData(0, 0, scratchCanvas.width, scratchCanvas.height);
    const pixels = imgData.data;
    let transparentCount = 0;
    
    for (let i = 3; i < pixels.length; i += 16) {
      if (pixels[i] === 0) {
        transparentCount++;
      }
    }
    
    const totalSampled = pixels.length / 16;
    const ratio = transparentCount / totalSampled;
    
    if (ratio > 0.35) {
      revealDateFully();
    }
  }

  function revealDateFully() {
    if (hasScratchedCleared) return;
    hasScratchedCleared = true;
    
    if (scratchCanvas) scratchCanvas.classList.add('fade-out');
    if (scratchHint) scratchHint.style.opacity = '0';
    if (quickRevealBtn) quickRevealBtn.style.display = 'none';
    
    triggerConfetti();
  }

  if (scratchCanvas) {
    ['mousedown', 'touchstart'].forEach(evt => {
      scratchCanvas.addEventListener(evt, (e) => {
        isScratching = true;
        const coords = getScratchCoords(e);
        scratchAt(coords.x, coords.y);
      }, { passive: true });
    });

    ['mousemove', 'touchmove'].forEach(evt => {
      scratchCanvas.addEventListener(evt, (e) => {
        if (!isScratching) return;
        const coords = getScratchCoords(e);
        scratchAt(coords.x, coords.y);
      }, { passive: true });
    });

    ['mouseup', 'mouseleave', 'touchend'].forEach(evt => {
      scratchCanvas.addEventListener(evt, () => {
        isScratching = false;
      });
    });
  }

  if (quickRevealBtn) {
    quickRevealBtn.addEventListener('click', revealDateFully);
  }

  // --- Gold Confetti Particle Celebration Engine ---
  const confettiCanvas = document.getElementById('confettiCanvas');
  let confettiCtx = null;
  let confettiParticles = [];
  let confettiAnimationId = null;

  function triggerConfetti() {
    if (!confettiCanvas) return;
    confettiCtx = confettiCanvas.getContext('2d');
    
    const container = document.getElementById('invitationOverlay');
    confettiCanvas.width = container ? container.offsetWidth : window.innerWidth;
    confettiCanvas.height = container ? container.offsetHeight : window.innerHeight;
    
    const colors = ['#FFF4D0', '#E5C158', '#D4A338', '#FFFFFF', '#F5D77F'];
    confettiParticles = [];
    
    for (let i = 0; i < 70; i++) {
      confettiParticles.push({
        x: confettiCanvas.width / 2 + (Math.random() * 60 - 30),
        y: confettiCanvas.height * 0.35,
        vx: (Math.random() - 0.5) * 12,
        vy: (Math.random() * -10) - 4,
        size: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 8,
        opacity: 1
      });
    }
    
    if (confettiAnimationId) cancelAnimationFrame(confettiAnimationId);
    animateConfetti();
  }

  function animateConfetti() {
    if (!confettiCtx) return;
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    
    let activeParticles = 0;
    
    confettiParticles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.25;
      p.rotation += p.rotationSpeed;
      p.opacity -= 0.008;
      
      if (p.opacity > 0) {
        activeParticles++;
        confettiCtx.save();
        confettiCtx.translate(p.x, p.y);
        confettiCtx.rotate((p.rotation * Math.PI) / 180);
        confettiCtx.globalAlpha = Math.max(0, p.opacity);
        confettiCtx.fillStyle = p.color;
        confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        confettiCtx.restore();
      }
    });
    
    if (activeParticles > 0) {
      confettiAnimationId = requestAnimationFrame(animateConfetti);
    } else {
      confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
  }

  // --- Live Countdown Timer Engine (Target: 30th January 2027) ---
  const cdDays = document.getElementById('cdDays');
  const cdHours = document.getElementById('cdHours');
  const cdMins = document.getElementById('cdMins');
  const cdSecs = document.getElementById('cdSecs');
  
  // Wedding Date: 30th January 2027 (Singapore UTC+8)
  const targetWeddingDate = new Date('2027-01-30T17:00:00+08:00').getTime();

  function updateCountdown() {
    if (!cdDays || !cdHours || !cdMins || !cdSecs) return;
    
    const now = new Date().getTime();
    const distance = targetWeddingDate - now;
    
    if (distance < 0) {
      cdDays.innerText = '00';
      cdHours.innerText = '00';
      cdMins.innerText = '00';
      cdSecs.innerText = '00';
      return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    cdDays.innerText = days < 10 ? '0' + days : days;
    cdHours.innerText = hours < 10 ? '0' + hours : hours;
    cdMins.innerText = minutes < 10 ? '0' + minutes : minutes;
    cdSecs.innerText = seconds < 10 ? '0' + seconds : seconds;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // --- 3D Card Parallax & Tilt Engine ---
  const tiltCards = document.querySelectorAll('.tilt-card');
  
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });

  // --- Door Opening Handler ---
  function openDoorInvitation() {
    if (isPlaying || hasOpened) return;
    
    isPlaying = true;
    initAudioContext();

    // Play looping background audio
    if (bgmAudio && !isAudioMuted) {
      bgmAudio.play().catch(err => {
        console.warn('Audio play notice:', err);
      });
    }

    // 1. Hide tap callout overlay
    tapOverlay.classList.add('fade-out');
    
    // 2. Hide poster image & clear static canvas
    posterImg.classList.add('fade-out');
    staticCanvas.classList.remove('active');
    
    // 3. Reset video playback to 0 and play continuous single-motion video
    video.currentTime = 0;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        // Video playing smoothly to the end
      }).catch(err => {
        console.warn('Video auto-play error fallback:', err);
        revealInvitationContent();
      });
    }
  }

  // Forward desktop wheel scrolling to content-scrollable container once revealed
  const contentScrollable = document.getElementById('contentScrollable');
  window.addEventListener('wheel', (e) => {
    if (hasOpened && contentScrollable) {
      contentScrollable.scrollTop += e.deltaY;
    }
  }, { passive: true });

  // --- Video Event Listeners ---
  video.addEventListener('timeupdate', () => {
    // Reveal floating sky lanterns at 6th second of video playback
    if (video.currentTime >= 6.0) {
      const lanternsContainer = document.getElementById('lanternsContainer');
      if (lanternsContainer) lanternsContainer.classList.add('revealed');
    }

    // Trigger fade-in reveal starting from 6th second of video playback
    if (!hasOpened && (video.currentTime >= 6.0 || video.ended)) {
      revealInvitationContent();
    }
  });

  video.addEventListener('ended', () => {
    freezeFinalFrame();
    if (!hasOpened) {
      revealInvitationContent();
    }
  });

  // --- Reset & Replay ---
  function resetDoorState() {
    isPlaying = false;
    hasOpened = false;
    
    video.pause();
    video.currentTime = 0;
    
    staticCanvas.classList.remove('active');
    invitationOverlay.classList.remove('revealed');
    
    const lanternsContainer = document.getElementById('lanternsContainer');
    if (lanternsContainer) lanternsContainer.classList.remove('revealed');

    setTimeout(() => {
      invitationOverlay.classList.add('hidden');
      posterImg.classList.remove('fade-out');
      tapOverlay.classList.remove('fade-out');
    }, 400);
  }

  // --- Door Selector Logic ---
  function switchDoorStyle(doorId) {
    if (currentDoorId === doorId) return;
    
    currentDoorId = doorId;
    resetDoorState();

    // Update Poster & Video source (AVIF primary, WebP fallback)
    const posterPath = `/assets/doors/${doorId}.avif`;
    const videoPath = `/assets/doors/${doorId}.mp4`;

    posterImg.onerror = () => {
      if (!posterImg.src.endsWith('.webp')) {
        posterImg.src = `/assets/doors/${doorId}.webp`;
      }
    };
    posterImg.src = posterPath;
    videoSource.src = videoPath;
    video.load();

    // Update active highlight in modal
    document.querySelectorAll('.door-option-card').forEach(card => {
      card.classList.toggle('active', card.dataset.door === doorId);
    });

    doorModal.classList.add('hidden');
  }

  // Event Listener for Tap Overlay & Replay
  tapOverlay.addEventListener('click', openDoorInvitation);
  replayBtn.addEventListener('click', resetDoorState);

  // --- Door Modal Controls ---
  if (doorSelectBtn && doorModal) {
    doorSelectBtn.addEventListener('click', () => doorModal.classList.remove('hidden'));
  }
  if (closeDoorModal && doorModal) {
    closeDoorModal.addEventListener('click', () => doorModal.classList.add('hidden'));
  }
  
  document.querySelectorAll('.door-option-card').forEach(card => {
    card.addEventListener('click', () => {
      switchDoorStyle(card.dataset.door);
    });
  });

  // --- Audio Mute / Unmute Toggle ---
  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', () => {
      isAudioMuted = !isAudioMuted;
      video.muted = isAudioMuted;
      
      if (bgmAudio) {
        if (isAudioMuted) {
          bgmAudio.pause();
        } else {
          bgmAudio.play().catch(e => console.warn('Audio resume:', e));
        }
      }

      if (isAudioMuted) {
        audioIconOn.classList.add('hidden');
        audioIconOff.classList.remove('hidden');
      } else {
        audioIconOn.classList.remove('hidden');
        audioIconOff.classList.add('hidden');
        initAudioContext();
      }
    });
  }

  // --- Map Modal Controls ---
  if (openMapBtn && mapModal) {
    openMapBtn.addEventListener('click', () => mapModal.classList.remove('hidden'));
  }
  if (closeMapModal && mapModal) {
    closeMapModal.addEventListener('click', () => mapModal.classList.add('hidden'));
  }

  // Close modals when clicking backdrop
  [doorModal, mapModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.add('hidden');
        }
      });
    }
  });

  // --- Add to Google Calendar ---
  if (addToCalendarBtn) {
    addToCalendarBtn.addEventListener('click', () => {
      const groom = 'Sasi';
      const bride = 'Durga';
      const venue = 'De Hall Ballroom';
      const location = '3 Irving Rd #02-08, Tai Seng Centre, Singapore 369522';

      const title = encodeURIComponent(`Wedding Celebration of ${bride} & ${groom}`);
      const details = encodeURIComponent(`You are cordially invited to celebrate the wedding of ${bride} and ${groom} at ${venue}, Singapore.`);
      const loc = encodeURIComponent(`${venue}, ${location}`);

      // 30th January 2027 (Singapore UTC+8 -> 17:00 SGT = 09:00 UTC)
      const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${loc}&dates=20270130T090000Z/20270130T160000Z`;

      window.open(googleCalendarUrl, '_blank', 'noopener,noreferrer');
    });
  }

  // ==========================================================================
  // HIGH-PERFORMANCE IDLE PREFETCH ENGINE & SERVICE WORKER
  // ==========================================================================
  
  // Register Service Worker for 0ms Repeat-Visit Loading
  if ('serviceWorker' in navigator && window.location.protocol !== 'file:') {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js').catch(err => {
        console.log('Service Worker registration skipped:', err);
      });
    });
  }

  // Prefetch secondary doors & videos in background during idle time
  function prefetchSecondaryAssets() {
    const doorIds = ['1', '2', '3', '4', '6'];
    const prefetch = () => {
      doorIds.forEach(id => {
        const img = new Image();
        img.src = `/assets/doors/${id}.avif`;

        const vid = document.createElement('video');
        vid.preload = 'auto';
        vid.src = `/assets/doors/${id}.mp4`;
      });
    };

    if ('requestIdleCallback' in window) {
      requestIdleCallback(prefetch, { timeout: 3000 });
    } else {
      setTimeout(prefetch, 2000);
    }
  }

  prefetchSecondaryAssets();
});


