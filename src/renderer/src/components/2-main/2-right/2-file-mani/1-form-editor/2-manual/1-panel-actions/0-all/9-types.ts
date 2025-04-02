import { type ChunkKey } from "@/store/manifest";

export type CreateNewManualAction = (type: ChunkKey, password: boolean) => void;
