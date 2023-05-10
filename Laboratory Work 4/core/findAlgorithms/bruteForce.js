const bruteForceFind = (str, substr) => {
    for (let i = 0; i < str.length - substr.length + 1; i++) {
        let didNotBreak = true;
        for (let [j, symbol] of [...substr].entries()) {
            if (str[i + j] !== symbol) {
                didNotBreak = false;
                break;
            }
        }

        if (didNotBreak) return i;
    }
    return -1;
};

export default bruteForceFind;
