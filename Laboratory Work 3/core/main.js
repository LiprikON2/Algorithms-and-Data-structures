import "../style.css";
import SortableList from "./sortableList";

const s = new SortableList(3, 2, 1, 2);
console.log("s", s);
// const ss = s.slice().bubbleSort();
const ss = s.slice().insertionSort();
console.log("ss", ss);
