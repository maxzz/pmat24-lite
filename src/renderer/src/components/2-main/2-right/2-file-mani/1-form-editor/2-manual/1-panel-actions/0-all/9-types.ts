import { type MouseEvent } from "react";
import { type ChunkKey } from "@/store/manifest";

export type CreateNewManualAction = ({ type, password, event }: { type: ChunkKey, password: boolean | undefined; event: MouseEvent<HTMLElement> }) => void;
