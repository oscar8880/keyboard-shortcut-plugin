export const addKeyboardShortcut = (key: string, action: () => void) => {
    const keydownListener = (e: KeyboardEvent) => {
        const { key: targetKey } = e;
        const { tagName } = (e.target as Element);

        if (tagName === "INPUT" || tagName === "TEXTAREA") {
            return;
        }

        if(key === targetKey) {
            action();
        }
    }

    window.addEventListener('keydown', keydownListener, true)
} 
