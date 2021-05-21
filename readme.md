# Ore price checker

[![Publish container](https://github.com/mitchfen/ore_price_checker/actions/workflows/docker-push.yaml/badge.svg)](https://github.com/mitchfen/ore_price_checker/actions/workflows/docker-push.yaml)  
Determines the most profitable HighSec ore to mine in EVE online using the [EVEMarketer](https://evemarketer.com/) API.

<img src="./screenshot.png" width="100%"/>

---

## Run it

Pick the region by specifying the trade hub. You can subsitute `jita` with `amarr`, `hek`, `dodixie`, or `rens`.

```bash
# With Docker
docker run -it --rm mitchfen/ore_price_checker:latest jita

# With npm
npm i
npm run build
npm run check jita
```
