import "./style.css";

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

console.log("array", array);

const reduceCounter = (number, steps = 0) => {
    if (number === 1) return steps;

    const isEven = number % 2 === 0;
    if (isEven) {
        const newNumber = Math.trunc(number / 2);
        return reduceCounter(newNumber, steps + 1);
    } else {
        const newNumber = Math.trunc(3 * number + 1);
        return reduceCounter(newNumber, steps + 1);
    }
};

console.log("them steps 1 ->", reduceCounter(1));
console.log("them steps 2 ->", reduceCounter(2));
console.log("them steps 3 ->", reduceCounter(3));
console.log("them steps 4 ->", reduceCounter(4));

const reduceCounterComparator = (a, b) => {
    const aSteps = reduceCounter(a);
    const bSteps = reduceCounter(b);

    return aSteps - bSteps;
};

const sortedArray = array.slice().sort(reduceCounterComparator);

console.log("sortedArray", sortedArray);

const insertionSort = (arr, compareFn) => {
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        let prevItemIndex = i - 1;

        while (prevItemIndex > -1 && compareFn(item, arr[prevItemIndex]) < 0) {
            arr[prevItemIndex + 1] = arr[prevItemIndex];
            prevItemIndex--;

            console.log(
                "Change item",
                arr[prevItemIndex + 1],
                "index:",
                prevItemIndex + 1,
                "->",
                prevItemIndex,
                "arr",
                arr
            );
        }
        arr[prevItemIndex + 1] = item;
        console.log("arr", arr);
    }

    return arr;
};

const insertionSortSorted = insertionSort(array.slice(), reduceCounterComparator);

console.log("insertionSortSorted", insertionSortSorted);
