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

// /*
//     Min heap:
//     - Parent is always smaller than children
// */
// const insertItem = (arr, item) => {
//     arr.push(item);
//     const nextItemIndex = arr.length - 1;

//     recSiftUp(arr, nextItemIndex);
// };

// /* Sifts item up, until heap property is preserved */
// const recSiftUp = (arr, itemIndex) => {
//     const item = arr[itemIndex];
//     const [parentIndex, parent] = getItemParent(arr, itemIndex);
//     const isMaxHeapPropertyPreserved = parent === null || parent >= item;

//     if (!isMaxHeapPropertyPreserved) {
//         [arr[itemIndex], arr[parentIndex]] = [arr[parentIndex], arr[itemIndex]];
//         recSiftUp(arr, parentIndex);
//     }
// };

/* Checks if every item respects max heap property */
const isHeapified = (arr) => {
    return arr.every((item, itemIndex) => {
        const [itemParentIndex, itemParent] = getItemParent(arr, itemIndex);
        const isMaxHeapPropertyPreserved = itemParent === null || itemParent >= item;
        return isMaxHeapPropertyPreserved;
    });
};

/*
    Floyd's heap construction algorithm:
    - Iterates top-to-bottom and makes array items 
      respect max heap property by sifting down
    - Starts from middle point of the array
    - O(n) complexity
*/
const heapify = (arr, compareFn, stepsCounter) => {
    const arrayMidPoint = Math.floor(arr.length / 2) - 1;

    for (let start = arrayMidPoint; start >= 0; start--) {
        siftDown(arr, compareFn, stepsCounter, start, arr.length - 1);
    }
};

const getLeftChildIndex = (parentIndex) => {
    const leftChildIndex = 2 * parentIndex + 1;
    return leftChildIndex;
};

/* Sift top item down, choosing the largest child every time */
const siftDown = (arr, compareFn, stepsCounter, arrayStart, arrayEnd) => {
    let rootIndex = arrayStart;
    let leftChildIndex, largestChildIndex;

    while (getLeftChildIndex(rootIndex) <= arrayEnd) {
        stepsCounter.count++;
        largestChildIndex = rootIndex;

        leftChildIndex = getLeftChildIndex(rootIndex);
        const rightChildIndex = leftChildIndex + 1;

        if (compareFn(arr[largestChildIndex], arr[leftChildIndex]) < 0) {
            largestChildIndex = leftChildIndex;
        }

        if (
            rightChildIndex <= arrayEnd &&
            compareFn(arr[largestChildIndex], arr[rightChildIndex]) < 0
        ) {
            largestChildIndex = rightChildIndex;
        }

        if (largestChildIndex === rootIndex) return;
        else {
            // Swaps current root with the largest child
            [arr[rootIndex], arr[largestChildIndex]] = [arr[largestChildIndex], arr[rootIndex]];
            rootIndex = largestChildIndex;
        }
    }
};

const heapSort = (arr, compareFn) => {
    let stepsCounter = { count: 0 };
    const t0 = performance.now();

    heapify(arr, compareFn, stepsCounter);
    for (let end = arr.length - 1; end > 0; end--) {
        // Swaps first element with the last one
        [arr[0], arr[end]] = [arr[end], arr[0]];
        siftDown(arr, compareFn, stepsCounter, 0, end - 1);
    }

    const t1 = performance.now();
    const time = (t1 - t0) / 1000;
    return [arr, stepsCounter.count, time];
};

export default heapSort;
