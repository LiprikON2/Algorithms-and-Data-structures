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
        buckets.forEach((bucket) => {
            stepsCounter.count++;

            if (item >= bucket.bucketStart && item <= bucket.bucketEnd) {
                bucket.push(item);
                return;
            }
        });
    });

    buckets.forEach((bucket) => {
        const [_arr, steps, _time] = insertionSort(bucket, (a, b) => a - b);
        stepsCounter.count += steps;
    });

    return buckets.flat();
};

/* Note: supports only lists of numerical values */
const bucketSort = (arr, compareFn) => {
    let stepsCounter = { count: 0 };
    const t0 = performance.now();

    const sortedArr = _bucketSort(arr, compareFn, stepsCounter);
    console.log("WRF", arr);
    const t1 = performance.now();
    const time = (t1 - t0) / 1000;
    return [sortedArr, stepsCounter.count, time];
};

export default bucketSort;
