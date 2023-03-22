export const positiveAnswers = ["yes", "ye", "y", "yep", "yeah", "true", "д", "да", "ага"];

export const createPredicate = (label, answers = []) => {
    const predicateObj = {
        label,
        answers,
        fn: function (input) {
            const noPunctRegex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
            const cleanedInput = input.toLowerCase().replace(noPunctRegex, "");

            return this.answers.some((answer) => answer === cleanedInput);
        },
    };

    return predicateObj;
};

export const createYesPredicate = (label) => createPredicate(label, positiveAnswers);

export const createNode = (predicate = null, left = null, right = null, value = null) => {
    if (!predicate && !value) {
        throw new Error("Either value or predicate must be provided");
    }
    if (predicate && (!left || !right)) {
        throw new Error("Along with predicate, left and right nodes must be provided");
    }

    return {
        left,
        right,
        predicate,
        value,
        prompt: function () {
            if (this.value) {
                alert(`That character is ${this.value}`);

                const img = document.createElement("img");
                img.src = `characters/${this.value}.png`;

                document.body.appendChild(img);
                return;
            }
            const input = prompt(this.predicate.label);

            this.predicate.fn(input) ? this.left.prompt() : this.right.prompt();
        },
    };
};

export const createEndNode = (value) => createNode(null, null, null, value);

export const tree = createNode(
    createYesPredicate("Does your character usually wear lipstic?"),
    createNode(
        createYesPredicate("Does your character have even bangs?"),
        createEndNode("Mia"),
        createNode(
            createYesPredicate("Does your character have blue eyes?"),
            createEndNode("Raquel"),
            createEndNode("Trudi")
        )
    ),
    createNode(
        createYesPredicate("Does your character have a big beard?"),
        createNode(
            createYesPredicate("Is your character ginger?"),
            createEndNode("Lance"),
            createEndNode("Maynard")
        ),
        createNode(
            createYesPredicate("Does your character have black skin?"),
            createEndNode("Jules"),
            createNode(
                createYesPredicate("Is your character bald?"),
                createEndNode("Butch"),
                createNode(
                    createYesPredicate("Does your character have mustache?"),
                    createEndNode("Winston"),
                    createNode(
                        createYesPredicate("Did your character pierce his ear?"),
                        createEndNode("Vincent"),
                        createNode(
                            createYesPredicate("Does your character have green eyes?"),
                            createEndNode("Ringo"),
                            createNode(
                                createYesPredicate("Is your character blonde?"),
                                createEndNode("Zed"),
                                createEndNode("Brett")
                            )
                        )
                    )
                )
            )
        )
    )
);

export const convertToGraphData = (tree, nodes = [], edges = [], path = "Root", srcEdge = null) => {
    const nodeId = path + "Node";
    if (srcEdge) {
        srcEdge.data.target = nodeId;
        edges.push(srcEdge);
    }

    if (tree.predicate) {
        const nodeLabel = tree.predicate.label;
        nodes.push({ data: { id: nodeId, label: nodeLabel } });
        const leftEdgeId = path + "LeftEdge";
        const leftEdgeLabel = "no";

        const rightEdgeId = path + "RightEdge";
        const rightEdgeLabel = tree.predicate.answers[0];

        const rightEdge = {
            data: {
                id: leftEdgeId,
                label: leftEdgeLabel,
                source: nodeId,
                target: null,
            },
        };
        const leftEdge = {
            data: {
                id: rightEdgeId,
                label: rightEdgeLabel,
                source: nodeId,
                target: null,
            },
        };

        convertToGraphData(tree.left, nodes, edges, path + "->L", leftEdge);
        convertToGraphData(tree.right, nodes, edges, path + "->R", rightEdge);
    } else {
        const nodeLabel = tree.value;
        nodes.push({ data: { id: nodeId, label: nodeLabel } });
    }

    return [nodes, edges];
};
