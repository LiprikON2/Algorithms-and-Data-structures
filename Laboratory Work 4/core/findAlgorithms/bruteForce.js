const bruteForceFind = (str, substr) => {
    for (let i = 0; i < str.length - substr.length + 1; i++) {
        let didNotBreak = true;
        for (let [j, character] of [...substr].entries()) {
            if (str[i + j] !== character) {
                didNotBreak = false;
                break;
            }
        }

        if (didNotBreak) return i;
    }
    return -1;
};

export default bruteForceFind;
