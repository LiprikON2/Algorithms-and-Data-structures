import defaultCompareFn from "./defaultCompareFn";
import { bubbleSort } from "../sortingAlgorithms";

// const sortableList = (list) => {
//     if (!list) list = [];
//     list.bubbleSort = function (compareFn) {
//         if (!compareFn) compareFn = defaultCompareFn;
//         const [sorted, steps] = bubbleSort(this, compareFn);
//         this.sortSteps = steps;
//         return sorted;
//     };

//     return list;
// };

// Problem:
// s.bubbleSort()          - works
// s.slice().bubbleSort()  - doesn't work
//
// To avoid this kind of problem, definition of custom type with object constructor is needed.
// https://stackoverflow.com/a/948379

// // Object constructor
// function SortableList(list) {
//     this.list = list ? list : [];
//     this.sortSteps = null;
//     this.bubbleSort = function (compareFn) {
//         if (!compareFn) compareFn = defaultCompareFn;
//         const [sorted, steps] = bubbleSort(this, compareFn);
//         this.sortSteps = steps;
//         return sorted;
//     };
//     // return this.list;
// }
// // Subclassing Array with object constructor
// // https://stackoverflow.com/a/21709458
// SortableList.prototype = Object.create(Array.prototype);

// const s = new SortableList([3, 2, 1]);
// console.log("s", s);
// console.log("sort?", s.slice().sort());
// console.log("s", s);

class SortableList extends Array {
    sortSteps = null;
    bubbleSort(compareFn) {
        if (!compareFn) compareFn = defaultCompareFn;
        const [sorted, steps] = bubbleSort(this, compareFn);
        this.sortSteps = steps;
        return sorted;
    }
}

const s = new SortableList(3, 2, 1);
console.log("s", s);
const ss = s.slice().bubbleSort();
console.log("s", s, "ss", ss);

export default SortableList;
