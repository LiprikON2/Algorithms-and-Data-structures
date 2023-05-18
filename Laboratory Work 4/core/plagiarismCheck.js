import countAll from "./countAll";

const plagiarismCheck = (suspectedText, originalText, inARowThreshold = 3) => {
    const originalCleaned = preprocess(originalText);
    console.log("originalCleaned", originalCleaned.slice(0, 300), "...\n\n");

    const suspectedCleaned = preprocess(suspectedText);
    console.log("suspectedCleaned", suspectedCleaned.slice(0, 300), "...\n\n");

    const suspectedConsecutiveGroups = splitIntoConsecutiveGroups(
        suspectedCleaned,
        inARowThreshold
    );
    console.log("suspectedConsecutiveGroups (first 20)", suspectedConsecutiveGroups.slice(0, 20));

    const textToCharRatio = 1 / suspectedText.length;
    let plagiarismPercent = 0;

    console.time("kmpFind");
    for (let suspectedGroup of suspectedConsecutiveGroups) {
        const occurences = countAll(originalCleaned, suspectedGroup, "kmpFind");
        // const occurences = countAll(originalCleaned, suspectedGroup, "boyerMooreFind");
        // const occurences = countAll(originalCleaned, suspectedGroup, "bruteForceFind");
        // const occurences = countAll(originalCleaned, suspectedGroup, "rabinKarpFind");
        plagiarismPercent += occurences * suspectedGroup.length * textToCharRatio;
    }
    console.timeEnd("kmpFind");

    return plagiarismPercent;
};

const preprocess = (text) => {
    const removedPunctuation = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()«»—[\]]/g, "");
    const removedNumbers = removedPunctuation.replace(/[\d+]/g, "");
    const removedNewlines = removedNumbers.replace(/\n/g, " ");
    const removedExtraSpaces = removedNewlines.replace(/\s{2,}/g, " ").trim();
    const lowercased = removedExtraSpaces.toLowerCase();

    // const tokenizedWords = lowercased.split(" ");
    // const nonEmptyTokens = tokenizedWords.filter((token) => token);

    return lowercased;
};

const splitIntoConsecutiveGroups = (text, k = 3) => {
    const arr = text.split(" ");
    const consecutiveGroups = [];
    for (let i = 0; i < arr.length - k + 1; i++) {
        const consecutiveGroup = arr.slice(i, i + k);
        consecutiveGroups.push(consecutiveGroup.join(" "));
    }

    return consecutiveGroups;
};

export default plagiarismCheck;
