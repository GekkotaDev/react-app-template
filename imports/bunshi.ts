export default [
  {
    from: "bunshi",
    imports: ["molecule"],
  },
  {
    from: "bunshi/react",
    imports: ["useMolecule", ["ScopeProvider", "MoleculeProvider"], "MoleculeProvider"],
  },
];
