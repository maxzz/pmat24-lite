import React, { useState, useEffect, useCallback } from 'react'; // GAI: react global double shortcut key component

export const DoubleKeyShortcut = ({ keys, onMatch, timeout = 1000 }: { keys: [string, string]; onMatch: () => void; timeout?: number }) => {
    const [pressedKeys, setPressedKeys] = useState<string[]>([]);
    const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

    const handleKeyDown = useCallback(
        (event) => {
            const newPressedKeys = [...pressedKeys, event.key];
            setPressedKeys(newPressedKeys);

            if (newPressedKeys.length === keys.length) {
                if (newPressedKeys.every((key, index) => key === keys[index])) {
                    onMatch();
                }
                setPressedKeys([]);
                timer && clearTimeout(timer);
                setTimer(null);
            } else if (newPressedKeys.length < keys.length) {
                if (timer) {
                    clearTimeout(timer);
                }
                setTimer(
                    setTimeout(() => {
                        setPressedKeys([]);
                        setTimer(null);
                    }, timeout)
                );
            }
        },
        [keys, onMatch, timer, timeout, pressedKeys]
    );

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [handleKeyDown, timer]);

    return null;
};

//import React, { useEffect, useState } from 'react';

interface DoubleKeyShortcutProps {
    keys: [string, string];
    onSuccess: () => void;
    onFail?: () => void;
    timeout?: number;
}

export const DoubleKeyShortcutTs: React.FC<DoubleKeyShortcutProps> = ({ keys, onSuccess, onFail, timeout = 2000 }) => {
    const [firstKeyPressed, setFirstKeyPressed] = useState<string | null>(null);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

    useEffect(
        () => {
            const handleKeyDown = (event: KeyboardEvent) => {
                if (event.key === keys[0] && firstKeyPressed === null) {
                    setFirstKeyPressed(event.key);
                    const newTimer = setTimeout(
                        () => {
                            setFirstKeyPressed(null);
                            onFail?.();
                        }, timeout
                    );
                    setTimer(newTimer);
                } else if (event.key === keys[1] && firstKeyPressed === keys[0]) {
                    clearTimeout(timer as NodeJS.Timeout);
                    setFirstKeyPressed(null);
                    onSuccess();
                } else if (event.key !== keys[0] && event.key !== keys[1]) {
                    setFirstKeyPressed(null);
                    clearTimeout(timer as NodeJS.Timeout);
                }
            };

            window.addEventListener('keydown', handleKeyDown);

            return () => {
                window.removeEventListener('keydown', handleKeyDown);
                if (timer) {
                    clearTimeout(timer);
                }
            };
        }, [keys, onSuccess, onFail, timeout, timer, firstKeyPressed]
    );

    return null;
};

/*
import React from 'react';
import DoubleKeyShortcut from './DoubleKeyShortcut';

const MyComponent = () => {
  const handleShortcutMatch = () => {
    alert('Ctrl + K pressed!');
  };

  return (
    <div>
      <DoubleKeyShortcut keys={['Control', 'k']} onMatch={handleShortcutMatch} />
      {/* Rest of your component * /}
      </div>
    );
  };
  
  export default MyComponent;
*/