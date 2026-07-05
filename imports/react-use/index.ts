import animations from "./animations";
import effects from "./effects";
import lifecycles from "./lifecycles";
import misc from "./misc";
import sensors from "./sensors";
import state from "./state";
import ui from "./ui";

export default {
  from: "react-use",
  imports: [
    ...animations.imports,
    ...effects.imports,
    ...lifecycles.imports,
    ...misc.imports,
    ...sensors.imports,
    ...state.imports,
    ...ui.imports,
  ],
};
