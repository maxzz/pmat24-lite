import { atom } from "jotai";
import { invokeMain } from "@/xternal-to-main";
import { buildProgressState, maniBuildState } from "@/store/state-debug";
import { EngineControl } from "@shared/ipc-types";
import { getSubError } from "@/utils";
import { CatalogFile, Mani, Meta, buildCatalogMeta, buildManiMetaForms, parseXMLFile } from "@/store/manifest";
import { lastBuildProgressAtom } from "../do-get-hwnd";

type SawContentReply = {
    pool: string;
    controls: EngineControl[];
};

export const sawManiStrAtom = atom<string | undefined>('');
export const sawManiAtom = atom<SawContentReply | null>(null);
export const sawManiXmlAtom = atom<string | undefined>(undefined);

export const doGetWindowManiAtom = atom(
    null,
    async (get, set, { hwnd, wantXml }: { hwnd: string | undefined; wantXml: boolean; }): Promise<void> => {
        try {
            if (!hwnd) {
                throw new Error('No hwnd');
            }

            if (maniBuildState.buildRunning) {
                return;
            }

            maniBuildState.buildRunning = true;
            buildProgressState.buildCounter = 0;
            maniBuildState.buildError = '';
            maniBuildState.buildFailedBody = '';

            const res = await invokeMain<string>({ type: 'r2mi:get-window-mani', hwnd, wantXml });

            const prev = get(sawManiStrAtom);
            if (prev === res) {
                maniBuildState.buildRunning = false;
                buildProgressState.buildCounter = 0;
                maniBuildState.buildError = '';
                return;
            }
            set(sawManiStrAtom, res);

            if (wantXml) {
                set(sawManiXmlAtom, res);

                console.log(`doGetWindowManiXmlAtom.set\n${res}`);
            } else {
                const reply = JSON.parse(res || '{}') as SawContentReply;
                const final = reply.pool && reply.controls?.length ? reply : null;
                set(sawManiAtom, final);

                console.log('doGetWindowManiAtom.set', JSON.stringify(reply, null, 4));
            }

            set(lastBuildProgressAtom, buildProgressState.buildCounter);
            maniBuildState.buildRunning = false;
            buildProgressState.buildCounter = 0;
            maniBuildState.buildError = '';
        } catch (error) {
            set(sawManiStrAtom, '');
            set(sawManiAtom, null);

            maniBuildState.buildRunning = false;
            buildProgressState.buildCounter = 0;
            maniBuildState.buildError = getSubError(error);

            console.error(`'doGetWindowManiAtom' ${error instanceof Error ? error.message : `${error}`}`);
        }
    }
);

export type XmlParseResult = {
    mani: Mani.Manifest | undefined;
    fcat: CatalogFile.Root | undefined;
    meta: Meta.Form[];
};

function xmlToManifestAndMeta(cnt: string): XmlParseResult {
    const res = parseXMLFile(cnt);
    return {
        mani: res.mani,
        fcat: res.fcat,
        meta: buildManiMetaForms(res.mani),
    }
}

export const xmlControlsAtom = atom<XmlParseResult | null>(
    (get) => {
        const sawManiXml = get(sawManiXmlAtom);
        if (!sawManiXml) {
            return null;
        }

        const res = xmlToManifestAndMeta(sawManiXml);
        return res;        
    }
);
