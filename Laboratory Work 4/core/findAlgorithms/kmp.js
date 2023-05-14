// https://www.youtube.com/watch?v=pu2aO_3R118
const kmpFind = (str, substr) => {
    const maxPrefixLengths = getMaxPrefixLengths(substr);
    let i = 0;
    let j = 0;

    while (i < str.length) {
        if (str[i] === substr[j]) {
            if (j === substr.length - 1) return i - j;
            i++;
            j++;
        } else if (j - 1 >= 0) {
            j = maxPrefixLengths[j - 1];
        } else i++;
    }

    return -1;
};

const getMaxPrefixLengths = (str) => {
    // 'TOT' -> ['Т', 'ТО', 'ТОТ']
    const slices = Array.from(str).map((_, index) => str.slice(0, index + 1));
    const lengths = slices.map((slice) => {
        let maxLength = 0;
        for (let i = 1; i < slice.length; i++) {
            const slicePrefix = slice.slice(0, i);
            const sliceSuffix = slice.slice(slice.length - i, slice.length);

            if (slicePrefix === sliceSuffix && maxLength < sliceSuffix.length) {
                maxLength = sliceSuffix.length;
            }
        }
        return maxLength;
    });

    return lengths;
};

export default kmpFind;
