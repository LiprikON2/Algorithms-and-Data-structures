import "../style.css";
import SortableList from "./sortableList";

const s = new SortableList(3, 2, 1, 2, -100, 10, 0, 100, 0);
console.log("s", s);
// const ss = s.slice().bubbleSort();
// const ss = s.slice().insertionSort();
const ss = s.slice().quickSort();
console.log("ss", ss);
