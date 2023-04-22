/* 
    Divides array into two parts around a pivot item:
    - First part: smaller than the pivot
    - Second part: greater than the pivot
*/
const partition = (arr, compareFn, stepsCounter, startIndex, endIndex) => {
    const pivot = arr[endIndex];
    let partitionIndex = startIndex;

    for (let itemIndex = startIndex; itemIndex < endIndex; itemIndex++) {
        const item = arr[itemIndex];
        if (compareFn(item, pivot) < 0) {
            // Sort two items by swapping them
            [arr[itemIndex], arr[partitionIndex]] = [arr[partitionIndex], arr[itemIndex]];

            partitionIndex++;
            stepsCounter.count++;
        }
    }

    // Final step: swap pivot
    [arr[endIndex], arr[partitionIndex]] = [arr[partitionIndex], arr[endIndex]];
    return partitionIndex;
};

const recQuickSort = (arr, compareFn, stepsCounter, startIndex = 0, endIndex = arr.length - 1) => {
    if (startIndex >= endIndex) return;

    const pivotIndex = partition(arr, compareFn, stepsCounter, startIndex, endIndex);

    // Sorts first part of the array (excluding pivot itself)
    recQuickSort(arr, compareFn, stepsCounter, startIndex, pivotIndex - 1);
    // Sorts second part of the array (excluding pivot itself)
    recQuickSort(arr, compareFn, stepsCounter, pivotIndex + 1, endIndex);

    return arr;
};

const quickSort = (arr, compareFn) => {
    let stepsCounter = { count: 0 };
    const t0 = performance.now();

    recQuickSort(arr, compareFn, stepsCounter);

    const t1 = performance.now();
    const time = (t1 - t0) / 1000;
    return [arr, stepsCounter.count, time];
};

export default quickSort;
