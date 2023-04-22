/* 
    Divides array into two parts around a pivot item:
    - First part: smaller than the pivot
    - Second part: greater than the pivot
*/
const partition = (arr, compareFn, startIndex, endIndex) => {
    const pivot = arr[endIndex];
    let partitionIndex = startIndex;

    for (let itemIndex = startIndex; itemIndex < endIndex; itemIndex++) {
        const item = arr[itemIndex];
        if (compareFn(item, pivot) < 0) {
            // Sort two items by swapping them
            [arr[itemIndex], arr[partitionIndex]] = [arr[partitionIndex], arr[itemIndex]];

            partitionIndex++;
        }
    }

    // Final step: swap pivot
    const pivotIndex = partitionIndex;
    [arr[endIndex], arr[pivotIndex]] = [arr[pivotIndex], arr[endIndex]];
    return pivotIndex;
};

const recQuickSort = (arr, compareFn, startIndex = 0, endIndex = arr.length - 1) => {
    if (startIndex >= endIndex) return;

    const pivotIndex = partition(arr, compareFn, startIndex, endIndex);

    // Sorts first part of the array (excluding pivot itself)
    recQuickSort(arr, compareFn, startIndex, pivotIndex - 1);
    // Sorts second part of the array (excluding pivot itself)
    recQuickSort(arr, compareFn, pivotIndex + 1, endIndex);

    return arr;
};

const quickSort = (arr, compareFn) => {
    let steps = 0;
    const t0 = performance.now();

    recQuickSort(arr, compareFn);

    const t1 = performance.now();
    const time = (t1 - t0) / 1000;
    return [arr, steps, time];
};

export default quickSort;
