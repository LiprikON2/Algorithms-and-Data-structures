import scrapeWiki from "./scrapeWiki";
import { getPrimeArray } from "./primeNumber";
import { bruteForceFind, rabinKarpFind } from "./findAlgorithms";
import "../style.css";

const primeArr = getPrimeArray(500);
const primeStr = primeArr.join("");
// console.log("primeStr", primeStr);

const bruteResult = bruteForceFind(primeStr, "213");
console.log("bruteResult", bruteResult);

// const rabinKarpResult = rabinKarpFind(primeStr, "213");
const rabinKarpResult = rabinKarpFind("ЭТОИЭТОТ", "ТОТ");
console.log("rabinKarpResult", rabinKarpResult);

// const article = await scrapeWiki("Астероид");
// console.log("Article\n\n", article);
