import AutoImport from "unplugin-auto-import/vite";

import * as jotai from "./jotai";

import reactUse from "./react-use";
import motion from "./motion";
import query from "./query";
import router from "./router";
import tsPattern from "./ts-pattern";

export default AutoImport({
  imports: [
    "jotai",
    "react",
    "react-dom",

    reactUse,
    motion,
    query,
    router,
    tsPattern,

    jotai.reducer,
    jotai.resettable,
    jotai.storage,
    jotai.effect,
    jotai.query,
  ],

  dirs: [
    "./src/context",
    "./src/components",
    "./src/hooks",
    "./src/mutations",
    "./src/queries",
    "./src/stores",
    "./src/utils",
  ],
});
