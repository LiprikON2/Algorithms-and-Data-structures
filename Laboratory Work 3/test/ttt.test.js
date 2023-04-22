import { assert, expect, describe, it } from "vitest";
import SortableList from "../src/sortableList/index.js";

it();
console.log("\n\n\n");
// const unsortedList = [-10, 21, 1, 2, 0, 2, 2, 3];
const unsortedList = [-3, 3, 3, 1];
const sortableList = new SortableList(...unsortedList);
const sorted = sortableList.bucketSort();

console.log("sortableList", sortableList);
console.log("sorted", sorted);
