import { toast } from "sonner";

export const notImplYet = {
    onClick: () => toast.error("Not implemented yet")
};

export const checkDevTools = {
    onClick: () => toast.info("Check result in DevTools console")
};
