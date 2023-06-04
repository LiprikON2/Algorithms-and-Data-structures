matMulByOrder([wikiA, wikiB, wikiC, wikiD], [0, 0, 0]);
matMulByOrder([wikiA, wikiB, wikiC, wikiD], [0, 1, 0]);
matMulByOrder([wikiA, wikiB, wikiC, wikiD], [1, 0, 0]);
matMulByOrder([wikiA, wikiB, wikiC, wikiD], [1, 1, 0]);
matMulByOrder([wikiA, wikiB, wikiC, wikiD], [2, 0, 0]);
matMulByOrder([wikiA, wikiB, wikiC, wikiD], [2, 1, 0]);

wikiA * wikiB * wikiC * wikiD


0-2 ((wikiA * wikiB) * wikiC) * wikiD 
0-1 (AB * wikiC) * wikiD
0-0 ABC * wikiD


0-2 (wikiA * (wikiB * wikiC)) * wikiD
0-1 (wikiA * BC) * wikiD
0-0 ABC * wikiD


0-2 wikiA * ((wikiB * wikiC) * wikiD)
0-1 wikiA * (BC * wikiD)
0-0 wikiA * BCD


0-2 wikiA * (wikiB * (wikiC * wikiD))
0-1 wikiA * (wikiB * CD)
0-0 wikiA * BCD


0-2 (wikiA * wikiB) * (wikiC * wikiD)
0-1 AB * (wikiC * wikiD)
0-0 AB * CD

0-2 (wikiA * wikiB) * (wikiC * wikiD)
0-1 (wikiA * wikiB) * CD
0-0 AB * CD




[[0, 1, 2], [0, 1], [0]] []

// rec 1
[[0, 1], [0]] [0]
[[0]]         [0, 0]
[[0]]         [0, 1]

// rec 2
[[0, 1], [0]] [1]
[[0]]         [1, 0]
[[0]]         [1, 1]

// rec 3
[[0, 1], [0]] [2]
[[0]]         [2, 0]
[[0]]         [2, 1]
