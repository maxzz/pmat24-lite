import React, { useState, useEffect, useCallback } from "react"; // GAI: react global double shortcut key component

export const DoubleKeyShortcut = ({ keys, onMatch, timeout = 1000 }: { keys: string[]; onMatch: () => void; timeout?: number; }) => {
    const [pressedKeys, setPressedKeys] = useState<string[]>([]);
    const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            const newPressedKeys = [...pressedKeys, event.key];
            setPressedKeys(newPressedKeys);

            if (newPressedKeys.length === keys.length) {
                if (newPressedKeys.every((key, index) => key === keys[index])) {
                    onMatch();
                }
                setPressedKeys([]);
                timer && clearTimeout(timer);
                setTimer(null);
            }
            else if (newPressedKeys.length < keys.length) {
                timer && clearTimeout(timer);
                setTimer(
                    setTimeout(
                        () => {
                            setPressedKeys([]);
                            setTimer(null);
                        }, timeout
                    )
                );
            }
        },
        [keys, onMatch, timer, timeout, pressedKeys]
    );

    useEffect(
        () => {
            const controller = new AbortController();
            document.addEventListener('keydown', handleKeyDown,  { signal: controller.signal });

            return () => {
                controller.abort();
                timer && clearTimeout(timer);
            };
        }, [handleKeyDown, timer]
    );

    return null;
};

//import React, { useEffect, useState } from "react";

interface DoubleKeyShortcutProps {
    keys: [string, string];
    onSuccess: () => void;
    onFail?: () => void;
    timeout?: number;
}

export const DoubleKeyShortcutTs: React.FC<DoubleKeyShortcutProps> = ({ keys, onSuccess, onFail, timeout = 2000 }) => {
    const [firstKeyPressed, setFirstKeyPressed] = useState<string | null>(null);
    const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

    useEffect(
        () => {
            function handleKeyDown(event: KeyboardEvent) {
                if (event.key === keys[0] && firstKeyPressed === null) {
                    setFirstKeyPressed(event.key);
                    setTimer(
                        setTimeout(
                            () => {
                                setFirstKeyPressed(null);
                                onFail?.();
                            }, timeout
                        )
                    );
                }
                else if (event.key === keys[1] && firstKeyPressed === keys[0]) {
                    timer && clearTimeout(timer);
                    setFirstKeyPressed(null);
                    onSuccess();
                }
                else if (event.key !== keys[0] && event.key !== keys[1]) {
                    setFirstKeyPressed(null);
                    timer && clearTimeout(timer);
                }
            }

            const controller = new AbortController();
            window.addEventListener('keydown', handleKeyDown, { signal: controller.signal });

            return () => {
                controller.abort();
                timer && clearTimeout(timer);
            };
        }, [keys, onSuccess, onFail, timeout, timer, firstKeyPressed]
    );

    return null;
};

/** /
//import React from "react";
import DoubleKeyShortcut from "./DoubleKeyShortcut";

const MyComponent = () => {
    function handleShortcutMatch() {
        alert('Ctrl + K pressed!');
    }
    return (
        <div>
            <DoubleKeyShortcut keys={['Control', 'k']} onMatch={handleShortcutMatch} />
            // Rest of your component
        </div>
    );
};

export default MyComponent;
/**/

/** /
//import React, { useEffect, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";

interface DoubleShortcutProps {
    firstKey: string;
    secondKey: string;
    onDoubleShortcut: () => void;
}

const DoubleShortcut3: React.FC<DoubleShortcutProps> = ({ firstKey, secondKey, onDoubleShortcut,
}) => {
    const [firstKeyPressed, setFirstKeyPressed] = useState(false);

    // Handler for the first key press
    useHotkeys(
        firstKey,
        () => {
            setFirstKeyPressed(true);
        },
        [firstKey],
    );

    // Handler for the second key press, check for the first key being pressed.
    useHotkeys(
        secondKey,
        () => {
            if (firstKeyPressed) {
                onDoubleShortcut();
                setFirstKeyPressed(false); // Reset state
            }
            else {
                setFirstKeyPressed(false); // Reset the first key state even if second key was hit without first key.
            }
        },
        [secondKey, firstKeyPressed, onDoubleShortcut],
    );

    // Reset state when focus is lost from window
    useEffect(
        () => {
            const handleBlur = () => {
                setFirstKeyPressed(false);
            };

            const controller = new AbortController();
            window.addEventListener('blur', handleBlur, { signal: controller.signal });
            return () => {
                controller.abort();
            };
        }, []
    );

    return null; // This component doesn't render anything visually.
};

import DoubleShortcut from "./DoubleShortcut";

function App() {
    function handleMyDoubleShortcut() {
        console.log('My double shortcut triggered!');
    }
    return (
        <div>
            <DoubleShortcut
                firstKey="ctrl+a"
                secondKey="ctrl+b"
                onDoubleShortcut={handleMyDoubleShortcut}
            />
            // Your other app components
        </div>
    );
}
/**/
