import bruteForceFind from "./bruteForce";

const boyerMooreFind = (str, substr, logging = false) => {
    let found = false;
    let shift = 1;
    let pos = 0;
    while (!found && pos < str.length - substr.length + 1) {
        [found, shift] = recCompare(str, substr, pos, substr.length - 1, logging);
        pos += shift;
    }

    return found ? pos : -1;
};

const recCompare = (str, substr, strPos, substrPos, logging) => {
    if (logging) {
        console.log(str, substr);
        console.log(
            Array.from(str)
                .map((_, i) => i)
                .join(""),
            Array.from(substr)
                .map((_, i) => i)
                .join("")
        );
        console.log(
            Array.from(str)
                .map((_, i) => (i === strPos + substr.length - 1 ? "↑" : " "))
                .join(""),
            Array.from(substr)
                .map((_, i) => (i === substrPos ? "↑" : " "))
                .join("")
        );
        console.log("");
    }
    const strChar = str[strPos + substr.length - 1];
    const substrChar = substr[substrPos];
    if (strChar === substrChar) {
        if (substrPos > 0) return recCompare(str, substr, strPos - 1, substrPos - 1, logging);
        return [true, 0];
    } else {
        const substrCharPos = bruteForceFind(substr, strChar);
        const shift = substrCharPos !== -1 ? substrPos - substrCharPos : substr.length;
        if (logging) console.log("shift", shift);

        return [false, 1];
    }
};

export default boyerMooreFind;
