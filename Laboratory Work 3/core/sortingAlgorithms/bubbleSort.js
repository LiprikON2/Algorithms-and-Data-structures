const bubbleSort = (arr, compareFn) => {
    let steps = 0;
    const t0 = performance.now();

    for (let iteration = 0; iteration < arr.length; iteration++) {
        for (let cursor = 0; cursor < arr.length - 1; cursor++) {
            const leftItem = arr[cursor];
            const rightItem = arr[cursor + 1];

            if (compareFn(leftItem, rightItem) > 0) {
                arr[cursor + 1] = leftItem;
                arr[cursor] = rightItem;
            }
            steps++;
        }
    }
    const t1 = performance.now();

    const time = (t1 - t0) / 1000;
    return [arr, steps, time];
};

// const unsortedArr = [99, 92, 12, 21, 42, 1];

// const [sortedArr, steps] = bubbleSort(unsortedArr);

// console.log("\nbubbleSort.js:");
// console.log("unsortedArr", unsortedArr);
// console.log("bubbleSortedArr", sortedArr, `| O(bubble(${unsortedArr.length})) =`, steps);

export default bubbleSort;
