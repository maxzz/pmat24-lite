import { toaster } from "@/ui/local-ui";

export const notImplYet = {
    onClick: () => toaster.error("Not implemented yet")
};

export const checkDevTools = {
    onClick: () => toaster.info("Check result in DevTools console")
};
