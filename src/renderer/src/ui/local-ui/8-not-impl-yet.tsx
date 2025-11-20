import { notice } from "@/ui/local-ui/7-toaster";

export const notice_notImplYet = {
    onClick: () => notice.error("Not implemented yet")
};

export const notice_checkDevTools = {
    onClick: () => notice.info("Check result in DevTools console")
};
