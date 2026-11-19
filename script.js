
"use strict";

// Workshop information: one array containing three workshop objects.
const workshops = [
    {
        id: "beginner",
        name: "Beginner Yoga Workshop",
        description: "A welcoming introduction to yoga poses and breathing."
    },
    {
        id: "mindfulness",
        name: "Mindfulness and Meditation",
        description: "Relax through guided meditation and mindful breathing."
    },
    {
        id: "restorative",
        name: "Restorative Yoga Workshop",
        description: "Enjoy gentle stretching and supported relaxation."
    }
];

const storageSettings = {
    key: "riverbendPreferredWorkshop"
};

// Find a workshop by its ID.
function findWorkshop(id) {
    return workshops.find(workshop => workshop.id === id);
}

// Display the selected workshop description.
function displayWorkshop(id) {
    const output = document.getElementById("workshop-result");
    const workshop = findWorkshop(id);

    output.textContent = workshop
        ? `You selected: ${workshop.name}. ${workshop.description}`
        : "";
}

// Save the selected workshop.
function selectWorkshop(id) {
    const workshop = findWorkshop(id);

    document.getElementById("form-workshop").value =
        workshop ? id : "";

    displayWorkshop(id);

    if (workshop) {
        localStorage.setItem(storageSettings.key, id);
    } else {
        localStorage.removeItem(storageSettings.key);
    }
}

// Restore the saved workshop after refreshing.
function loadSavedWorkshop() {
    const id = localStorage.getItem(storageSettings.key);

    if (findWorkshop(id)) {
        document.getElementById("workshop-choice").value = id;
        selectWorkshop(id);
    }
}

// Show or clear validation errors.
function setError(fieldId, errorId, message) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);

    error.textContent = message;

    if (message) {
        field.setAttribute("aria-invalid", "true");
    } else {
        field.removeAttribute("aria-invalid");
    }
}

// Validate the Request a Spot form.
function validateForm() {
    const name = document.getElementById("visitor-name").value.trim();
    const email = document.getElementById("visitor-email").value.trim();
    const workshopId = document.getElementById("form-workshop").value;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const nameError = name.length < 2
        ? "Please enter your full name (at least 2 characters)."
        : "";

    const emailError = !emailPattern.test(email)
        ? "Please enter a valid email address."
        : "";

    const workshopError = !findWorkshop(workshopId)
        ? "Please select a workshop."
        : "";

    setError("visitor-name", "name-error", nameError);
    setError("visitor-email", "email-error", emailError);
    setError("form-workshop", "workshop-error", workshopError);

    return !nameError && !emailError && !workshopError;
}

// Connect JavaScript to the webpage.
function setupPage() {
    const workshopChoice = document.getElementById("workshop-choice");
    const formWorkshop = document.getElementById("form-workshop");
    const form = document.getElementById("interest-form");

    if (!workshopChoice || !formWorkshop || !form) {
        return;
    }

    // Update the page when a workshop is selected.
    workshopChoice.addEventListener("change", () => {
        selectWorkshop(workshopChoice.value);
    });

    // Keep the form selection synchronized.
    formWorkshop.addEventListener("change", () => {
        workshopChoice.value = formWorkshop.value;
        selectWorkshop(formWorkshop.value);
        setError("form-workshop", "workshop-error", "");
    });

    // Clear errors when the user edits a field.
    document.getElementById("visitor-name").addEventListener(
        "input",
        () => setError("visitor-name", "name-error", "")
    );

    document.getElementById("visitor-email").addEventListener(
        "input",
        () => setError("visitor-email", "email-error", "")
    );

    // Validate the form before allowing a successful result.
    form.addEventListener("submit", event => {
        event.preventDefault();

        const message = document.getElementById("form-message");

        message.textContent = validateForm()
            ? "Your request details are valid! This is a demonstration form; no information has been sent to the studio."
            : "Please correct the highlighted fields and try again.";
    });

    // Load saved workshop preferences.
    loadSavedWorkshop();
}

// Start JavaScript after the webpage loads.
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupPage);
} else {
    setupPage();
}
