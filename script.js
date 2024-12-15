// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Toggle FAQ Sections
document.querySelectorAll('.faq-item h3').forEach(question => {
    question.addEventListener('click', () => {
        const parent = question.parentElement;
        parent.classList.toggle('active');
    });
});

// Azure Computer Vision Integration for Food Item Recognition
document.getElementById("imageUpload").addEventListener("change", async (event) => {
    const file = event.target.files[0];

    if (!file) {
        alert("Please upload an image.");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);

    // Azure Computer Vision API settings
    const endpoint = "https://primepathprovisions.cognitiveservices.azure.com/vision/v3.2/analyze"; // Replace with your endpoint
    const subscriptionKey = "Your-Subscription-Key-Here"; // Replace with your API key

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Ocp-Apim-Subscription-Key": subscriptionKey,
                "Content-Type": "application/octet-stream",
            },
            body: file,
        });

        const data = await response.json();
        console.log(data);

        // Display results in #productSuggestions
        const productSuggestions = document.getElementById("productSuggestions");
        productSuggestions.innerHTML = `
            <h3>Suggested Dishes:</h3>
            <ul>
                <li>${data.description.captions[0]?.text || "No suggestions available"}</li>
            </ul>
        `;
    } catch (error) {
        console.error("Error:", error);
        alert("There was an issue recognizing the food item. Please try again.");
    }
});

// Voice Command Navigation
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.onresult = (event) => {
    const command = event.results[0][0].transcript.toLowerCase();
    if (command.includes("about")) {
        window.location.href = "#about";
    } else if (command.includes("menu")) {
        window.location.href = "#menu";
    } else if (command.includes("order")) {
        window.location.href = "#orders";
    } else if (command.includes("contact")) {
        window.location.href = "#contact";
    }
};
document.getElementById("voiceSearch").addEventListener("click", () => recognition.start());

// Toggle Sections (Expandable Content)
function toggleSection(sectionId) {
    const content = document.getElementById(sectionId);

    if (content.style.maxHeight) {
        content.style.maxHeight = null; // Collapse
    } else {
        const allContents = document.querySelectorAll(".collapsible-content");
        allContents.forEach(section => (section.style.maxHeight = null)); // Collapse all
        content.style.maxHeight = content.scrollHeight + "px"; // Expand clicked section
    }
}

// Toggle Contact Form Visibility
function toggleContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm.style.display === 'none' || contactForm.style.display === '') {
        contactForm.style.display = 'block';
    } else {
        contactForm.style.display = 'none';
    }
}

// Randomize Customer Reviews on Page Load
document.addEventListener("DOMContentLoaded", function () {
    const reviewsBox = document.querySelector(".reviews-box");
    const reviews = Array.from(reviewsBox.children);

    reviews.sort(() => Math.random() - 0.5); // Shuffle reviews
    reviews.forEach((review) => reviewsBox.appendChild(review)); // Reorder reviews
});

// Slideshow for Menu Images
let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("slide");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; // Hide all slides
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; } // Reset to first slide
    slides[slideIndex - 1].style.display = "block"; // Show current slide
    setTimeout(showSlides, 5000); // Change image every 5 seconds
}

// Manual Navigation for Slides
function plusSlides(n) {
    slideIndex += n - 1; // Adjust index
    showSlides();
}

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public")); // Serve static files
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
