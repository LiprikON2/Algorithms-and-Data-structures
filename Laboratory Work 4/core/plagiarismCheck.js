import _ from "lodash";

const plagiarismCheck = (suspectedText, originalText, inARowThreshold = 3) => {
    const originalTokens = preprocess(originalText);
    console.log("preprocessedOriginalText", originalTokens);

    const suspectedTokens = preprocess(suspectedText);
    console.log("preprocessedSuspectedText", suspectedTokens);

    const originalConsecutiveGroups = splitIntoConsecutiveGroups(originalTokens, inARowThreshold);
    console.log("originalConsecutiveGroups", originalConsecutiveGroups);

    const suspectedConsecutiveGroups = splitIntoConsecutiveGroups(suspectedTokens, inARowThreshold);
    console.log("suspectedConsecutiveGroups", suspectedConsecutiveGroups);

    const textToCharRatio = 1 / suspectedText;
    let plagiarismPercent = 0;

    for (let suspectedGroup of suspectedConsecutiveGroups) {
        const isSuspectedInOriginal = _.some(originalConsecutiveGroups, suspectedGroup);
        console.log("isSuspectedInOriginal", isSuspectedInOriginal);
        if (isSuspectedInOriginal) {
            const groupLength = suspectedGroup.join("").length;
            plagiarismPercent += groupLength * textToCharRatio;
        }
    }

    return plagiarismPercent;
};

const preprocess = (text) => {
    const removedPunctuation = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()«»—[\]]/g, "");
    const removedNumbers = removedPunctuation.replace(/[\d+]/g, "");
    const removedNewlines = removedNumbers.replace(/\n/g, " ");
    const removedExtraSpaces = removedNewlines.replace(/\s{2,}/g, " ");
    const lowercased = removedExtraSpaces.toLowerCase();

    const tokenizedWords = lowercased.split(" ");
    const nonEmptyTokens = tokenizedWords.filter((token) => token);

    return nonEmptyTokens;
};

const splitIntoConsecutiveGroups = (arr, k = 3) => {
    const consecutiveGroups = [];
    for (let i = 0; i < arr.length - k + 1; i++) {
        const consecutiveGroup = arr.slice(i, i + k);
        consecutiveGroups.push(consecutiveGroup);
    }

    return consecutiveGroups;
};

export default plagiarismCheck;
