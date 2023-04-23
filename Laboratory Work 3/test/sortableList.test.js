import { assert, expect, describe, it } from "vitest";
import SortableList from "../src/sortableList/index.js";

const customSortTest = (sortingAlgorithmName) => {
    const unsortedList = [-10, 20, 1, 2, 0, 2, 2, 3];
    const sortableList = new SortableList(...unsortedList);
    const sortableList2 = SortableList.from(unsortedList);
    expect(sortableList).toStrictEqual(sortableList2);

    const sortedSortableList = sortableList[sortingAlgorithmName]();

    const sortedSortableReference = Array.from(sortableList);
    const sortedSortableCopy = Array.from(sortedSortableList);
    const sortedList = unsortedList.slice().sort();

    expect(sortedSortableReference.length).toBe(sortedList.length);
    expect(sortedSortableReference).toStrictEqual(sortedSortableCopy);
    expect(sortedSortableReference).toStrictEqual(sortedList);
    expect(sortedSortableReference).not.toStrictEqual(unsortedList);

    it("Accepts compareFn as an argument", () => {
        const descendingOrderFn = (a, b) => b - a;

        const sortedSortableList = sortableList[sortingAlgorithmName](descendingOrderFn);

        const sortedSortable = Array.from(sortedSortableList);
        const sortedList = unsortedList.slice().sort(descendingOrderFn);
        expect(sortedSortable).toStrictEqual(sortedList);
        expect(sortedSortable).not.toStrictEqual(unsortedList);
    });

    it("Has .sortSteps", () => {
        expect(sortableList.sortSteps).toBeTypeOf("number");
    });
    it("Has .sortTime", () => {
        expect(sortableList.sortTime).toBeTypeOf("number");
    });
};

describe("SortableList", () => {
    describe("Basics", () => {
        const list = [1, -2.01, "s123", {}];
        const sortableList = new SortableList(...list);

        it("Works as an Array", () => {
            expect(sortableList).toBeInstanceOf(Array);
            expect(sortableList).toBeInstanceOf(SortableList);
            expect(sortableList.slice()).toBeInstanceOf(Array);
            expect(sortableList.slice()).toBeInstanceOf(SortableList);

            expect(sortableList.length).toBe(list.length);
            expect(sortableList[0]).toBe(list[0]);
        });
        it("Has iterator like an Array", () => {
            const sortableListIterator = sortableList[Symbol.iterator]();
            const listIterator = list[Symbol.iterator]();
            expect(sortableListIterator.value).toBe(listIterator.value);
            expect(sortableListIterator.next().value).toBe(listIterator.next().value);
            expect(sortableListIterator.next().value).toBe(listIterator.next().value);
            expect(sortableListIterator.next().value).toBe(listIterator.next().value);
            expect(sortableListIterator.next().value).toBe(listIterator.next().value);
        });
    });
    describe("Sorting", () => {
        describe("Implementation of Array.sort() inplace", () => {
            const unsortedList = [-10, 20, 1, 2, 0, 2, 2, 3];
            const sortableList = new SortableList(...unsortedList);

            const sortedSortableList = sortableList.sort();

            const sortedSortableReference = Array.from(sortableList);
            const sortedSortableCopy = Array.from(sortedSortableList);
            const sortedList = unsortedList.slice().sort();

            expect(sortedSortableReference).toStrictEqual(sortedSortableCopy);
            expect(sortedSortableReference).toStrictEqual(sortedList);
            expect(sortedSortableReference).not.toStrictEqual(unsortedList);

            it("Has null .sortSteps", () => {
                expect(sortableList.sortSteps).toBeNull();
                expect(sortableList.slice().sortSteps).toBeNull();
            });
            it("Has null .sortTime", () => {
                expect(sortableList.sortTime).toBeNull();
                expect(sortableList.slice().sortTime).toBeNull();
            });
        });
    });
    describe("Custom sorting algorithms", () => {
        describe("Implementation of BubbleSort inplace", () => customSortTest("bubbleSort"));
        describe("Implementation of BucketSort", () => {
            const unsortedList = [-10, 20, 1, 2, 0, 2, 2, 3];
            const sortableList = new SortableList(...unsortedList);

            const sortedSortableList = sortableList.bucketSort();

            const sortedSortable = Array.from(sortedSortableList);
            const sortedList = unsortedList.slice().sort((a, b) => a - b);

            expect(sortedSortable).toStrictEqual(sortedList);
            expect(sortedSortable).not.toStrictEqual(unsortedList);

            it("Has .sortSteps", () => {
                expect(sortableList.sortSteps).toBeTypeOf("number");
            });
            it("Has .sortTime", () => {
                expect(sortableList.sortTime).toBeTypeOf("number");
            });
        });
        describe("Implementation of CombSort inplace", () => customSortTest("combSort"));
        // describe("Implementation of HeapSort inplace", () => customSortTest("heapSort"));
        describe("Implementation of InsertionSort inplace", () => customSortTest("insertionSort"));
        // describe("Implementation of MergeSort inplace", () => customSortTest("mergeSort"));
        describe("Implementation of QuickSort inplace", () => customSortTest("quickSort"));
    });
});
