# Ore price checker

- Determines the most profitable HighSec ore to mine in EVE online. This was a fun chance to learn the Fetch API and play around with Typescript.
- The program also calculates the percent profit to be gained by compressing your ore.
- Uses the [API](https://api.evemarketer.com/ec/) from [EVEMarketer](https://evemarketer.com/).
- Loosley follows the [emoji commit paradigm](https://github.com/cooperka/emoji-commit-messages)

## Screenshot

<img src="./screenshot.png" width="100%"/>

## Run it!

### 1. As a Docker container

1. Pull the image from [DockerHub](https://hub.docker.com/r/mitchfen/ore_price_checker):  
   `docker pull mitchfen/ore_price_checker:1.0`
2. Run a container interactively:  
   `docker run -it --rm mitchfen/ore_price_checker:1.0`

### 2. Locally with Node.js

1. Install Dependencies: `npm i`
2. Compile: `npm run build`
3. Run: `npm run start`
