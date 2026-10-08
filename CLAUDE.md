# I LOVE GARBA animation: instructions for Claude Code

This folder is a finished, self-contained web animation. Someone who points you at it most likely wants one of three things. Handle them as follows.

## 1. "Make / run / show the animation"
The animation is already built. Nothing needs compiling.

1. Serve the folder and open `index.html`:
   - In the desktop app, open it in the browser pane (serve with `npx -y http-server . -p 5178 -c-1`, then open `http://localhost:5178/index.html`).
   - From a terminal: `npm start` (serves and opens the browser).
   - Or just tell the user to double-click `index.html`. It works from `file://` too.
2. It needs internet access once: mo.js loads from `cdn.jsdelivr.net`.
3. To check a specific moment without watching playback, open `index.html?t=<ms>` (for example `?t=2500` shows "I ♥ GARBA"). The animation freezes on that frame.

## 2. "Change the word" (I LOVE <WORD>)
Don't edit the SVG paths by hand. Run:

```bash
npm install
npm run word -- NAVRATRI
```

- `tools/set-word.js` draws "I LOVE <WORD>" as SVG paths in Montserrat Bold, fits it between the white bars, and rewrites the `<g class="letters">` block and `<title>` in `index.html`.
- Allowed characters: A–Z, 0–9 and spaces. Lowercase is converted to uppercase.
- The animation code reads letters by `data-part="i" | "love" | "word"` and measures them at runtime, and the heart size scales with the letter height. So no JavaScript changes are needed for a new word.
- Verify afterwards by opening `index.html?t=300`, `?t=2500` and `?t=3600`.

## 3. "Change the look or timing"
Everything is in `index.html`:
- Colors: `.lttr { fill }` (letters), `el.colHeart` (heart), `.line { stroke }` (bars), `body { background-color }`.
- Timing: the constants at the top of `crtLoveTl()` (`SQUEEZE`, `CLOSE_AT`, `CLOSE`, `HOLD`, `COLLAPSE`, `OUT_AT`, `OUT`, `FADE_IN_AT`) and the loop interval (`4600`) at the bottom. If you lengthen the timeline, raise the loop interval to match.

## How it works (so you don't need to rediscover it)
- The 500×200 stage is one SVG (letters and white bars) plus a `.mo-container` div where mo.js draws the heart and bursts. One stage pixel equals one SVG unit, so mo.js `x` offsets and SVG coordinates line up.
- The sequence: LOVE squeezes and pops into a heart; I and the word slide in around it to read "I ♥ WORD"; everything folds into the heart in the middle with a burst; the heart shrinks away; repeat.
- Sound is a synthesized "blop" using the Web Audio API, off until the user clicks **sound**.
- `code-card/` holds a 1080×1080 social-media image of part of the code (`code-card.html` is its source; export it with headless Chrome at a 1080×1080 window).

## Credits
Based on Anton Mudrenok's mo.js CodePen (MIT, see `LICENSE.txt`) and Gal Shir's "I Love You" Dribbble design. Keep `LICENSE.txt` when sharing.
