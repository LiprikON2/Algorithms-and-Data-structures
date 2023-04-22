import defaultCompareFn from "./defaultCompareFn";
import {
    bubbleSort,
    bucketSort,
    combSort,
    heapSort,
    insertionSort,
    mergeSort,
    quickSort,
} from "../sortingAlgorithms";

class SortableList extends Array {
    sortSteps = null;
    sortTime = null;

    customSort(sortFn, compareFn) {
        if (!sortFn) return this.sort(compareFn);
        if (!compareFn) compareFn = defaultCompareFn;

        const [sorted, steps, time] = sortFn(this, compareFn);
        this.sortSteps = steps;
        this.sortTime = time;
        return sorted;
    }

    bubbleSort(compareFn) {
        return this.customSort(bubbleSort, compareFn);
    }
    bucketSort(compareFn) {
        return this.customSort(bucketSort, compareFn);
    }
    combSort(compareFn) {
        return this.customSort(combSort, compareFn);
    }
    heapSort(compareFn) {
        return this.customSort(heapSort, compareFn);
    }
    insertionSort(compareFn) {
        return this.customSort(insertionSort, compareFn);
    }
    mergeSort(compareFn) {
        return this.customSort(mergeSort, compareFn);
    }
    quickSort(compareFn) {
        return this.customSort(quickSort, compareFn);
    }
}

const s = new SortableList(3, 2, 1);
console.log("s", s);
const ss = s.slice().bubbleSort();
console.log("s", s, "ss", ss);

export default SortableList;
