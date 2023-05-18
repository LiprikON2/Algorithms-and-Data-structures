# Task 5
> K33401 - Рейнгеверц В.А.

Задание на защиту Лабораторной работы 5

### Задание

Надо решить любые 2 задачи:

#### Задача 1

- Задан случайный массив целых чисел A. 
- Максимизируйте значение выражения $\left(A[a] - A[b] + A[c] - A[d]\right)$, где $a$, $b$, $c$, $d$ являются индексами массива, для которых верно выражение $a > b > c > d$.

#### Задача 2

- Задан случайный массив положительных целых чисел $А$. 
- Разбейте $А$ на два списка $А_1$ и $А_2$ таким образом, чтобы абсолютное значение разницы их сумм было минимальным.

#### Задача 3

- Задано $N$ коробок, имеющих разную длину, высоту и ширину.

- Коробки можно ставить друг на друга только в случае, если длина/ширина нижней больше или равна длине/ширине верхней. 
  - Найдите наибольшую возможную высоту, которую можно получить, складывая заданные коробки друг на друга. 
  - Поворачивать коробки нельзя.


### Решение

### Задача 1

[main.js](main.js#L5)


Последовательно, жадно выбираем максимальные/минимальные значения для $A[a]$, $A[b]$, $A[c]$, $A[d]$ из возможных значений для них

```js
const arrA = [...Array(10)].map(() => _.random(0, 10));
// const arrA = [10, 2, 4, 999999, 2];
console.log("arrA", arrA);

const oddlySpecificMaximize = (arr) => {
    // First N - 3 elements
    const possibleA = arr.slice(0, arr.length - 3);
    console.log("possibleA", possibleA);
    const a = Math.max(...possibleA);
    const aIndex = possibleA.indexOf(a);
    console.log("a =", a, "| index", aIndex, a === arr[aIndex]);

    const possibleB = arr.slice(aIndex + 1, arr.length - 2);
    console.log("possibleB", possibleB);
    const b = Math.min(...possibleB);
    const bIndex = aIndex + possibleB.indexOf(b) + 1;
    console.log("b =", b, "| index", bIndex, b === arr[bIndex]);

    const possibleC = arr.slice(bIndex + 1, arr.length - 1);
    console.log("possibleC", possibleC);
    const c = Math.max(...possibleC);
    const cIndex = bIndex + possibleC.indexOf(c) + 1;
    console.log("c =", c, "| index", cIndex, c === arr[cIndex]);

    const possibleD = arr.slice(cIndex + 1, arr.length);
    console.log("possibleD", possibleD);
    const d = Math.min(...possibleD);
    const dIndex = cIndex + possibleD.indexOf(d) + 1;
    console.log("d =", d, "| index", dIndex, d === arr[dIndex]);

    return [aIndex, bIndex, cIndex, dIndex];
};
const [a, b, c, d] = oddlySpecificMaximize(arrA);

console.log("[a, b, c, d]", [a, b, c, d]);
console.log("A[a] - A[b] + A[c] - A[d] =", arrA[a] - arrA[b] + arrA[c] - arrA[d]);
```

Результат

![](https://i.imgur.com/3MlpapU.png)

### Задача 2

[main.js](main.js#L45)

Сортируем по убыванию и жадно складываем числа по двум массивам так, чтобы их сумма уравнивалась

```js
const arrayA = [...Array(10)].map(() => _.random(0, 1000));

const sum = (arr) => arr.reduce((a, b) => a + b, 0);

const divideArrayBySum = (arr) => {
    const sortedArr = arr.sort((a, b) => b - a);
    console.log("sortedArr", sortedArr);

    const arrA = [];
    const arrB = [];

    for (let number of sortedArr) {
        if (sum(arrA) < sum(arrB)) {
            arrA.push(number);
        } else {
            arrB.push(number);
        }
    }

    return [arrA, arrB];
};

const [arrayA1, arrayA2] = divideArrayBySum(arrayA);

console.log("arrayA1 sum", sum(arrayA1), "arrayA2 sum", sum(arrayA2));
console.log("absolute difference", Math.abs(sum(arrayA1) - sum(arrayA2)));
```

Результат

![](https://i.imgur.com/3GJVKmC.png)
