// Избавиться от коллизии в любой хэш функции (из презы)

// const arr = Array.from(Array(217).keys()).map((n) => "string" + n);
// [string0, string1, string2...]
const arr = [11, 122, 123, 154, 15, 217, 333, 444, 555, 666, 777];

const hashDivision = (arr) => {
    const hashArr = arr.map((item) => item % arr.length);
    return hashArr;
};

const hashArr = hashDivision(arr);
console.log("hashArr", hashArr);

const hashDivisionChains = (arr) => {
    const hashObj = {};

    arr.forEach((item, index) => {
        const hash = (item % arr.length).toString();
        if (!(hash in hashObj)) {
            hashObj[hash] = [index];
        } else {
            hashObj[hash].push(index);
        }
    });

    return hashObj;
};

const hashObj = hashDivisionChains(arr);
console.log("hashObj", hashObj);
