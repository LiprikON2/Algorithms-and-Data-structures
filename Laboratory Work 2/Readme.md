# Laboratory Work 2
> K33401 - Рейнгеверц В.А.


## Task 1
> Построить зависимость между количеством элементов и количеством шагов для
алгоритмов со сложностью $О(1)$, $O(\log n)$, $O(n^2)$, $O(2^n)$. 
>
> Сравнить сложность данных
алгоритмов.

### График

![](https://i.imgur.com/EA1sfAy.png)

### Выводы

По графику видно, что $O(\log n)$ сложнее (требует большее количество шагов при $N\to\infin$), чем $О(1)$; 

$O(n^2)$ еще сложнее; 

$O(2^n)$ еще сложнее

## Task 2
> Написать программу для пузырьковой сортировки. Оценить сложность данного
метода. 
> 
> Сравнить с методом sort().


В спецификации JavaScript нет гарантий на использование конкретного алгоритма сортировки методом `Array.sort()`

Выбор конечного алгоритма сортировки зависит от браузера, размера массива и типа данных в массиве.

Так, например для массивов с числами, скорее всего используется [**TimSort** в Chrome (начиная с V8)](https://stackoverflow.com/a/37245185)

![](https://i.imgur.com/lfCueGZ.png)

### Графики


#### Убывающий массив

![](https://i.imgur.com/sOu58HU.png)

![](https://i.imgur.com/OA5SKOH.png)


#### Перемешанный массив

![](https://i.imgur.com/Ka1PBlH.png)

![](https://i.imgur.com/Ig7INg4.png)

### Выводы

По графикам можно сделать вывод, что:

$\text{bubble(N)}\in O(2^N)$

$\text{bubble(N)}\in O(N^2)$ (наименьшая сложность из представленных для **BubbleSort**)

$\text{jsSort(N)}\in O(2^N)$

$\text{jsSort(N)}\in O(N^2)$ (наименьшая сложность из представленных для **`Array.sort()`**)

И, наконец:

$O(\text{bubble(N)}) > O(\text{jsSort(N)})$ (**`Array.sort()`** имеет меньшую сложность чем **BubbleSort**)


## Task 3

> Придумать и реализовать алгоритмы, имеющие сложность $O(3n)$, $O(n\log n)$, $O(n!)$, $O(n^3)$, $O(3\log n)$
>

По свойствам Big O, константы не влияют на конечную сложность. Тогда: 

$O(3n) = O(n)$

$O(3\log n) = O(\log n)$

Так как у них одинаковая скорость роста

### $O(n)$

Count item in 1d array

![](https://i.imgur.com/d1SXaxv.png)
### $O(n \log n)$

Merge Sort

![](https://i.imgur.com/RG9dIne.png)

### $O(n!)$

Permutations

![](https://i.imgur.com/7LrFok2.png)

- Строго говоря, здесь не $O(n!)$ (худший случай), a $\Omega(n!)$ (лучший случай), т.к. у n-массива всегда $n!$ перестановок

### $O(n^3)$

Count item in 3d array

![](https://i.imgur.com/5BtdD3G.png)

### $O(\log n)$

Binary search

![](https://i.imgur.com/bzoUiVm.png)