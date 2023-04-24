import "../style.css";
import SortableList from "./sortableList";

const ss = SortableList.from([-10, 20, 1, 2, 0, 2, 2, 3]);
console.log(
    "ss",
    Array.from(ss).sort((a, b) => a - b)
);
ss.heapSort((a, b) => a - b);
console.log("ss", Array.from(ss));
