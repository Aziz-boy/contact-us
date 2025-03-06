document.addEventListener("DOMContentLoaded", () => {
    const inputs = document.querySelectorAll(".contact-input");
    const toggleBtn = document.querySelector(".theme-toggle");
    const allElements = document.querySelectorAll("*");

    // Theme toggle
    toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark");
        allElements.forEach(el => {
            el.classList.add("transition");
            setTimeout(() => {
                el.classList.remove("transition");
            }, 1000);
        });
    });

    // Input field animations
    inputs.forEach((ipt) => {
        ipt.addEventListener("focus", () => {
            ipt.parentNode.classList.add("focus", "not-empty");
        });
        ipt.addEventListener("blur", () => {
            if (ipt.value === "") {
                ipt.parentNode.classList.remove("not-empty");
            }
            ipt.parentNode.classList.remove("focus");
        });
    });

    // Form submission
    document.getElementById("contactForm").addEventListener("submit", function(event) {
        event.preventDefault();

        let successMessage = document.getElementById("success-message");
        successMessage.classList.add("show");

        setTimeout(() => {
            successMessage.classList.add("fade-out");
            setTimeout(() => {
                successMessage.classList.remove("show", "fade-out");
            }, 500);
        }, 3000);

        let botToken = "7973033694:AAFYcDlXn39x35ddcxLPJsX6ZsaUiyIEiCk";
        let chatId = "6392542039";

        let firstName = document.getElementById("firstName").value;
        let lastName = document.getElementById("lastName").value;
        let email = document.getElementById("email").value;
        let message = document.getElementById("message").value;
        let fileInput = document.getElementById("file");

        let textMessage = `📩 *New Contact Form Submission*\n\n` +
            `👤 *Name:* ${firstName} ${lastName}\n` +
            `✉ *Email:* ${email}\n` +
            `📝 *Message:* ${message}`;

        fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: chatId, text: textMessage, parse_mode: "Markdown" })
        }).then(response => response.json())
        .then(data => console.log("Message sent:", data))
        .catch(error => console.error("Error sending message:", error));

        if (fileInput.files.length > 0) {
            let formData = new FormData();
            formData.append("chat_id", chatId);
            formData.append("document", fileInput.files[0]);

            fetch(`https://api.telegram.org/bot${botToken}/sendDocument`, {
                method: "POST",
                body: formData
            }).then(response => response.json())
            .then(data => console.log("File sent:", data))
            .catch(error => console.error("Error sending file:", error));
        }

        document.getElementById("contactForm").reset();
    });
});
