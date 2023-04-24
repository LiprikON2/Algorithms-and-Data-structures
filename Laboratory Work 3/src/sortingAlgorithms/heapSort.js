// https://en.wikipedia.org/wiki/Heap_(data_structure)#Implementation

/*
    Floyd's heap construction algorithm:
    - Iterates top-to-bottom and makes array items 
      respect max heap property by sifting them down
    - Starts from the middle point of the array
    - Has O(n) complexity
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

        if (largestChildIndex === rootIndex) break;
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
    // Sorting based on heap's delete-max operation
    for (let lastItem = arr.length - 1; lastItem > 0; lastItem--) {
        // Swaps root element with the last one
        [arr[0], arr[lastItem]] = [arr[lastItem], arr[0]];
        siftDown(arr, compareFn, stepsCounter, 0, lastItem - 1);
    }

    const t1 = performance.now();
    const time = (t1 - t0) / 1000;
    return [arr, stepsCounter.count, time];
};

export default heapSort;
