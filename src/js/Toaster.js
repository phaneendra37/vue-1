// Importing the toast utility from the 'vue3-toastify' library
import { toast } from 'vue3-toastify';

// Default options for toast configuration
const defaultOptions = {
    multiple: true, // Allow multiple toasts to be displayed simultaneously
    transition: "slide", // Transition effect for showing/hiding toasts
    closeButton: false, // Display close button on toasts
    position: 'top-right', // Position of the toast container
    pauseOnHover: true, // Pause toast timer when hovering over them
    pauseOnFocusLoss: false, // Pause toast timer when window loses focus
    newestOnTop: true, // Display newest toasts on top
    clearOnUrlChange: true, // Clear toasts when URL changes
    closeOnClick: false, // Close toasts when clicked
    dangerouslyHTMLString: true // Enable rendering HTML content in toasts
}

// Function to display a toast with a specified variant, title, and message
export function showToast(variant, title, message) {
    // Constructing the content of the toast
    const content = `<b class='toast-heading'>${title ? title : variant}</b>\n${message}`;
    let toastId; // Variable to store the ID of the displayed toast

    // Displaying different types of toasts based on the specified variant
    if (variant === 'success') {
        toastId = toast.success(content, { ...defaultOptions }); // Display success toast
    }
    else if (variant === 'error') {
        toastId = toast.error(content, { ...defaultOptions }); // Display error toast
    }
    else if (variant === 'warning') {
        toastId = toast.warning(content, { ...defaultOptions }); // Display warning toast
    }
    else {
        toastId = toast.info(content, { ...defaultOptions }); // Display info toast by default
    }

    return toastId; // Return the ID of the displayed toast
}

// Function to display a loading toast with the provided message
export function loadingToast(message) {
    // Constructing the content of the loading toast
    const content = `<b class='toast-heading'>Please wait...</b>\n${message}`;

    // Displaying the loading toast and storing its ID
    const toastId = toast.loading(content, { ...defaultOptions });

    return toastId; // Return the ID of the displayed loading toast
}

// Function to close a toast with the specified ID
export function closeToast(id) {
    // Check if the provided ID exists
    if (!id) return;

    // Remove the toast associated with the provided ID
    toast.remove(id);
}
