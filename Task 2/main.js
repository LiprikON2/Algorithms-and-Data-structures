import cytoscape from "cytoscape";
import spread from "cytoscape-spread";

import "./style.css";

spread(cytoscape);

const getNCities = (n) => {
    const nCities = [...Array(n + 1).keys()];
    // Remove 0th element
    nCities.shift();
    return nCities;
};

// Euclidean algorithm implementation to find "Greatest common divisor"
const getCommonDenominator = (a, b) => {
    return b ? getCommonDenominator(b, a % b) : a;
};

const logN = (n, number) => {
    return (Math.log(number) / Math.log(n)).toFixed(10);
};

const isPowerOfN = (number, n = 3) => {
    return logN(n, number) % 1 === 0;
};

const getGraphData = (numberOfCities, minCommonDenominatorForEdge) => {
    const mCities = getNCities(numberOfCities);

    const nodes = [];
    const edges = [];

    for (let cityId of mCities) {
        const newNodeId = cityId;
        const newNode = {
            data: {
                id: newNodeId,
                label: "city" + cityId,
            },
        };
        nodes.push(newNode);

        if (!isPowerOfN(newNodeId, 3)) {
            nodes.forEach((node) => {
                const nodeId = node.data.id;
                if (nodeId !== newNodeId && !isPowerOfN(nodeId, 3)) {
                    const commonDenominator = getCommonDenominator(nodeId, newNodeId);

                    if (commonDenominator > minCommonDenominatorForEdge) {
                        const edge = {
                            data: {
                                id: nodeId + " - " + newNodeId,
                                label: node.data.label + " - " + newNode.data.label,
                                source: newNodeId,
                                target: nodeId,
                            },
                        };

                        edges.push(edge);
                    }
                }
            });
        }
    }

    return [nodes, edges];
};

const getConnectedEdges = (nodeId, edges) => {
    return edges.filter((edge) => edge.data.source === nodeId || edge.data.target === nodeId);
};

const findPathsBetween = (aNodeId, bNodeId, edges, visited = []) => {
    const connectedEdges = getConnectedEdges(aNodeId, edges);
    let paths = [];
    for (let edge of connectedEdges) {
        const isBNodeReached =
            (edge.data.source === aNodeId && edge.data.target === bNodeId) ||
            (edge.data.source === bNodeId && edge.data.target === aNodeId);
        const isVisited = visited.includes(edge.data.source) || visited.includes(edge.data.target);

        if (isBNodeReached) {
            paths.push([edge]);
            continue;
        }
        if (isVisited) continue;

        const outgoingNodeId = edge.data.source !== aNodeId ? edge.data.source : edge.data.target;
        const childPaths = findPathsBetween(outgoingNodeId, bNodeId, edges, [aNodeId, ...visited]);
        // Add current edge to the child paths
        const somePaths = childPaths.map((childPath) => [edge, ...childPath]);

        paths = [...paths, ...somePaths];
    }
    // Remove empty paths
    paths.filter((path) => path.length);

    return paths;
};

const getLongestArray = (arrays) => {
    return arrays.reduce(
        (accumulator, array) => (accumulator.length <= array.length ? array : accumulator),
        { length: 0 }
    );
};

const findLongestPath = (nodes, edges) => {
    let longestPath = [];

    for (let node of nodes) {
        for (let targetNode of nodes) {
            if (node !== targetNode) {
                const allPaths = findPathsBetween(node.data.id, targetNode.data.id, edges);
                const path = getLongestArray(allPaths);
                if (path.length > longestPath.length) {
                    longestPath = path;
                }
            }
        }
    }

    return longestPath;
};

const n = 100;
const m = 17;
let [nodes, edges] = getGraphData(n, m);

const longestPath = findLongestPath(nodes, edges);

console.log("nodes", edges);
console.log("edges", edges);
console.log("longestPath", longestPath);

const markPath = (path, edges) => {
    return edges.map((edge) => {
        const isEdgeInPath = path.some((pathEdge) => pathEdge === edge);
        if (isEdgeInPath) {
            return { data: { ...edge.data, marked: true } };
        }
        return edge;
    });
};

edges = markPath(longestPath, edges);

const cy = cytoscape({
    container: document.getElementById("cy"),
    minZoom: 0.9,
    maxZoom: 5,
    style: [
        {
            selector: "node",
            style: {
                "background-color": "#c9732c",

                label: "data(label)",
                color: "white",
                "font-size": "0.6em",
                "text-outline-width": "1.5px",
                "text-outline-color": "black",
            },
        },
        {
            selector: "edge",
            style: {
                width: 3,
                "line-color": "#f2ab1b",
                "target-arrow-color": "#f2ab1b",
                "curve-style": "bezier",
                content: "data(label)",
                color: "#cccccc",
                "font-size": "0.75em",
                "text-outline-width": "1px",
                "text-outline-color": "black",
            },
        },
        {
            selector: "edge[?marked]",
            style: {
                "line-color": "#e8eacd",
                width: 5,
            },
        },
    ],
    elements: {
        nodes,
        edges,
    },
});

const layout = cy.makeLayout({ name: "spread", prelayout: false, padding: 20 });
layout.run();

document.getElementById("data").innerText = `\
N (number of cities) = ${n}
M (min common denominator) = ${m}
`;

document.getElementById("output").innerText = `\
Nodes: ${nodes.length}
Edges: ${edges.length}
Longest Path: ${longestPath.length} edges
`;
