import _ from "lodash";

export const generateDataset = (fn, label = "", count = 101, step = 1, options = {}) => {
    const xAxis = _.range(0, count, step);
    const data = xAxis.map((x) => ({ x, y: fn(x) }));

    return { label, data, ...options };
};
