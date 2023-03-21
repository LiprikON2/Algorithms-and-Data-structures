const positiveAnswers = ["yes", "ye", "y", "yep", "yeah", "true", "д", "да", "ага"];

const createPredicate = (label, answers = []) => {
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

const createYesPredicate = (label) => createPredicate(label, positiveAnswers);

const createNode = (predicate = null, left = null, right = null, value = null) => {
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

const createEndNode = (value) => createNode(null, null, null, value);

// https://www.huffpost.com/entry/pulp-fiction-guess-who_n_4676563
alert("Guess Who: Pulp Fiction\n\nProceed after you thought of a character.");

const tree = createNode(
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

tree.prompt();
