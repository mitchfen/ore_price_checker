# Ore price checker

- Determines the most profitable HighSec ore to mine in EVE online.
- Uses the [EVEMarketer](https://evemarketer.com/) API.

## Screenshot
<img src="./screenshot.png" width="100%"/>

## Run it
Pick the region by specifying the trade hub. You can subsitute `jita` with `amarr`, `hek`, `dodixie`, or `rens`.
```bash
# With Docker
docker run -it --rm mitchfen/ore_price_checker:latest jita

# Or with npm
npm i
npm run build
npm run check jita
```
