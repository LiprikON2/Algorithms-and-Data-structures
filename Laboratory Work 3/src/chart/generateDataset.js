import _ from "lodash";

const generateDataset = (fn, options) => {
    const defaultOptions = { label: "", count: 100, density: null, chartOptions: null };
    const { label, count, density, chartOptions } = { ...defaultOptions, ...options };

    const steps = Math.round(Math.max(density ? count * density : count * 0.01, 1));

    const xAxis = _.range(0, count, steps);
    const data = xAxis.map((x) => ({ x, y: fn(x) }));

    return { label, data, ...chartOptions };
};

export default generateDataset;
