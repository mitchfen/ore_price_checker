const fetchURL = require("node-fetch");
const chalk = require("chalk");

let ores = [
  {
    name: "Veldspar",
    id: 1230,
    compressed_id: 28432,
    volume: 0.1,
    compressed_volume: 0.15,
    price: 0,
    compressed_price: 0,
  },
  {
    name: "Concentrated Veldspar",
    id: 17470,
    compressed_id: 28430,
    volume: 0.1,
    compressed_volume: 0.15,
    price: 0,
    compressed_price: 0,
  },
  {
    name: "Dense Veldspar",
    id: 17471,
    compressed_id: 28431,
    volume: 0.1,
    compressed_volume: 0.15,
    price: 0,
    compressed_price: 0,
  },
  {
    name: "Plagioclase",
    id: 18,
    compressed_id: 28422,
    volume: 0.35,
    compressed_volume: 0.15,
    price: 0,
    compressed_price: 0,
  },
  {
    name: "Azure Plagioclase",
    id: 17455,
    compressed_id: 28421,
    volume: 0.35,
    compressed_volume: 0.15,
    price: 0,
    compressed_price: 0,
  },
  {
    name: "Rich Plagioclase",
    id: 17456,
    compressed_id: 28423,
    volume: 0.35,
    compressed_volume: 0.15,
    price: 0,
    compressed_price: 0,
  },
  {
    name: "Scordite",
    id: 1228,
    compressed_id: 28429,
    volume: 0.15,
    compressed_volume: 0.19,
    price: 0,
    compressed_price: 0,
  },
  {
    name: "Condensed Scordite",
    id: 17463,
    compressed_id: 28427,
    volume: 0.15,
    compressed_volume: 0.19,
    price: 0,
    compressed_price: 0,
  },
  {
    name: "Massive Scordite",
    id: 17464,
    compressed_id: 28428,
    volume: 0.15,
    compressed_volume: 0.19,
    price: 0,
    compressed_price: 0,
  },
];

// Parse the price data and store in ores object
function parseData(priceData: any) {
  // Parse out the prices
  for (let i = 0; i < priceData.length; i++) {
    for (let j = 0; j < ores.length; j++) {
      // Get prices for non-compressed ores
      if (priceData[i].buy.forQuery.types[0] == ores[j].id) {
        ores[j].price = priceData[i].buy.wavg;
      } else if (priceData[i].buy.forQuery.types[0] == ores[j].compressed_id) {
        ores[j].compressed_price = priceData[i].buy.wavg;
      }
    }
  }
}

// Calculate most profitable ore and print to screen
function calculateAndPrint() {
  let bestOre = ores[0].name;
  let compressionGain = null;
  // Bubble up the largest price
  let bestPricePerM3 = ores[0].price / ores[0].volume;
  for (let i = 1; i < ores.length; i++) {
    if (ores[i].price / ores[i].volume > bestPricePerM3) {
      bestPricePerM3 = ores[i].price / ores[i].volume;
      bestOre = ores[i].name;
      // Calculate the % gained by compression.
      // 1 Compressed ore is composed of 100 units of normal ore.
      compressionGain = (
        ((ores[i].compressed_price / 100 - ores[i].price) / ores[i].price) *
        100
      ).toFixed(2);
    }
  }
  // Print results to screen
  console.table(ores);
  console.log(
    "The most profitable ore to mine today is: " +
      chalk.green(bestOre) +
      " at " +
      chalk.green("%i ISK/m3"),
    bestPricePerM3
  );
  console.log(
    "You can compress it to increase profits by " + chalk.yellow("%f%"),
    compressionGain
  );
  console.log();
}

// Build up the fetch URL from the ores in ores.json
function buildURL() {
  let typeIDs: Array<number> = [];
  for (let i = 0; i < ores.length; i++) {
    typeIDs.push(ores[i].id);
    typeIDs.push(ores[i].compressed_id);
  }
  let regionLimit = "10000002"; // Value for "The Forge" - Jita trade hub
  let url = `https://api.evemarketer.com/ec/marketstat/json?regionlimit=${regionLimit}`;
  // Build the search URL
  for (let i = 0; i < typeIDs.length; i++) {
    url = url + `&typeid=${typeIDs[i]}`;
  }
  return url;
}

// Fetch and parse data from API
let url = buildURL();
fetchURL(url)
  .then((response: any) => response.json())
  .then((priceData: JSON) => parseData(priceData))
  .then(() => calculateAndPrint());
