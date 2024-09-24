import { Mani } from "pm-manifest";

export function printTestManifest(newMani: Partial<Mani.Manifest>) {

    if (newMani.forms?.[0]?.detection.names_ext) {
        newMani.forms[0].detection.names_ext = "...";
    }
    if (newMani.forms?.[1]?.detection.names_ext) {
        newMani.forms[1].detection.names_ext = "...";
    }

    console.log('%cnew manifest\n', 'color: magenta', JSON.stringify(newMani, null, 2));

}
