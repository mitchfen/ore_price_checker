# Ore price checker

- Determines the most profitable HighSec ore to mine in EVE online.
- This was a fun chance to learn the Fetch API, TypeScript, and Docker.
- Uses the [EVEMarketer](https://evemarketer.com/) API.
- Loosley follows the [emoji commit paradigm](https://github.com/cooperka/emoji-commit-messages)

<img src="./screenshot.png" width="100%"/>

## Run it!

Pick the region by specifying the trade hub. You can subsitute `jita` with `amarr`, `hek`, `dodixie`, or `rens`.

### With Docker:

```
docker run -it --rm mitchfen/ore_price_checker:latest jita
```

### With Node.js

```
npm i
npm run build
npm run check jita
```
