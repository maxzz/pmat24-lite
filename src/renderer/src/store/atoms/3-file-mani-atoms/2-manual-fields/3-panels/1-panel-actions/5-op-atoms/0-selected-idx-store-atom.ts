import { atomWithProxy } from "jotai-valtio";
import { gScriptState } from "../2-script-state";

// export const rightPanel = proxy({ selectedIdx: 0 });

export const _selectedIdxStoreAtom = atomWithProxy(gScriptState.scriptState);
