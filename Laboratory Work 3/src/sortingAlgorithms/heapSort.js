// https://en.wikipedia.org/wiki/Heap_(data_structure)#Implementation
const getItemChildren = (arr, parentIndex) => {
    const leftChildIndex = 2 * parentIndex + 1;
    const rightChildIndex = 2 * parentIndex + 2;

    const leftChild = arr[leftChildIndex] ?? null;
    const rightChild = arr[rightChildIndex] ?? null;

    return [
        [leftChildIndex, leftChild],
        [rightChildIndex, rightChild],
    ];
};

const getItemParent = (arr, childIndex) => {
    const parentIndex = Math.ceil((childIndex - 2) / 2);
    const parent = arr[parentIndex] ?? null;

    return [parentIndex, parent];
};

/* 
    Min heap:
    - Parent is always smaller than children
*/
const insertItem = (arr, item) => {
    arr.push(item);
    const nextItemIndex = arr.length - 1;

    recSiftUp(arr, nextItemIndex);
};

/* Sifts item up, until heap property is preserved */
const recSiftUp = (arr, itemIndex) => {
    const item = arr[itemIndex];
    const [parentIndex, parent] = getItemParent(arr, itemIndex);
    const isMaxHeapPropertyPreserved = parent === null || parent >= item;

    if (!isMaxHeapPropertyPreserved) {
        [arr[itemIndex], arr[parentIndex]] = [arr[parentIndex], arr[itemIndex]];
        recSiftUp(arr, parentIndex);
    }
};

/* Checks if every item respects max heap property */
const isHeapified = (arr) => {
    return arr.every((item, itemIndex) => {
        const [itemParentIndex, itemParent] = getItemParent(arr, itemIndex);
        const isMaxHeapPropertyPreserved = itemParent === null || itemParent >= item;
        return isMaxHeapPropertyPreserved;
    });
};

/* Iterate top-to-bottom and make array items respect max heap property */
const heapify = (arr) => {
    for (let midItemIndex = Math.floor(arr.length / 2) - 1; midItemIndex >= 0; midItemIndex--) {
        siftDown(arr, midItemIndex, arr.length - 1);
    }
};

/* Sift top item down, choosing the largest child tree everytime */
const siftDown = (arr, start, end) => {
    let rootIndex = start;
    let leftChildIndex = 2 * rootIndex + 1;
    let largestChildIndex;

    while (leftChildIndex <= end) {
        leftChildIndex = 2 * rootIndex + 1;
        largestChildIndex = rootIndex;

        if (arr[largestChildIndex] < arr[leftChildIndex]) {
            largestChildIndex = leftChildIndex;
        }

        const rightChildIndex = leftChildIndex + 1;
        if (rightChildIndex <= end && arr[largestChildIndex] < arr[rightChildIndex]) {
            largestChildIndex = rightChildIndex;
        }

        if (largestChildIndex === rootIndex) return;
        else {
            [arr[rootIndex], arr[largestChildIndex]] = [arr[largestChildIndex], arr[rootIndex]];
            rootIndex = largestChildIndex;
        }
    }
};

const heapSort = (arr, compareFn) => {
    let stepsCounter = { count: 0 };
    const t0 = performance.now();

    const ss = [100, 36, 190, 17, 12, 25, 5, 9, 15, 6, 11, 13, 8, 1, 4];

    console.log("ss", ss, isHeapified(ss));
    heapify(ss);
    console.log("ss", ss, isHeapified(ss));

    // heapify(ss);
    const t1 = performance.now();
    const time = (t1 - t0) / 1000;
    return [arr, stepsCounter.count, time];
};

export default heapSort;
