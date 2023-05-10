export const isPrime = (n) => {
    if (n === 2 || n === 3) return true;
    if (n <= 1 || n % 2 == 0 || n % 3 == 0) return false;

    for (let i = 5; i * i <= n; i += 6) {
        if (n % i == 0 || n % (i + 2) == 0) return false;
    }

    return true;
};

export const getPrimeArray = (n, array = [2]) => {
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
