const halveArray = (array) => {
    // Integer division
    const midPoint = Math.trunc(array.length / 2);

    const firstHalf = array.slice(0, midPoint);
    const secondHalf = array.slice(midPoint);

    return [firstHalf, secondHalf];
};

const merge = (a, b, compareFn, stepsCounter) => {
    const arr = [];

    while (a.length && b.length) {
        const aFirst = a[0];
        const bFirst = b[0];
        if (compareFn(aFirst, bFirst) < 0) {
            // Remove a's first element and add it to the new array
            a.shift();
            arr.push(aFirst);
        } else {
            // Remove b's first element and add it to the new array
            b.shift();
            arr.push(bFirst);
        }
        stepsCounter.count++;
    }

    return [...arr, ...a, ...b];
};

const recMergeSort = (arr, compareFn, stepsCounter) => {
    if (arr.length < 2) return arr;

    const [leftHalf, rightHalf] = halveArray(arr);
    const leftSorted = recMergeSort(leftHalf, compareFn, stepsCounter);
    stepsCounter.count++;
    const rightSorted = recMergeSort(rightHalf, compareFn, stepsCounter);
    stepsCounter.count++;

    return merge(leftSorted, rightSorted, compareFn, stepsCounter);
};

const mergeSort = (arr, compareFn) => {
    let stepsCounter = { count: 0 };
    const t0 = performance.now();

    arr = recMergeSort(arr, compareFn, stepsCounter);

    const t1 = performance.now();
    const time = (t1 - t0) / 1000;
    return [arr, stepsCounter.count, time];
};

export default mergeSort;
