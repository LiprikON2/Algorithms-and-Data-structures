import _ from "lodash";

const generateDataset = (fn, options) => {
    const defaultOptions = { label: "", count: 100, density: null, chartOptions: null };
    const { label, count, density, chartOptions } = { ...defaultOptions, ...options };

    const step = Math.round(density ? count * (1 - density) : count * 0.01);
    const validStep = Math.min(Math.max(step, 1), count - 1);
    console.log("validStep", validStep);

    const xAxis = _.range(0, count, validStep);
    const data = xAxis.map((x) => ({ x, y: fn(x) }));

    return { label, data, ...chartOptions };
};

export default generateDataset;
