const jsSort = (arr) => {
    // Copy array by value
    arr = arr.slice();
    let steps = 0;

    arr.sort((a, b) => {
        steps++;
        return a - b;
    });

    return [arr, steps];
};

const unsortedArr = [99, 92, 12, 21, 42, 1];

const [jsSortedArr, steps] = jsSort(unsortedArr);

console.log("unsortedArr", unsortedArr);
console.log("jsSortedArr", jsSortedArr, `| O(jsSort(${unsortedArr.length})) =`, steps);

export default jsSort;
