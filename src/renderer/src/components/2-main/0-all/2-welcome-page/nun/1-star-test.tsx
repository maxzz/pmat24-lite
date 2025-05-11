import { useEffect, useState, type ComponentPropsWithoutRef } from "react";
import { classNames } from "@/utils";
import { Button } from "@/ui";
import { StarA } from "./2-star-a";
import { StarB } from "./3-star-b";

export function StarTest({ className, ...rest }: ComponentPropsWithoutRef<'div'>) {
    const [render, setRender] = useState(false);
    const [render2, setRender2] = useState(0);

    useEffect(
        () => {
            setTimeout(() => setRender(true), 1000);
        }, []
    );

    return (
        <div className={classNames("absolute right-32 top-48 grid place-items-center z-50", className)} {...rest}>
            <div className="relative mt-64">
                <Button className="absolute top-0 -right-24 active:scale-95" onClick={() => {setRender(v => !v); setRender2(v => v + 1)}}>
                    Rerender ({render ? "y" : "n"})
                </Button>
                
                <StarA className="w-12 h-12" start={render} />
                <StarB className="w-12 h-12" start={render2} />
            </div>
        </div>
    );
}
