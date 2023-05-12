import scrapeWiki from "./scrapeWiki";
import { getPrimeArray } from "./primeNumber";
import { bruteForceFind, rabinKarpFind, boyerMooreFind } from "./findAlgorithms";
import "../style.css";

const primeArr = getPrimeArray(500);
const primeStr = primeArr.join("");
// console.log("primeStr", primeStr);

const bruteResult = bruteForceFind(primeStr, "213");
console.log("bruteResult", bruteResult);

const rabinKarpResult = rabinKarpFind("ЭТОИЭТОТ", "ТОТ", true);
console.log("rabinKarpResult ЭТОИЭТОТ", rabinKarpResult);

const rabinKarpResult2 = rabinKarpFind(primeStr, "213");
console.log("rabinKarpResult primeStr", rabinKarpResult2);

const boyerMooreResult = boyerMooreFind("ЭТОИЭТОТ", "ТОТ", true);
console.log("boyerMooreResult ЭТОИЭТОТ", boyerMooreResult);

const boyerMooreResult2 = boyerMooreFind(primeStr, "213");
console.log("boyerMooreResult primeStr", boyerMooreResult2);

// const article = await scrapeWiki("Астероид");
// console.log("Article\n\n", article);
