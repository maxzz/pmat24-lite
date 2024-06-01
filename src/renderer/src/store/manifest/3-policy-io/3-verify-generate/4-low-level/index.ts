import * as customRule4 from "./1-verify-password-against-rule-no-throw";
import * as customRule5 from "./2-generate-password-by-rule-no-throw";

export const customRule = { ...customRule4, ...customRule5 };
