const count = (arr, value) => {
    let steps = 0;
    let count = 0;

    for (let arrValue of arr) {
        if (arrValue === value) count++;
        steps++;
    }

    return [count, steps];
};

const array = ["yes", "no", "maybe", "no", "yes", "why", "nope", "yes"];

console.log("count.js:");
console.log("array", array);
const toCount = "yes";

const [yesCount, steps] = count(array, toCount);
console.log("count of", toCount, yesCount, `| O(count(${array.length})) =`, steps);

export default count;
