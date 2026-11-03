// One entry per day that's been posted. Add the next day here and it fills in
// on the calendar; every day without an entry shows as "Coming soon".
//
//   day     1–30
//   video   path to the clip, e.g. 'videos/30/day-01.mp4'
//   poster  optional still for the tile, e.g. 'videos/30/day-01.jpg'
//           (without one, the tile shows the video's first frame)
//   title   optional short caption
const DAYS = [
  { day: 1, video: 'videos/30/day-01.mp4', poster: 'videos/30/day-01.jpg' },
  { day: 2, video: 'videos/30/day-02.mp4', poster: 'videos/30/day-02.jpg' },
  { day: 3, video: 'videos/30/day-03.mp4', poster: 'videos/30/day-03.jpg' },
  { day: 4, video: 'videos/30/day-04.mp4', poster: 'videos/30/day-04.jpg' },
  { day: 5, video: 'videos/30/day-05.mp4', poster: 'videos/30/day-05.jpg' },
  { day: 6, video: 'videos/30/day-06.mp4', poster: 'videos/30/day-06.jpg' },
  { day: 7, video: 'videos/30/day-07.mp4', poster: 'videos/30/day-07.jpg' },
  { day: 8, video: 'videos/30/day-08.mp4', poster: 'videos/30/day-08.jpg' },
];

(() => {
  const calendar = document.getElementById('calendar');
  const count = document.getElementById('posted-count');
  const byDay = new Map(DAYS.map((d) => [d.day, d]));

  for (let day = 1; day <= 30; day++) {
    const entry = byDay.get(day);
    const num = String(day).padStart(2, '0');
    let tile;

    if (entry) {
      tile = document.createElement('a');
      tile.className = 'day filled';
      tile.href = entry.video;
      tile.dataset.lightbox = '';
      tile.dataset.video = entry.video;
      if (entry.poster) {
        tile.dataset.poster = entry.poster;
        const img = document.createElement('img');
        img.src = entry.poster;
        img.alt = entry.title ? `Day ${day}: ${entry.title}` : `Day ${day}`;
        img.loading = 'lazy';
        tile.append(img);
      } else {
        const preview = document.createElement('video');
        preview.src = `${entry.video}#t=0.5`;
        preview.muted = true;
        preview.playsInline = true;
        preview.preload = 'metadata';
        preview.setAttribute('aria-label', `Day ${day}`);
        tile.append(preview);
      }
    } else {
      tile = document.createElement('div');
      tile.className = 'day empty';
    }

    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.innerHTML = `<span>Day ${num}</span><span></span>`;
    tag.lastChild.textContent = entry ? entry.title || '' : 'Coming soon';
    tile.append(tag);
    calendar.append(tile);
  }

  count.textContent = `${byDay.size} of 30 posted`;
})();
