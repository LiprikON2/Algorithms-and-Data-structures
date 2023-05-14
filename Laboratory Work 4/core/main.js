import _ from "lodash";

import { getPrimeArray } from "./primeNumber";
import { bruteForceFind, rabinKarpFind, boyerMooreFind, kmpFind } from "./findAlgorithms";
import countAll from "./countAll";
import scrapeWiki from "./scrapeWiki";
import scrapeDocx from "./scrapeDocx";
// import "../style.css";

const primeArr = getPrimeArray(500);
const primeStr = primeArr.join("");
console.log("primeStr", primeStr, "\n\n");

const bruteResult = bruteForceFind(primeStr, "213");
console.log("bruteResult", bruteResult, "\n\n");

const rabinKarpResult = rabinKarpFind("ЭТОИЭТОТ", "ТОТ", true);
console.log("rabinKarpResult ЭТОИЭТОТ", rabinKarpResult);

const rabinKarpResult2 = rabinKarpFind(primeStr, "213");
console.log("rabinKarpResult primeStr", rabinKarpResult2, "\n\n");

const boyerMooreResult = boyerMooreFind("ЭТОИЭТОТ", "ТОТ", true);
console.log("boyerMooreResult ЭТОИЭТОТ", boyerMooreResult);

const boyerMooreResult2 = boyerMooreFind(primeStr, "213");
console.log("boyerMooreResult primeStr", boyerMooreResult2, "\n\n");

const kmpFindResult = kmpFind("ЭТОИЭТОТ", "ТОТ");
console.log("kmpFindResult ЭТОИЭТОТ", kmpFindResult);

const kmpFindResult2 = kmpFind(primeStr, "213");
console.log("kmpFindResult primeStr", kmpFindResult2, "\n\n");

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

const bruteForceCount = countTwoDigitOccurences(primeStr, "bruteForceFind");
const rabinKarpCount = countTwoDigitOccurences(primeStr, "rabinKarpFind");
const boyerMooreCount = countTwoDigitOccurences(primeStr, "boyerMooreFind");
const kmpCount = countTwoDigitOccurences(primeStr, "kmpFind");

console.log("Counting two digits in primeStr:");
console.log("bruteForceCount", bruteForceCount);
console.log("rabinKarpCount", rabinKarpCount);
console.log("boyerMooreCount", boyerMooreCount);
console.log("kmpCount", kmpCount);
console.log(
    "Gave the same result?",
    _.isEqual(bruteForceCount, rabinKarpCount) &&
        _.isEqual(bruteForceCount, boyerMooreCount) &&
        _.isEqual(bruteForceCount, kmpCount),
    "\n\n"
);

const article = await scrapeWiki("Астероид");
console.log("Article\n", article.slice(0, 300), "...\n\n\n");

const abstract = await scrapeDocx("Астероид.docx");
console.log("Abstract\n", abstract.slice(0, 300), "...\n\n\n");

const preprocess = (text) => {
    const removedPunctuation = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()«»—[\]]/g, "");
    const removedNumbers = removedPunctuation.replace(/[\d+]/g, "");
    const removedExtraSpaces = removedNumbers.replace(/\s{2,}/g, " ");
    const removedNewlines = removedExtraSpaces.replace(/\n/g, " ");
    const lowercased = removedNewlines.toLowerCase();

    const wordTokenized = lowercased.split(" ");

    return wordTokenized;
};
const preprocessedArticle = preprocess(article);
console.log("preprocessedArticle", preprocessedArticle);

const preprocessedAbstract = preprocess(abstract);
console.log("preprocessedAbstract", preprocessedAbstract);
