import { atom } from "jotai";
import { invokeMain } from "@shared/ipc-client";
import { buildState, clientState } from "../../app-state";
import { EngineControl } from "@shell/napi-calls";
import { getSubError } from "@/utils";
import { lastBuildProgressAtom } from "..";
import { CatalogFile, Mani, Meta, buildCatalogMeta, buildManiMetaForms, parseXMLFile } from "@/store/manifest";

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

            if (clientState.buildRunning) {
                return;
            }

            clientState.buildRunning = true;
            buildState.buildCounter = 0;
            clientState.buildError = '';
            clientState.buildFailedBody = '';

            const res = await invokeMain<string>({ type: 'get-window-mani', hwnd, wantXml });

            const prev = get(sawManiStrAtom);
            if (prev === res) {
                clientState.buildRunning = false;
                buildState.buildCounter = 0;
                clientState.buildError = '';
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

            set(lastBuildProgressAtom, buildState.buildCounter);
            clientState.buildRunning = false;
            buildState.buildCounter = 0;
            clientState.buildError = '';
        } catch (error) {
            set(sawManiStrAtom, '');
            set(sawManiAtom, null);

            clientState.buildRunning = false;
            buildState.buildCounter = 0;
            clientState.buildError = getSubError(error);

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
