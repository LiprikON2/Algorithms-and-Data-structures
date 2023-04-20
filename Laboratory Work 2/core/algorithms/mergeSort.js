const halveArray = (array) => {
    // Integer division
    const midPoint = Math.trunc(array.length / 2);

    const firstHalf = array.slice(0, midPoint);
    const secondHalf = array.slice(midPoint);

    return [firstHalf, secondHalf];
};

const mergeSort = (arr, steps = 1) => {
    const merge = (a, b, steps) => {
        const arr = [];
        while (a.length > 0 && b.length > 0) {
            const aFirst = a[0];
            const bFirst = b[0];
            if (aFirst < bFirst) {
                a.shift();
                arr.push(aFirst);
            } else {
                b.shift();
                arr.push(bFirst);
            }
            steps++;
        }

        const result = [...arr, ...a, ...b];
        return [result, steps];
    };

    if (arr.length < 2) return [arr, steps];

    const [leftHalf, rightHalf] = halveArray(arr);
    const [leftSorted, leftSteps] = mergeSort(leftHalf, steps + 1);
    const [rightSorted, rightSteps] = mergeSort(rightHalf, leftSteps + 1);

    return merge(leftSorted, rightSorted, rightSteps);
};

const array = [2, 3, 4, 1];

console.log("\nmergeSort.js:");
console.log("array", array);

const [sortedArray, steps] = mergeSort(array.slice());
console.log("sortedArray", sortedArray, `| O(count(${array.length})) =`, steps);

export default mergeSort;
