import { LightningElement, api } from 'lwc';

export default class ToastNotification extends LightningElement {
    @api toastTitle = '';
    @api toastMessage = '';
    @api variant = 'success'; // Default to success
    @api showCloseButton = false; // Initialized as false
    showToastMessage = false;

    // Get the correct icon based on the variant
    get iconName() {
        switch (this.variant) {
            case 'success':
                return 'utility:success';
            case 'warning':
                return 'utility:warning';
            case 'error':
                return 'utility:error';
            case 'base':
                return 'utility:info';
            default:
                return 'utility:success';
        }
    }

    // Get the correct CSS class based on the variant
    get toastClass() {
        return `${this.variant}`;
    }

    // Function to show the toast with specific parameters
    showToast(toastTitle, toastMessage, variant, showClose) {
        this.variant = variant;
        this.toastTitle = toastTitle;
        this.toastMessage = toastMessage;
        this.showCloseButton = showClose;
        this.showToastMessage = true;

        // Optionally hide the toast after 3 seconds if no close button is shown
        if (!showClose) {
            setTimeout(() => {
                this.showToastMessage = false;
            }, 3000); // Hide after 3 seconds
        }
    }

    // Function to manually close the toast
    closeToast() {
        this.showToastMessage = false;
    }
}