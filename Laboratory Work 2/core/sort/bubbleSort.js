const bubbleSort = (arr) => {
    // Copy array by value
    arr = arr.slice();
    let steps = 0;

    for (let iteration = 0; iteration < arr.length; iteration++) {
        for (let cursor = 0; cursor < arr.length - 1; cursor++) {
            const leftItem = arr[cursor];
            const rightItem = arr[cursor + 1];

            if (leftItem > rightItem) {
                arr[cursor + 1] = leftItem;
                arr[cursor] = rightItem;
            }
            steps++;
        }
    }

    return [arr, steps];
};

const unsortedArr = [99, 92, 12, 21, 42, 1];

const [sortedArr, steps] = bubbleSort(unsortedArr);

console.log("unsortedArr", unsortedArr);
console.log("bubbleSortedArr", sortedArr, `| O(bubble(${unsortedArr.length})) =`, steps);

export default bubbleSort;
