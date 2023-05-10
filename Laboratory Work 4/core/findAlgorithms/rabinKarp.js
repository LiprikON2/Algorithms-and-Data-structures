import bruteForceFind from "./bruteForce";

const rabinKarpFind = (str, substr) => {
    const alphabet = alphabetize(str);
    console.log("alphabet", alphabet, "from", str);

    const substrHash = calcHash(substr, alphabet, true);
    const chunkSize = substr.length;

    for (let i = 0; i < str.length - chunkSize + 1; i++) {
        const chunk = str.slice(i, i + chunkSize);
        const chunkHash = calcHash(chunk, alphabet);

        if (chunkHash === substrHash) {
            const substrIndex = bruteForceFind(chunk, substr);
            if (substrIndex !== -1) return i;
        }
    }
    return -1;
};

const alphabetize = (str) => {
    const uniqueCharacters = [...new Set(str)];
    const alphabetObj = Object.fromEntries(
        uniqueCharacters.map((character, index) => [character, index])
    );
    return alphabetObj;
};

// Formula: https://i.imgur.com/CXF4a4w.png
const calcHash = (pattern, alphabet, logging = false) => {
    let hash = 0;
    const m = pattern.length;
    const x = Object.keys(alphabet).length;
    for (let i = 0; i < m; i++) {
        const character = pattern[i];
        const n = alphabet[character];
        hash += n * x ** (m - i - 1);
        if (logging) console.log(`${n} * ${x}^${m - i - 1}`, i + 1 < m ? "+" : `= ${hash}`);
    }
    return hash;
};

export default rabinKarpFind;
