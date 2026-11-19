
"use strict";

// Workshop information is organized using an array of objects.
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

// Additional object for browser storage settings.
const storageSettings = {
    key: "riverbendPreferredWorkshop"
};

// Get the page elements.
const workshopChoice = document.getElementById("workshop-choice");
const workshopResult = document.getElementById("workshop-result");
const formWorkshop = document.getElementById("form-workshop");
const interestForm = document.getElementById("interest-form");

// Find a workshop using its ID.
function findWorkshop(id) {
    return workshops.find(function(workshop) {
        return workshop.id === id;
    });
}

// Display the selected workshop without reloading the page.
function displayWorkshop(id) {
    const selected = findWorkshop(id);

    if (selected) {
        workshopResult.textContent =
            "You selected: " + selected.name + ". " +
            selected.description;
    } else {
        workshopResult.textContent = "";
    }
}

// Save and display a visitor's preferred workshop.
function selectWorkshop(id) {
    displayWorkshop(id);
    formWorkshop.value = findWorkshop(id) ? id : "";

    if (findWorkshop(id)) {
        localStorage.setItem(storageSettings.key, id);
    } else {
        localStorage.removeItem(storageSettings.key);
    }
}

// Restore the visitor's selection after a page refresh.
function loadSavedWorkshop() {
    const savedId = localStorage.getItem(storageSettings.key);

    if (savedId && findWorkshop(savedId)) {
        workshopChoice.value = savedId;
        formWorkshop.value = savedId;
        displayWorkshop(savedId);
    }
}

// Display an error next to a form field.
function showError(fieldId, errorId, message) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);

    field.setAttribute("aria-invalid", "true");
    error.textContent = message;
}

// Remove a previously displayed error.
function clearError(fieldId, errorId) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);

    field.removeAttribute("aria-invalid");
    error.textContent = "";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Validate the interest request form.
function validateForm() {
    let valid = true;

    const name = document.getElementById("visitor-name").value.trim();
    const email = document.getElementById("visitor-email").value.trim();
    const selectedWorkshop = formWorkshop.value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;/;

    clearError("visitor-name", "name-error");
    clearError("visitor-email", "email-error");
    clearError("form-workshop", "workshop-error");

    if (name.length < 2) {
        showError(
            "visitor-name",
            "name-error",
            "Please enter your full name (at least 2 characters)."
        );
        valid = false;
    }

    if (!emailPattern.test(email)) {
        showError(
            "visitor-email",
            "email-error",
            "Please enter a valid email address."
        );
        valid = false;
    }

    if (!findWorkshop(selectedWorkshop)) {
        showError(
            "form-workshop",
            "workshop-error",
            "Please select a workshop."
        );
        valid = false;
    }

    return valid;
}

// Listen for workshop selection changes.
workshopChoice.addEventListener("change", function() {
    selectWorkshop(workshopChoice.value);
});

// Keep the selector and form in sync.
formWorkshop.addEventListener("change", function() {
    workshopChoice.value = formWorkshop.value;
    selectWorkshop(formWorkshop.value);
    clearError("form-workshop", "workshop-error");
});

// Clear errors as users correct their information.
document.getElementById("visitor-name").addEventListener(
    "input",
    function() {
        clearError("visitor-name", "name-error");
    }
);

document.getElementById("visitor-email").addEventListener(
    "input",
    function() {
        clearError("visitor-email", "email-error");
    }
);

// Prevent invalid submissions.
interestForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const formMessage = document.getElementById("form-message");
    formMessage.textContent = "";

    if (validateForm()) {
        formMessage.textContent =
            "Your request details are valid! " +
            "This is a demonstration form; " +
            "no information has been sent to the studio.";
    }
});

// Load saved preferences when the page opens.
loadSavedWorkshop();
