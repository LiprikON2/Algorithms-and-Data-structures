import "./style.css";

import cytoscape from "cytoscape";

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

const [nodes, edges] = getGraphData(10, 1);

console.log("nodes", nodes);
console.log("edges", edges);

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
                // "target-arrow-shape": "triangle",
                "curve-style": "bezier",
                content: "data(label)",
                color: "#cccccc",
                "font-size": "0.75em",
                "text-outline-width": "1px",
                "text-outline-color": "black",
            },
        },
    ],
    elements: {
        nodes,
        edges,
    },
    layout: {
        name: "breadthfirst",
        directed: true,
        padding: 10,
        color: "#ffff00",
        fit: true,
    },
});
