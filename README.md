# I LOVE GARBA ♥ animation

An animated "I LOVE GARBA" made with [mo.js](https://mojs.github.io/): LOVE pops into a heart, the letters gather around it to read "I ♥ GARBA", then everything folds into the heart and it starts again.

## See it
- **Easiest:** double-click `index.html`. It opens in your browser. It needs internet access to load the animation library.
- **With Node.js installed:** run `npm start`.
- **With Claude Code:** give it this folder's path and say "make the animation" or "run the animation". The `CLAUDE.md` file tells it what to do.

## Change the word
Requires [Node.js](https://nodejs.org).

```bash
npm install
npm run word -- NAVRATRI
```

That rewrites `index.html` to say "I LOVE NAVRATRI". Any word using letters A–Z, digits or spaces works, and long words shrink to fit. With Claude Code you can just ask: *"change the word to NAVRATRI"*.

## Freeze a frame
Add `?t=<milliseconds>` to the address, for example `index.html?t=2500`, to stop on that moment. It's useful for screenshots.

## What's inside
| File | What it is |
|---|---|
| `index.html` | The animation: everything in one file |
| `tools/set-word.js` | Changes the word (draws the letters in Montserrat Bold) |
| `code-card/` | A 1080×1080 "code snippet" image for social media, plus its HTML source |
| `CLAUDE.md` | Instructions for Claude Code |
| `LICENSE.txt` | MIT license of the original work |

## Credits
- Original mo.js animation: [Anton Mudrenok on CodePen](https://codepen.io/mudrenok/pen/XMobMa) (MIT)
- Original design: [Gal Shir on Dribbble](https://dribbble.com/shots/3278810-I-Love-You-Responsive)
- Typeface for the letters: [Montserrat](https://fonts.google.com/specimen/Montserrat) (SIL Open Font License)
