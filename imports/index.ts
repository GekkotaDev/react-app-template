import AutoImport from "unplugin-auto-import/vite";

import bunshi from "./bunshi";
import dndKit from "./dnd-kit";
import * as jotai from "./jotai";
import motion from "./motion";
import query from "./query";
import reactUse from "./react-use";
import router from "./router";
import tsPattern from "./ts-pattern";

export default AutoImport({
  imports: [
    "jotai",
    "react",
    "react-dom",

    dndKit,
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
    ...bunshi,
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

  ignore: ["*.stories.*"],
});
