# Ore price checker

[![Publish container](https://github.com/mitchfen/ore_price_checker/actions/workflows/publishContainer.yaml/badge.svg)](https://github.com/mitchfen/ore_price_checker/actions/workflows/publishContainer.yaml)  
Determines the most profitable HighSec ore to mine in EVE online using the [EVEMarketer](https://evemarketer.com/) API.


<img src="./screenshot.png" width="100%"/>

## Run it
```bash
# Pick the region by specifying the trade hub.
# Subsitute `jita` with `amarr`, `hek`, `dodixie`, or `rens`.

# Using docker
docker run -it --rm ghcr.io/mitchfen/ore_price_checker:latest jita

# Or using npm
npm ci
npm run check jita
```
