import _ from "lodash";

// https://stackoverflow.com/a/20871714
const permutations = (arr) => {
    let result = [];
    let steps = 0;

    const permute = (arr, permutation = []) => {
        if (arr.length === 0) {
            result.push(permutation);
        } else {
            for (let i = 0; i < arr.length; i++) {
                let curr = arr.slice();
                let next = curr.splice(i, 1);
                steps++;
                permute(curr.slice(), permutation.concat(next));
            }
        }
    };
    permute(arr);
    return [result, steps];
};

const array = ["dog", "ate", "cat", "what"];

console.log("\ncombinations.js:");
console.log("array", array);
const [permutationsOfArray, steps] = permutations(array);
console.log(
    "permutationsOfArray",
    permutationsOfArray,
    `| O(permutations(${array.length})) =`,
    steps
);

export default permutations;
