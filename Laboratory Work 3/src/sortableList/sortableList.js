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

    customSort(sortFn, compareFn, inplace = true) {
        if (!sortFn) return this.sort(compareFn);
        if (!compareFn) compareFn = defaultCompareFn;

        const [sorted, steps, time] = sortFn(this, compareFn);

        let result = this;
        if (!inplace) {
            result = SortableList.from(sorted);
        }

        // TODO: Slice or spread doesn't copy these the values
        result.sortSteps = steps;
        result.sortTime = time;

        return result;
    }
    bubbleSort(compareFn) {
        return this.customSort(bubbleSort, compareFn);
    }
    bucketSort(compareFn) {
        return this.customSort(bucketSort, compareFn, false);
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
        return this.customSort(mergeSort, compareFn, false);
    }
    quickSort(compareFn) {
        return this.customSort(quickSort, compareFn);
    }
}

export default SortableList;
