import _ from "lodash";

import { getPrimeArray } from "./primeNumber";
import { bruteForceFind, rabinKarpFind, boyerMooreFind, kmpFind } from "./findAlgorithms";
import countAll from "./countAll";
import scrapeWiki from "./scrapeWiki";
import "../style.css";

const primeArr = getPrimeArray(500);
const primeStr = primeArr.join("");
console.log("primeStr", primeStr);

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

const kmpFindResult = kmpFind("ЭТОИЭТОТ", "ТОТ");
console.log("kmpFindResult ЭТОИЭТОТ", kmpFindResult);

// const kmpFindResult2 = kmpFind(primeStr, "213");
// console.log("kmpFindResult primeStr", kmpFindResult2);

const kmpFindResult2 = kmpFind("aaba", "ab");
console.log("kmpFindResult aaba", kmpFindResult2);

const countTwoDigitOccurences = (str, algorithmName) => {
    const aDigits = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const bDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    const twoDigitCombinations = aDigits.flatMap((a) => bDigits.map((b) => a + b));

    const counts = Object.fromEntries(
        twoDigitCombinations.map((twoDigits) => {
            const count = countAll(str, twoDigits, algorithmName);
            return [twoDigits, count];
        })
    );

    const countEntries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    return countEntries;
};

// const bruteForceCount = countTwoDigitOccurences(primeStr, "bruteForceFind");
// const rabinKarpCount = countTwoDigitOccurences(primeStr, "rabinKarpFind");
// const boyerMooreCount = countTwoDigitOccurences(primeStr, "boyerMooreFind");
// const kmpCount = countTwoDigitOccurences(primeStr, "kmpFind");

// console.log("bruteForceCount", bruteForceCount);
// console.log("rabinKarpCount", rabinKarpCount);
// console.log("boyerMooreCount", boyerMooreCount);
// console.log("kmpCount", kmpCount);
// console.log(
//     "Gave the same result?",
//     _.isEqual(bruteForceCount, rabinKarpCount) &&
//         _.isEqual(bruteForceCount, boyerMooreCount) &&
//         _.isEqual(bruteForceCount, kmpCount)
// );

// const article = await scrapeWiki("Астероид");
// console.log("Article\n\n", article);
