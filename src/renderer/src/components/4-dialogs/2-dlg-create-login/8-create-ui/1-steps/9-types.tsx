import { type ReactNode } from "react";

export type StepItem = {
    label: ReactNode;
};

export const enum StatusEnum { // Former Timeline5WithAI from shadch-tv
    complete,
    current, // i.e. in progress
    notStarted,
}
