export default {
  from: "xstate",
  imports: [
    "createMachine",
    "createActor",
    "waitFor",
    "fromPromise",
    "fromTransition",
    "fromObservable",
    "fromEventObservable",
    "fromCallback",
    "setup",
    "assign",
  ],
};
