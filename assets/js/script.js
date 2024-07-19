
    function copyText(elementId) {
        const element = document.getElementById(elementId);
        if (!element) {
            console.error("Element with ID", elementId, "not found.");
            return;
        }

        const text = element.textContent.trim();
        if (!text) {
            console.error("Element with ID", elementId, "has no text content.");
            return;
        }

        // Menyalin teks ke clipboard
        navigator.clipboard.writeText(text).then(() => {
            // Animasi sementara untuk memberi umpan balik visual bahwa teks telah disalin
            const originalBackgroundColor = element.style.backgroundColor;
            element.style.backgroundColor = "#f0f0f0";
            setTimeout(() => {
                element.style.backgroundColor = originalBackgroundColor;
            }, 1000);

            // Pesan sukses
            alert("Text copied to clipboard: " + text);
        }).catch(err => {
            // Penanganan error
            console.error("Could not copy text: ", err);
            alert("Could not copy text. Please try again.");
        });
    }
