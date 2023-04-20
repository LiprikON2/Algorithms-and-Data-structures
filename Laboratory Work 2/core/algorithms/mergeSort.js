const halveArray = (array) => {
    // Integer division
    const midPoint = Math.trunc(array.length / 2);

    const firstHalf = array.slice(0, midPoint);
    const secondHalf = array.slice(midPoint);

    return [firstHalf, secondHalf];
};

const mergeSort = (arr, steps = 1) => {
    console.log("arr", arr.length);
    if (arr.length < 2) return [arr, steps];
    if (arr.length == 2) {
        console.log("2!");
        const leftItem = arr[0];
        const rightItem = arr[1];

        if (leftItem > rightItem) {
            arr[0] = rightItem;
            arr[1] = leftItem;
        }
        return [arr, steps];
    }
    const [a, b] = halveArray(arr);
    const [aSorted, aSteps] = mergeSort(a, steps);
    const [bSorted, bSteps] = mergeSort(b, aSteps);
    const result = [...aSorted, ...bSorted].flat();

    return [result, bSteps];
};

const mm = (arr) => {
    let prevSorted = arr;
    let prevSteps = 1;
    let sorted;
    let steps;
    do {
        const ss = mergeSort(prevSorted.slice(), prevSteps);
        sorted = ss[0];
        steps = ss[1];

        prevSorted = sorted;
        prevSteps = steps;
        console.log("prevSorted !== sorted", prevSorted, sorted);
    } while (prevSorted !== sorted);

    return [sorted, steps];
};

// const array = ["yes", "no", "maybe", "no", "yes", "why", "nope", "yes", "hmm"];
const array = [4, 1, 2, 3];

console.log("mergeSort.js:");
console.log("array", array);

const [sortedArray, steps] = mm(array.slice());
console.log("sortedArray", sortedArray, `| O(count(${array.length})) =`, steps);

export default mergeSort;
