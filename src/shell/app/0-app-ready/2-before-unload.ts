
window.addEventListener('beforeunload',
    (event) => {
        // Check if there are unsaved changes or if you want to prompt the user for any other reason
        const hasUnsavedChanges = true; // Replace with your actual logic

        if (hasUnsavedChanges) {
            // Prevent the default behavior which would close the window immediately
            event.preventDefault();

            // In Electron, returning a non-void value or setting event.returnValue
            // will trigger a confirmation dialog in some scenarios, but it's
            // recommended to use Electron's dialog API for a consistent user experience.
            // For example:
            const { remote } = require('electron'); // Use remote for accessing main process modules
            const dialog = remote.dialog;
            const currentWindow = remote.getCurrentWindow();

            const choice = dialog.showMessageBoxSync(currentWindow, {
                type: 'question',
                buttons: ['Yes', 'No'],
                title: 'Confirm',
                message: 'Are you sure you want to quit? You have unsaved changes.',
            });

            // If the user clicked 'No' (index 1), cancel the close operation
            if (choice === 1) {
                event.returnValue = false; // Prevents the window from closing
            }
        }
    }
);
