import { assert, expect, describe, it } from "vitest";
import SortableList from "../src/sortableList/index.js";

const customSortTest = (list, listCopy, sortedSortableList) => {
    const sortedSortableItems = Array.from(sortedSortableList);
    const sortedListItems = list.sort();
    expect(sortedSortableItems).toStrictEqual(sortedListItems);
    expect(sortedSortableItems).toStrictEqual(list);
    expect(sortedSortableItems).not.toStrictEqual(listCopy);

    it("Records steps", () => {
        expect(sortedSortableList.sortSteps).toBeTypeOf("number");
        expect(sortedSortableList.slice().sortSteps).toBeTypeOf("number");
    });
    it("Records time", () => {
        expect(sortedSortableList.sortTime).toBeTypeOf("number");
        expect(sortedSortableList.slice().sortTime).toBeTypeOf("number");
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
            expect(sortableListIterator.next().value).toBe(listIterator.next().value);
        });

        it("Has step field", () => {
            expect(sortableList.sortSteps).toBeNull();
            expect(sortableList.slice().sortSteps).toBeNull();
        });
        it("Has time field", () => {
            expect(sortableList.sortTime).toBeNull();
            expect(sortableList.slice().sortTime).toBeNull();
        });
    });
    describe("Sorting", () => {
        const list = [-10, 20, 1, 2, 0, 2, 2, 3];
        const listCopy = list.slice();
        const sortableList = new SortableList(...list);

        it("Implements Array.sort inplace", () => {
            const sortedSortableItems = Array.from(sortableList.sort());
            const sortedListItems = list.sort();
            expect(sortedSortableItems).toStrictEqual(sortedListItems);
            expect(sortedSortableItems).toStrictEqual(list);
            expect(sortedSortableItems).not.toStrictEqual(listCopy);
        });

        describe("Custom sorting", () => {
            it("Implements BubbleSort inplace", () =>
                customSortTest(list, listCopy, sortableList.bubbleSort()));
            it("Implements BucketSort inplace", () =>
                customSortTest(list, listCopy, sortableList.bucketSort()));
            it("Implements CombSort inplace", () =>
                customSortTest(list, listCopy, sortableList.combSort()));
        });
    });
});
