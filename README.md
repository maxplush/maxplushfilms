# maxplushfilms.com

Portfolio site for Max Plush, filmmaker specializing in narrative short-form social content.

Plain static site, no build step. Hosted on Cloudflare Pages from this repo (build command: none, output directory: `/`).

## Pages

- `index.html` — home: bio and a link to the work
- `social.html` — three cards linking to the categories below
- `interviews.html`, `ad-work.html`, `personal.html` — video grids
- `thirty-days.html` — the 30-day video challenge calendar, linked from Personal
- `about.html` — bio and profile photo
- `contact.html` — "Let’s Create", email, LinkedIn and Instagram

Shared styles are in `styles.css`. `lightbox.js` plays any `<a data-lightbox data-video="...">` full screen, `preview.js` plays a muted preview on hover, and `theme.js` runs the light/dark toggle (colors are the variables at the top of `styles.css`).

## Videos

Video files (`.mp4`) are served from the Cloudflare R2 bucket `maxplushfilms-media` at `https://media.maxplushfilms.com/`, not from this repo: Pages ignored range requests, so videos buffered fully before playing and couldn't be scrubbed. R2 supports ranges. Posters (`.jpg`) stay in the repo.

To add a video: convert it to H.264 MP4, upload it to the bucket under the same path you'd use locally (e.g. `videos/ads/name.mp4`), and reference it by its full `https://media.maxplushfilms.com/...` URL. Local `.mp4` copies in `videos/` are git-ignored.

```sh
ffmpeg -i in.mov -vf "scale=1280:-2" -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart out.mp4
```

## Adding a video to Interviews or Ad Work

Upload the clip to R2 and put a still in `videos/interviews/` or `videos/ads/`, then add a tile inside the `clips` grid on that page (the pages have a commented example):

```html
<a class="clip" href="https://media.maxplushfilms.com/videos/ads/name.mp4" data-lightbox data-video="https://media.maxplushfilms.com/videos/ads/name.mp4" data-poster="videos/ads/name.jpg">
<img loading="lazy" src="videos/ads/name.jpg" alt="Short description">
<span class="tag"><span>Client</span><span>Title</span></span>
</a>
```

Tiles are vertical (9:16) and show above the photo sets.

## Photos

Full-resolution originals live in `social/` (not committed). Web copies go in `images/social/`, 2000px on the long edge:

```sh
sips -Z 2000 -s format jpeg -s formatOptions 78 "social/Group/photo.jpg" --out images/social/group-1.jpg
```

Each group is a `.set` row on its page. Give each photo `style="--r: <width / height>"` (0.75 for portrait, 1.333 for landscape) so the row lines up at one height, and `class="wide"` on landscape photos so they go full width on phones.

## Adding a Thirty Days video

Upload the clip to R2 as `videos/30/day-NN.mp4`, put a still in `videos/30/`, then add a line to `DAYS` at the top of `thirty-days.js`:

```js
{ day: 9, video: 'https://media.maxplushfilms.com/videos/30/day-09.mp4', poster: 'videos/30/day-09.jpg', title: 'First light' },
```

Days without an entry show as "Coming soon".
