# Ore price checker

[![Publish container](https://github.com/mitchfen/ore_price_checker/actions/workflows/publishContainer.yaml/badge.svg)](https://github.com/mitchfen/ore_price_checker/actions/workflows/publishContainer.yaml)  
Determines the most profitable HighSec ore to mine in EVE online using the [EVEMarketer](https://evemarketer.com/) API.

## Screenshot

<img src="./screenshot.png" width="100%"/>

## Run it

Pick the region by specifying the trade hub. You can subsitute `jita` with `amarr`, `hek`, `dodixie`, or `rens`.

### With Docker

```bash
docker run -it --rm ghcr.io/mitchfen/ore_price_checker:latest jita
```

### With npm

```bash
npm install
npm run build
npm run check jita
```
