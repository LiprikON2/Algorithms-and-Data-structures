const insertionSort = (arr, compareFn) => {
    let steps = 0;
    const t0 = performance.now();

    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        let prevItemIndex = i - 1;

        while (prevItemIndex > -1 && compareFn(item, arr[prevItemIndex]) < 0) {
            arr[prevItemIndex + 1] = arr[prevItemIndex];
            prevItemIndex--;
            steps++;
        }
        arr[prevItemIndex + 1] = item;
    }

    const t1 = performance.now();
    const time = (t1 - t0) / 1000;
    return [arr, steps, time];
};

export default insertionSort;
