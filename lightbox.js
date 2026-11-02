// Click any [data-lightbox] link to view it full screen. Links inside the same
// [data-gallery] container can be stepped through with the arrows or arrow keys.
// A link with data-video plays that video instead of showing an image.
(() => {
  const dlg = document.createElement('dialog');
  dlg.className = 'lightbox';
  dlg.innerHTML =
    '<div class="lb-stage"></div>' +
    '<button class="lb-close" type="button">Close</button>' +
    '<button class="lb-prev" type="button" aria-label="Previous">←</button>' +
    '<button class="lb-next" type="button" aria-label="Next">→</button>';
  document.body.append(dlg);

  const stage = dlg.querySelector('.lb-stage');
  let items = [];
  let index = 0;

  function show(n) {
    index = (n + items.length) % items.length;
    const link = items[index];
    stage.replaceChildren();

    if (link.dataset.video) {
      const video = document.createElement('video');
      video.src = link.dataset.video;
      if (link.dataset.poster) video.poster = link.dataset.poster;
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      stage.append(video);
    } else {
      const img = document.createElement('img');
      img.src = link.getAttribute('href');
      img.alt = link.querySelector('img')?.alt || '';
      stage.append(img);
    }
  }

  document.addEventListener('click', (e) => {
    const link = e.target.closest('[data-lightbox]');
    if (!link) return;
    e.preventDefault();
    const group = link.closest('[data-gallery]');
    items = group ? [...group.querySelectorAll('[data-lightbox]')] : [link];
    dlg.classList.toggle('single', items.length < 2);
    show(items.indexOf(link));
    dlg.showModal();
  });

  dlg.querySelector('.lb-close').addEventListener('click', () => dlg.close());
  dlg.querySelector('.lb-prev').addEventListener('click', () => show(index - 1));
  dlg.querySelector('.lb-next').addEventListener('click', () => show(index + 1));
  dlg.addEventListener('click', (e) => {
    if (e.target === dlg || e.target === stage) dlg.close();
  });
  dlg.addEventListener('close', () => stage.replaceChildren());

  document.addEventListener('keydown', (e) => {
    if (!dlg.open || items.length < 2) return;
    if (e.key === 'ArrowRight') show(index + 1);
    if (e.key === 'ArrowLeft') show(index - 1);
  });
})();
