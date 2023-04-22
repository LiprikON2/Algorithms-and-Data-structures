const combSort = (arr, compareFn) => {
    let steps = 0;
    const t0 = performance.now();

    const shrinkFactor = 1.3;
    // Distance between two items
    let gap = arr.length;
    let sorted = false;

    while (!sorted) {
        gap = Math.floor(gap / shrinkFactor);
        if (gap <= 1) {
            sorted = true;
            gap = 1;
        }
        // When gap is 1, behaves like BubbleSort
        for (let cursor = 0; cursor < arr.length - gap; cursor++) {
            const smallItemIndex = gap + cursor;
            if (compareFn(arr[cursor], arr[smallItemIndex]) > 0) {
                [arr[cursor], arr[smallItemIndex]] = [arr[smallItemIndex], arr[cursor]];
                sorted = false;
            }
            steps++;
        }
    }

    const t1 = performance.now();
    const time = (t1 - t0) / 1000;
    return [arr, steps, time];
};

export default combSort;
