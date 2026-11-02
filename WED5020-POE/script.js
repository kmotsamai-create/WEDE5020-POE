
  const images = document.querySelectorAll(".product img");

    let currentIndex = 0;

    // Open the lightbox
    function openLightbox(index) {
        currentIndex = index;

        document.getElementById("lightbox")
            .classList.add("show");

        showImage();
    }

    // Display the selected image
    function showImage() {
        const image = images[currentIndex];

        document.getElementById("lightboxImage").src =
            image.src;

        document.getElementById("caption").textContent =
            image.dataset.name;
    }

    // Close the lightbox
    function closeLightbox() {
        document.getElementById("lightbox")
            .classList.remove("show");
    }

    // Move between images
    function changeImage(direction) {
        currentIndex += direction;

        if (currentIndex >= images.length) {
            currentIndex = 0;
        }

        if (currentIndex < 0) {
            currentIndex = images.length - 1;
        }

        showImage();
    }

    // Click on a product image
    images.forEach(function(image, index) {
        image.addEventListener("click", function() {
            openLightbox(index);
        });

        // Enquiry form submission handling
        document.getElementById('submit-button').addEventListener('click', function () {
    // 1. Retrieve input values using the exact element IDs from your HTML
    const firstName = document.getElementById('firstname-input').value.trim();
    const email = document.getElementById('email-input').value.trim();
    const phone = document.getElementById('phone-input').value.trim();
    const messageTypeSelect = document.getElementById('messagetype-input');
    const messageType = messageTypeSelect ? messageTypeSelect.value : 'General Message';
    const message = document.getElementById('message-input').value.trim();
    
    // Create an error/success feedback container if not already in HTML
    let errorMessage = document.getElementById('error-message');
    if (!errorMessage) {
        errorMessage = document.createElement('p');
        errorMessage.id = 'error-message';
        document.getElementById('form').prepend(errorMessage);
    }

    errorMessage.textContent = '';
    errorMessage.style.color = 'red';

    // 2. Input Validation
    if (!firstName || !email || !phone || !messageType || !message) {
        errorMessage.textContent = 'Please fill in all required fields and select a message type.';
        return;
    }

    // Email format validation regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        errorMessage.textContent = 'Please enter a valid email address.';
        return;
    }

    // 3. Compile Information into an Email (Mailto Link)
    const recipientEmail = 'info@kewavhub.co.za'; // Organization's recipient email
    const subject = encodeURIComponent(`[${messageType}] Message from ${firstName}`);
    
    const bodyContent = `Name: ${firstName}\n` +
                        `Email: ${email}\n` +
                        `Phone: ${phone}\n` +
                        `Message Type: ${messageType}\n\n` +
                        `Message:\n${message}`;
    
    const mailtoLink = `mailto:${recipientEmail}?subject=${subject}&body=${encodeURIComponent(bodyContent)}`;

    // 4. Present Response and Trigger Email Client
    errorMessage.style.color = 'green';
    errorMessage.textContent = 'Validation successful! Opening your email client to send your message...';

    // Open the email client with pre-filled content
    window.location.href = mailtoLink;
});
// Contact form submission handling
document.getElementById('submit-button').addEventListener('click', function () {
    // Get input values and container elements
    const firstName = document.getElementById('firstname-input').value.trim();
    const email = document.getElementById('email-input').value.trim();
    const phone = document.getElementById('phone-input').value.trim();
    const enquiry = document.getElementById('enquiry-input').value.trim();
    const errorMessage = document.getElementById('error-message');

    // Reset feedback message and style
    errorMessage.textContent = '';
    errorMessage.style.color = 'red';

    // 1. Input Validation
    if (!firstName || !email || !phone || !enquiry) {
        errorMessage.textContent = 'Please fill in all fields before submitting.';
        return;
    }

    // Basic email validation regex
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        errorMessage.textContent = 'Please enter a valid email address.';
        return;
    }

    // 2. Form Processing & Dynamic Response Setup
    const lowerEnquiry = enquiry.toLowerCase();
    let responseText = `Thank you, ${firstName}! `;

    // Custom response based on availability or pricing queries
    if (lowerEnquiry.includes('availability') || lowerEnquiry.includes('stock') || lowerEnquiry.includes('available')) {
        responseText += 'Our standard products are currently in stock and ready to ship within 24–48 hours.';
    } else if (lowerEnquiry.includes('cost') || lowerEnquiry.includes('price') || lowerEnquiry.includes('quote')) {
        responseText += 'Standard product pricing starts at R499.00. Detailed custom quotes are emailed within 1 business day.';
    } else {
        responseText += 'We have received your enquiry regarding product details and availability. A representative will respond to ' + email + ' shortly.';
    }

    // 3. Display Success Output & Clear Form
    errorMessage.style.color = 'green';
    errorMessage.textContent = responseText;

    // Optional: Reset form fields after successful submission
    document.getElementById('form').reset();
});
    });