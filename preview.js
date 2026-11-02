// Hovering a video tile ([data-video]) plays a muted, looping preview over its
// poster; moving away stops it. Mouse-only, and off for reduced motion.
(() => {
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  function preview(tile) {
    let video = tile.querySelector('video.preview');
    if (!video) {
      video = document.createElement('video');
      video.className = 'preview';
      video.src = tile.dataset.video;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.addEventListener('playing', () => video.classList.add('ready'), { once: true });
      // Sit above the poster but below any label on the tile.
      const img = tile.querySelector('img');
      if (img) img.after(video);
      else tile.prepend(video);
    }
    tile.classList.add('previewing');
    video.play().catch(() => {});
  }

  function stop(tile) {
    tile.classList.remove('previewing');
    const video = tile.querySelector('video.preview');
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  }

  document.addEventListener('mouseover', (e) => {
    const tile = e.target.closest('a[data-video]');
    if (tile && !tile.contains(e.relatedTarget)) preview(tile);
  });

  document.addEventListener('mouseout', (e) => {
    const tile = e.target.closest('a[data-video]');
    if (tile && !tile.contains(e.relatedTarget)) stop(tile);
  });

  // Opening the full video in the lightbox stops any preview behind it.
  document.addEventListener('click', () => {
    document.querySelectorAll('a.previewing').forEach(stop);
  });
})();
