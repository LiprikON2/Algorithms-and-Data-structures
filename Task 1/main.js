const n = 10;
const m = 10;

// https://en.wikipedia.org/wiki/Primality_test
const isPrime = (n) => {
    if (n === 2 || n === 3) return true;
    if (n <= 1 || n % 2 == 0 || n % 3 == 0) return false;

    for (let i = 5; i * i <= n; i += 6) {
        if (n % i == 0 || n % (i + 2) == 0) return false;
    }

    return true;
};

const getPrimeArray = (n, array = [2]) => {
    let increment = 1;
    while (array.length < n) {
        const prevValue = array[array.length - 1];
        const currValue = prevValue + increment;

        if (isPrime(currValue)) {
            increment = 1;
            array.push(currValue);
        } else increment++;
    }

    return array;
};

const nArray = getPrimeArray(n);
console.log("nArray of", n, "prime numbers:", nArray);

const getFibonachiArray = (n, array = [1, 1]) => {
    if (n === 1) return [1];
    if (n === 2) return array;
    if (n === array.length) return array;

    let prevValue = array[array.length - 1];
    let prevPrevValue = array[array.length - 2];

    const currValue = prevValue + prevPrevValue;
    array.push(currValue);

    return getFibonachiArray(n, array);
};

mArray = getFibonachiArray(m);
console.log("mArray of", m, "Fibonachi numbers", mArray);

const getIntersection = (array1, array2) => {
    const filteredArray = array1.filter((number) => array2.includes(number));

    return filteredArray;
};

const result = getIntersection(mArray, nArray);

console.log("result", result);
