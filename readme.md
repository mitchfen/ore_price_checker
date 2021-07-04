![header](https://capsule-render.vercel.app/api?type=waving&color=F4900C&height=130&section=header&text=Ore%20price%20checker%20⛏️&fontSize=40&rotate=+0&fontAlign=30&fontAlignY=36)

[![Publish container](https://github.com/mitchfen/ore_price_checker/actions/workflows/publishContainer.yaml/badge.svg)](https://github.com/mitchfen/ore_price_checker/actions/workflows/publishContainer.yaml)  
### Determines the most profitable HighSec ore to mine in EVE online using the [EVEMarketer](https://evemarketer.com/) API.

<img src="./screenshot.png" width="100%"/>

## How to run it:
```bash
# Pick the region by specifying the trade hub.
# Subsitute `jita` with `amarr`, `hek`, `dodixie`, or `rens`.

# Using docker
docker run -it --rm ghcr.io/mitchfen/ore_price_checker:latest jita

# Or using npm
npm ci
npm run check jita
```
