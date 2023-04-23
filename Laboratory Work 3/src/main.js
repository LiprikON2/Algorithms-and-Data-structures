import "../style.css";
import SortableList from "./sortableList";

const ss = new SortableList();

const check = SortableList.from([1, 2, 3]);

console.log("check", check);

ss.heapSort();
