import findAlgorithms from "./findAlgorithms";

const countAll = (str, substr, algorithmName = "bruteForceFind") => {
    const find = findAlgorithms[algorithmName];
    let count = 0;
    let pos = 0;

    while (pos < str.length - substr.length + 1) {
        const substrIndex = find(str.slice(pos, str.length), substr);
        if (substrIndex !== -1) {
            count++;
            pos += substrIndex + substr.length;
        } else break;
    }
    return count;
};

export default countAll;
