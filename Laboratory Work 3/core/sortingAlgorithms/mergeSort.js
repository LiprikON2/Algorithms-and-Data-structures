const mergeSort = (arr, compareFn) => {
    let steps = 0;
    const t0 = performance.now();

    const t1 = performance.now();
    const time = (t1 - t0) / 1000;
    return [arr, steps, time];
};

export default mergeSort;
