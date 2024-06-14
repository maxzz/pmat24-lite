import * as l1 from "./1-generate/0-all";
import * as l2 from "./2-verify/0-all";

export const customRule = { ...l2, ...l1 };
