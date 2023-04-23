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
    const isChildIndexEven = childIndex % 2 === 0;

    const parentIndex = (childIndex - isChildIndexEven - 1) / 2;
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

    recSiftItem(arr, nextItemIndex);
};

/* Sifts item until heap property is preserved */
const recSiftItem = (arr, itemIndex) => {
    const item = arr[itemIndex];
    const [parentIndex, parent] = getItemParent(arr, itemIndex);
    const isMaxHeapPropertyPreserved = parent === null || parent >= item;

    if (!isMaxHeapPropertyPreserved) {
        [arr[itemIndex], arr[parentIndex]] = [arr[parentIndex], arr[itemIndex]];
        recSiftItem(arr, parentIndex);
    }
};

const heapSort = (arr, compareFn) => {
    let stepsCounter = { count: 0 };
    const t0 = performance.now();

    const ss = [100, 19, 36, 17, 12, 25, 5, 9, 15, 6, 11, 13, 8];

    // console.log("ss", ss);
    // insertItem(ss, 1000);
    // insertItem(ss, 101);

    // console.log("ss", ss, getItemParent(ss, ss.length - 1));
    // console.log("ss", ss, getItemParent(ss, 6));

    // const [[leftChildIndex, leftChild], [rightChildIndex, rightChild]] = getItemChildren(ss, 1);
    // console.log(leftChildIndex, leftChild, rightChildIndex, rightChild);

    // const [parentIndex, parent] = getItemParent(ss, 0);
    // console.log(parentIndex, parent);

    const t1 = performance.now();
    const time = (t1 - t0) / 1000;
    return [arr, stepsCounter.count, time];
};

export default heapSort;
