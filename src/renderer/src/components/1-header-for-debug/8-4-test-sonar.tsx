import { Button } from "@/ui";
import { notice } from "@/ui/local-ui/7-toaster";
import { IconStopCircle, SymbolInfo, SymbolWarning } from "@/ui/icons";

export function TestSonner() {
    return (<>
        <Button className="text-[.65rem]" onClick={() => notice.info("lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")}>
            <SymbolInfo className="size-4 text-blue-500" />
        </Button>

        <Button className="text-[.65rem]" onClick={() => notice.success("Hello from a custom component! Hello 231 from a custom component!")}>
            <div className="text-green-500">OK</div>
        </Button>

        <Button className="text-[.65rem]" onClick={() => notice.warning("Hello from a custom component! Hello from 312 a custom component! Hello 2132 from a custom component!")}>
            <SymbolWarning className="size-4 text-orange-500" />
        </Button>

        <Button className="text-[.65rem]" onClick={() => notice.error("Hello from a custom component!")}>
            <IconStopCircle className="size-4" />
        </Button>

        <Button className="text-[.65rem]" onClick={ () => { const id = notice.error("Hello from a custom component!", { duration: 5000, action: { label: 'Dismiss', onClick: () => notice.dismiss(id) } }); }}>
            standard error
        </Button>
    </>);
}

//notice.error("Hello from a custom component!");
