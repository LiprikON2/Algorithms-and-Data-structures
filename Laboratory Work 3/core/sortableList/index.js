import defaultCompareFn from "./defaultCompareFn";
import { bubbleSort } from "../sortingAlgorithms";

class SortableList extends Array {
    sortSteps = null;
    sortTime = null;

    bubbleSort(compareFn) {
        if (!compareFn) compareFn = defaultCompareFn;
        const [sorted, steps, time] = bubbleSort(this, compareFn);
        this.sortSteps = steps;
        this.sortTime = time;
        return sorted;
    }
}

// const s = new SortableList(3, 2, 1);
// console.log("s", s);
// const ss = s.slice().bubbleSort();
// console.log("s", s, "ss", ss);

export default SortableList;
