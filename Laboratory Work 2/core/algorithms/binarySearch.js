const halveArray = (array) => {
    // Integer division
    const midPoint = Math.trunc(array.length / 2);

    const firstHalf = array.slice(0, midPoint);
    const secondHalf = array.slice(midPoint);

    return [firstHalf, secondHalf];
};

/* Returns the index of target element, by using binary search */
const binarySearch = (sortedArray, target, pos = 0, steps = 1) => {
    // console.log("Searching for", target, "in", sortedArray);
    const [leftHalf, rightHalf] = halveArray(sortedArray);

    const middleItemPos = leftHalf.length - 1;
    const middleItemLeft = leftHalf[middleItemPos];
    const middleItemRight = rightHalf[0];

    // Found
    if (middleItemLeft === target) {
        const targetIndex = pos + middleItemPos;
        return [targetIndex, steps];
    }
    // Found
    if (middleItemRight === target) {
        const targetIndex = pos + middleItemPos + 1;
        return [targetIndex, steps];
    }
    // Not found
    if (sortedArray.length <= 1) return [-1, steps];

    // Recurse into left or right half
    if (middleItemLeft > target) {
        return binarySearch(leftHalf, target, pos, steps + 1);
    } else {
        return binarySearch(rightHalf, target, pos + middleItemPos + 1, steps + 1);
    }
};

const sortedArray = [1, 3, 5, 6, 8, 9, 10, 12, 14, 16, 17];
//                   0  1  2  3  4  5  6   7   8   9   10

const [targetIndex, recCount] = binarySearch(sortedArray, 17);

console.log("binarySearch.js:");
console.log("sortedArray", sortedArray, "item", 17);
console.log("targetIndex", targetIndex, `| O(permutations(${sortedArray.length})) =`, recCount);

export default binarySearch;
