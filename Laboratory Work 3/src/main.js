import "../style.css";
import chartSteps from "./chart/chartComplexitySteps";
import chartTime from "./chart/chartComplexityTime";
import chartCompare from "./chart/chartComplexityCompare";

// 10 sec setup
const dataSteps = chartSteps("chart1", 1000);
chartTime("chart2");

chartCompare("chart3", 1000, {
    ...dataSteps.datasets[0],
    borderColor: undefined,
    backgroundColor: undefined,
    pointRadius: 5,
    borderWidth: 5,
});
chartCompare("chart4", 1000, {
    ...dataSteps.datasets[1],
    borderColor: undefined,
    backgroundColor: undefined,
    pointRadius: 5,
    borderWidth: 5,
});
chartCompare("chart5", 1000, {
    ...dataSteps.datasets[2],
    borderColor: undefined,
    backgroundColor: undefined,
    pointRadius: 5,
    borderWidth: 5,
});
chartCompare("chart6", 1000, {
    ...dataSteps.datasets[3],
    borderColor: undefined,
    backgroundColor: undefined,
    pointRadius: 5,
    borderWidth: 5,
});
chartCompare("chart7", 1000, {
    ...dataSteps.datasets[4],
    borderColor: undefined,
    backgroundColor: undefined,
    pointRadius: 5,
    borderWidth: 5,
});
chartCompare("chart8", 1000, {
    ...dataSteps.datasets[5],
    borderColor: undefined,
    backgroundColor: undefined,
    pointRadius: 5,
    borderWidth: 5,
});
chartCompare("chart9", 1000, {
    ...dataSteps.datasets[6],
    borderColor: undefined,
    backgroundColor: undefined,
    pointRadius: 5,
    borderWidth: 5,
});
