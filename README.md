# maxplushfilms.com

Portfolio site for Max Plush, photographer and videographer.

Plain static site, no build step. Hosted on Cloudflare Pages from this repo (build command: none, output directory: `/`).

## Pages

- `index.html` — home: hero, bio, links to each section
- `dreamsea.html` — photos from DreamSea Surf Camp, Costa Rica
- `thirty-days.html` — the 30-day video challenge calendar
- `films.html` — short films
- `portfolio.html` — surf, nature, and Claremont Surf Club photos
- `about.html` — bio and contact

Shared styles are in `styles.css`. `lightbox.js` opens any `<a data-lightbox>` full screen.

## Adding a Thirty Days video

Put the clip (and optionally a still for the tile) in `videos/30/`, then add a line to `DAYS` at the top of `thirty-days.js`:

```js
{ day: 1, video: 'videos/30/day-01.mp4', poster: 'videos/30/day-01.jpg', title: 'First light' },
```

Days without an entry show as "Coming soon".

## Adding DreamSea photos

Put images in `images/dreamsea/` and add one link per photo inside the gallery in `dreamsea.html`:

```html
<a href="images/dreamsea/01.jpg" data-lightbox><img loading="lazy" src="images/dreamsea/01.jpg" alt="Describe the photo"></a>
```

Then remove the "Photos coming soon" paragraph.
