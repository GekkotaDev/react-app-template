import { visualizer } from "rollup-plugin-visualizer";

const opts = {
  brotliSize: true,
  gzipSize: true,
};

export default [
  visualizer({
    title: "Bundle Report",
    filename: "./bundle/report.md",
    template: "markdown",
  }),
  visualizer({
    ...opts,
    title: "Bundle Report",
    filename: "./bundle/report.yaml",
    template: "list",
  }),

  visualizer({
    ...opts,
    title: "Bundle Flamegraph",
    filename: "./bundle/stats/flamegraph.html",
    template: "flamegraph",
  }),
  visualizer({
    ...opts,
    title: "Bundle Sunburst",
    filename: "./bundle/stats/sunburst.html",
    template: "sunburst",
  }),
  visualizer({
    ...opts,
    title: "Bundle Treemap",
    filename: "./bundle/stats/treemap.html",
    template: "treemap",
  }),
  visualizer({
    ...opts,
    title: "Bundle Network",
    filename: "./bundle/stats/network.html",
    template: "network",
  }),
];
