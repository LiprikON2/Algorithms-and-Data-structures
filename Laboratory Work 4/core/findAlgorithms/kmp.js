const kmpFind = (str, substr) => {
    const prefixLengths = measurePrefixLengths(substr);
    let shift;
    let pos = 0;

    while (pos < str.length - substr.length + 1) {
        let matched = 0;

        for (let i = pos; i < pos + substr.length; i++) {
            if (str[i] === substr[i - pos]) {
                matched++;
            } else {
                // formula: https://i.imgur.com/6DWGo0Z.png
                // shift = matched - prefixLengths[i - pos] + 1;
                // shift = Math.max(matched - prefixLengths[i - pos], 1);
                const potentialShift = matched - prefixLengths[i - pos];
                shift = potentialShift === 0 ? 1 : potentialShift;
                console.log("shift", shift);
                break;
            }
        }
        if (matched === substr.length) return pos;
        pos += shift;
    }
    return -1;
};

const measurePrefixLengths = (str) => {
    const slices = Array.from(str).map((_, index) => str.slice(0, index + 1));
    const lengths = slices.map((slice) => {
        let maxLength = 0;
        for (let i = 1; i < slice.length; i++) {
            const slicePrefix = slice.slice(0, i);
            const sliceSuffix = slice.slice(slice.length - i, slice.length);

            if (slicePrefix === sliceSuffix) {
                if (maxLength < sliceSuffix.length) maxLength = sliceSuffix.length;
            }
        }
        return maxLength;
    });

    return lengths;
};

export default kmpFind;
