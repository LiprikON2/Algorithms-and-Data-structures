import "../style.css";
import SortableList from "./sortableList";

const s = new SortableList(3, 2, 1);
console.log("s", s);
const ss = s.slice().bubbleSort();
console.log("ss", ss);
