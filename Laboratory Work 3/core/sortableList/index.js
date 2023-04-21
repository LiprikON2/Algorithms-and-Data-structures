import defaultCompareFn from "./defaultCompareFn";
import { bubbleSort } from "../sortingAlgorithms";

const sortableList = (list) => {
    if (!list) list = [];
    list.bubbleSort = function (compareFn) {
        if (!compareFn) compareFn = defaultCompareFn;
        const [sorted, steps] = bubbleSort(this, compareFn);
        this.sortSteps = steps;
        return sorted;
    };

    return list;
};

// Problem:
// s.bubbleSort()          - works
// s.slice().bubbleSort()  - doesn't work
//
// To avoid this kind of problem, need to use my own type of object constructor.
// https://stackoverflow.com/a/948379

export default sortableList;
