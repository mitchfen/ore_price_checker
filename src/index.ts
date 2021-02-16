import { calculateAndPrint } from "./calculateAndPrint";
import { parseData } from "./parseData";
import { buildURL } from "./buildURL";
let ores: JSON = require("../JSON/ores.json");
const fetchURL = require("node-fetch");

// Fetch and parse data from API
let url = buildURL(ores);
fetchURL(url)
  .then((response: any) => response.json())
  .then((priceData: JSON) => parseData(priceData, ores))
  .then(() => calculateAndPrint(ores));
