import "../style.css";
import sortableList from "./sortableList";
const s = sortableList([3, 2, 1]);

console.log("s", s);
const sorted = s.bubbleSort();
console.log("s", sorted, s.sortSteps);
