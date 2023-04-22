import insertionSort from "./insertionSort";

const _bucketSort = (arr, compareFn, stepsCounter, k = 5) => {
    // Init list of empty buckets
    const buckets = Array(k)
        .fill()
        .map(() => []);
    stepsCounter.count += k;

    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const bucketSize = Math.round((max - min) / k);

    // Add range properties to all buckets
    let bucketStart = min;
    let bucketEnd = min + bucketSize;
    for (let [bucketIndex, bucket] of buckets.entries()) {
        // Account for last bucket's end
        if (bucketIndex === k - 1) bucketEnd = max;
        bucket.bucketStart = bucketStart;
        bucket.bucketEnd = bucketEnd;

        bucketStart += bucketSize;
        bucketEnd += bucketSize;
        stepsCounter.count++;
    }

    // Assign buckets to the elements
    arr.forEach((item) => {
        for (let bucket of buckets) {
            stepsCounter.count++;

            if (isNaN(item)) throw new Error("All list items must have numerical value.");
            if (item >= bucket.bucketStart && item <= bucket.bucketEnd) {
                bucket.push(item);
                return;
            }
        }
    });

    buckets.forEach((bucket) => {
        const [_arr, steps, _time] = insertionSort(bucket, (a, b) => a - b);
        stepsCounter.count += steps;
    });

    return buckets.flat();
};

/* 
    Note: 
    - Supports only lists of numerical values
    - Does not sort inplace
*/
const bucketSort = (arr, compareFn) => {
    let stepsCounter = { count: 0 };
    const t0 = performance.now();

    const sortedArr = _bucketSort(arr, compareFn, stepsCounter);

    const t1 = performance.now();
    const time = (t1 - t0) / 1000;
    return [sortedArr, stepsCounter.count, time];
};

export default bucketSort;
