import { assert, expect, describe, it } from "vitest";
import SortableList from "../src/sortableList/index.js";

const customSortTest = (sortingAlgorithmName, options) => {
    const defaultOptions = {
        expectInplace: true,
        expectTimeAndStepValue: true,
        expectNonNumericSort: true,
        expectCompareFn: true,
    };
    const { expectInplace, expectTimeAndStepValue, expectNonNumericSort, expectCompareFn } = {
        ...defaultOptions,
        ...options,
    };

    const unsortedList = [-10, 20, 1, 2, 0, 2, 2, 3];
    const sortedList = unsortedList.slice().sort();

    const sortableReference = new SortableList(...unsortedList);
    const sortableSortReturn = sortableReference[sortingAlgorithmName]();
    const sortableCopy = sortableSortReturn.slice();

    if (expectNonNumericSort) {
        it("Does not change length", () => {
            expect(sortableReference.length).toBe(sortableSortReturn.length);
            expect(sortableReference.length).toBe(sortableCopy.length);
            expect(sortableReference.length).toBe(sortedList.length);
        });

        it("Sorts in lexicographical order by default", () => {
            expect(Array.from(sortableSortReturn)).toStrictEqual(sortedList);
            expect(Array.from(sortableCopy)).toStrictEqual(sortedList);
        });
    }

    if (expectInplace) {
        it("Sorts inplace", () => {
            expect(sortableReference).toBe(sortableSortReturn);
            expect(Array.from(sortableReference)).toStrictEqual(Array.from(sortableCopy));
        });
    }
    if (expectCompareFn) {
        it("Accepts compareFn as an argument", () => {
            const descendingOrderFn = (a, b) => b - a;

            const descendingSortable = sortableReference[sortingAlgorithmName](descendingOrderFn);
            const descendingList = unsortedList.slice().sort(descendingOrderFn);

            expect(Array.from(descendingSortable)).toStrictEqual(descendingList);
            expect(Array.from(descendingSortable)).not.toStrictEqual(sortedList);
            expect(Array.from(descendingSortable)).not.toStrictEqual(unsortedList);
        });
    } else {
        it("Sorts numerically", () => {
            const ascendingOrderFn = (a, b) => a - b;

            const ascendingSortable = sortableReference[sortingAlgorithmName]();
            const ascendingList = unsortedList.slice().sort(ascendingOrderFn);

            expect(Array.from(ascendingSortable)).toStrictEqual(ascendingList);
            expect(Array.from(ascendingSortable)).not.toStrictEqual(sortedList);
            expect(Array.from(ascendingSortable)).not.toStrictEqual(unsortedList);
        });
    }

    it(`Has .sortSteps (steps: ${sortableSortReturn.sortSteps})`, () => {
        if (expectTimeAndStepValue) {
            expect(sortableSortReturn.sortSteps).toBeTypeOf("number");
        } else {
            expect(sortableSortReturn.sortSteps).toBeNull();
        }
    });
    it("Has .sortTime", () => {
        if (expectTimeAndStepValue) {
            expect(sortableSortReturn.sortTime).toBeTypeOf("number");
        } else {
            expect(sortableSortReturn.sortTime).toBeNull();
        }
    });
};

describe("SortableList", () => {
    describe("Basics", () => {
        const list = [1, -2.01, "s123", {}];
        const sortable = new SortableList(...list);
        const sortable2 = SortableList.from(list);
        expect(sortable).toStrictEqual(sortable2);

        it("Is instance of an Array", () => {
            expect(sortable).toBeInstanceOf(Array);
            expect(sortable).toBeInstanceOf(SortableList);
            expect(sortable.slice()).toBeInstanceOf(Array);
            expect(sortable.slice()).toBeInstanceOf(SortableList);

            expect(sortable.length).toBe(list.length);
            expect(sortable[0]).toBe(list[0]);
        });
        it("Has iterator like an Array", () => {
            const sortableIterator = sortable[Symbol.iterator]();
            const listIterator = list[Symbol.iterator]();
            expect(sortableIterator.value).toBe(listIterator.value);
            expect(sortableIterator.next().value).toBe(listIterator.next().value);
            expect(sortableIterator.next().value).toBe(listIterator.next().value);
            expect(sortableIterator.next().value).toBe(listIterator.next().value);
            expect(sortableIterator.next().value).toBe(listIterator.next().value);
        });
    });
    describe("Sorting algorithms", () => {
        describe("Implementation of Array.sort inplace", () =>
            customSortTest("sort", {
                expectTimeAndStepValue: false,
            }));
        describe("Implementation of BubbleSort inplace", () => customSortTest("bubbleSort"));
        describe("Implementation of BucketSort", () =>
            customSortTest("bucketSort", {
                expectInplace: false,
                expectNonNumericSort: false,
                expectCompareFn: false,
            }));
        describe("Implementation of CombSort inplace", () => customSortTest("combSort"));
        describe("Implementation of HeapSort inplace", () => customSortTest("heapSort"));
        describe("Implementation of InsertionSort inplace", () => customSortTest("insertionSort"));
        describe("Implementation of MergeSort", () =>
            customSortTest("mergeSort", {
                expectInplace: false,
            }));
        describe("Implementation of QuickSort inplace", () => customSortTest("quickSort"));
    });
});
