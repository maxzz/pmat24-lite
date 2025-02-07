import { atom } from "jotai";
import { invokeMain } from "@/xternal-to-main";
import { napiBuildProgress, napiBuildState } from "@/store/state-debug";
import { EngineControl } from "@shared/ipc-types";
import { getSubError } from "@/utils";
import { CatalogFile, Mani, Meta, buildManiMetaForms, parseXMLFile } from "@/store/manifest";
import { lastBuildProgressAtom } from "../1-do-get-hwnd";

type SawContentReply = {
    pool: string;
    controls: EngineControl[];
};

export const sawManiStrAtom = atom<string | undefined>('');         // raw unprocessed reply string from napi to compare with current
export const sawManiXmlAtom = atom<string | undefined>(undefined);  // raw xml string from napi if called with wantXml
export const sawManiAtom = atom<SawContentReply | null>(null);      // reply with controls and pool

export const doGetWindowManiAtom = atom(
    null,
    async (get, set, { hwnd, wantXml }: { hwnd: string | undefined; wantXml: boolean; }): Promise<void> => {
        try {
            if (!hwnd) {
                throw new Error('No hwnd');
            }

            if (napiBuildState.buildRunning) {
                return;
            }

            // 1. call napi to get raw reply string

            napiBuildProgress.buildCounter = 0;
            napiBuildState.buildRunning = true;
            napiBuildState.buildError = '';
            napiBuildState.buildFailedBody = '';

            const res = await invokeMain<string>({ type: 'r2mi:get-window-mani', hwnd, wantXml });

            const prev = get(sawManiStrAtom);
            if (prev === res) {
                napiBuildProgress.buildCounter = 0;
                napiBuildState.buildRunning = false;
                napiBuildState.buildError = '';
                return;
            }
            set(sawManiStrAtom, res);

            // 2. parse reply string to get final reply

            if (wantXml) {
                set(sawManiXmlAtom, res);

                console.log(`doGetWindowManiXmlAtom.set\n${res}`);
            } else {
                const reply = JSON.parse(res || '{}') as SawContentReply;
                const final = reply.pool && reply.controls?.length ? reply : null;
                set(sawManiAtom, final);

                console.log('doGetWindowManiAtom.set', JSON.stringify(reply, null, 4));
            }

            set(lastBuildProgressAtom, napiBuildProgress.buildCounter);
            napiBuildProgress.buildCounter = 0;
            napiBuildState.buildRunning = false;
            napiBuildState.buildError = '';
        } catch (error) {
            set(sawManiStrAtom, '');
            set(sawManiAtom, null);

            napiBuildProgress.buildCounter = 0;
            napiBuildState.buildRunning = false;
            napiBuildState.buildError = getSubError(error);

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
