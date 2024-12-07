// script.js

// Global variables for saving user input
let distroData = {};

// Show the Create Distro form
function showCreateForm() {
    const createForm = document.getElementById("createForm");
    createForm.style.display = "block";
}

// Collect Distro Information and Display It
function createDistro() {
    const distroName = document.getElementById("distroName").value.trim();
    const license = document.getElementById("license").value.trim();
    const creator = document.getElementById("creator").value.trim();

    if (distroName && license && creator) {
        // Save distro data
        distroData = { distroName, license, creator };

        // Hide the form
        document.getElementById("createForm").style.display = "none";

        // Display the distro information
        document.getElementById("distroNameDisplay").textContent = distroName;
        document.getElementById("licenseDisplay").textContent = license;
        document.getElementById("creatorDisplay").textContent = creator;

        document.getElementById("distroInfo").style.display = "block";
        document.getElementById("developerSection").style.display = "block";

        // Reset form fields
        resetForm();
    } else {
        alert("All fields are required. Please fill them in!");
    }
}

// Reset form fields
function resetForm() {
    document.getElementById("distroName").value = "";
    document.getElementById("license").value = "";
    document.getElementById("creator").value = "";
}

// Preview the HTML Code
function previewHTML() {
    const htmlCode = document.getElementById("htmlCode").value.trim();

    if (htmlCode) {
        // Add support for including external CSS and JS dynamically
        const iframe = document.getElementById("htmlOutput");
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

        iframeDoc.open();
        iframeDoc.write(htmlCode);
        iframeDoc.close();

        // Show the output section
        document.getElementById("output").style.display = "block";

        // Save current HTML for recovery
        saveState();
    } else {
        alert("Please write some HTML code to preview!");
    }
}

// Save state to local storage
function saveState() {
    const htmlCode = document.getElementById("htmlCode").value.trim();
    localStorage.setItem("qnx_distroData", JSON.stringify(distroData));
    localStorage.setItem("qnx_htmlCode", htmlCode);
}

// Load state from local storage
function loadState() {
    const savedDistroData = localStorage.getItem("qnx_distroData");
    const savedHtmlCode = localStorage.getItem("qnx_htmlCode");

    if (savedDistroData) {
        distroData = JSON.parse(savedDistroData);
        document.getElementById("distroNameDisplay").textContent = distroData.distroName;
        document.getElementById("licenseDisplay").textContent = distroData.license;
        document.getElementById("creatorDisplay").textContent = distroData.creator;

        document.getElementById("distroInfo").style.display = "block";
        document.getElementById("developerSection").style.display = "block";
    }

    if (savedHtmlCode) {
        document.getElementById("htmlCode").value = savedHtmlCode;
    }
}

// Add keyboard shortcut for preview (Ctrl + Enter)
document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "Enter") {
        previewHTML();
    }
});

// Clear local storage
function clearState() {
    localStorage.removeItem("qnx_distroData");
    localStorage.removeItem("qnx_htmlCode");
}

// Initialize the app
window.onload = function () {
    loadState();
};
