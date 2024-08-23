import { SpyTestAllIcons } from "./spy-test-all-icons";
import { SpyTestAllSvgSymbols } from "./spy-test-all-svg-symbols";
import * as allIcons from '../ui/icons/normal';

export function SpyAllIcons() {
    return (
        <div className="">
            <SpyTestAllIcons allIcons={allIcons} />
            <SpyTestAllSvgSymbols />
        </div>
    );
}
