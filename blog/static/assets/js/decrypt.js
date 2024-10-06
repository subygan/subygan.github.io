const COOKIE_NAME = 'encrypted_content_password';
const COOKIE_EXPIRY = 3 * 24 * 60 * 60 * 1000; // 7 days
const VALIDATION_STRING = "--- VALIDATION STRING ---";

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function setCookie(name, value, expiryMs) {
    const date = new Date();
    date.setTime(date.getTime() + expiryMs);
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function decryptContent(encryptedContent, password) {
    // Hash the password with MD5
    const key = CryptoJS.MD5(password).toString();
    const iv = CryptoJS.enc.Utf8.parse(key.slice(0, 16));

    // Decode base64
    const ciphertext = CryptoJS.enc.Base64.parse(encryptedContent);

    // Decrypt
    const decrypted = CryptoJS.AES.decrypt(
        { ciphertext: ciphertext },
        CryptoJS.enc.Utf8.parse(key),
        { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
    );

    return decrypted.toString(CryptoJS.enc.Utf8);
}

function showPasswordPrompt() {
    // Create modal overlay
    const overlay = document.createElement('div');
    Object.assign(overlay.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '800%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: '2147483647' // Maximum z-index value
    });

    // Create modal content
    const modal = document.createElement('div');
    Object.assign(modal.style, {
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '15px',
        width: '80%',
        maxWidth: '800px', // Increased max-width for larger screens
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
        position: 'relative',
        maxHeight: '80vh',
        overflowY: 'auto',
        boxSizing: 'border-box'
    });

    const heading = document.createElement('h2');
    heading.textContent = 'Enter Password';
    Object.assign(heading.style, {
        fontSize: '2em',
        marginBottom: '30px',
        color: '#333',
        textAlign: 'center'
    });

    const input = document.createElement('input');
    input.type = 'password';
    Object.assign(input.style, {
        display: 'block',
        width: '100%',
        padding: '15px',
        marginBottom: '30px',
        boxSizing: 'border-box',
        fontSize: '18px',
        border: '2px solid #ccc',
        borderRadius: '8px'
    });

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    Object.assign(submitButton.style, {
        width: '100%',
        padding: '15px',
        fontSize: '18px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background-color 0.3s'
    });

    submitButton.addEventListener('mouseover', () => {
        submitButton.style.backgroundColor = '#0056b3';
    });
    submitButton.addEventListener('mouseout', () => {
        submitButton.style.backgroundColor = '#007bff';
    });

    modal.appendChild(heading);
    modal.appendChild(input);
    modal.appendChild(submitButton);
    overlay.appendChild(modal);

    // Ensure the overlay is inserted into the DOM
    document.body.insertAdjacentElement('afterbegin', overlay);

    // Function to position the modal in view
    const positionModal = () => {
        const rect = modal.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;

        if (rect.height > viewportHeight * 0.8) {
            // If modal is taller than 80% of viewport, position it at the top with some padding
            modal.style.top = '10vh';
            modal.style.maxHeight = '80vh';
            modal.style.overflowY = 'auto';
        } else {
            // Center vertically
            modal.style.top = `${Math.max(0, (viewportHeight - rect.height) / 2)}px`;
        }

        // Adjust width for very small screens
        if (viewportWidth < 600) {
            modal.style.width = '90%';
        } else {
            modal.style.width = '80%';
        }

        // Ensure the modal is positioned fixed relative to the viewport
        modal.style.position = 'fixed';
        modal.style.left = `${(viewportWidth - rect.width) / 2}px`;
    };

    // Position the modal initially and on resize
    positionModal();
    window.addEventListener('resize', positionModal);

    // Ensure input is visible when keyboard appears on mobile
    input.addEventListener('focus', () => {
        setTimeout(() => {
            input.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300); // Delay to allow keyboard to appear
    });

    return new Promise((resolve) => {
        const handleSubmit = () => {
            const password = input.value;
            overlay.remove();
            window.removeEventListener('resize', positionModal);
            resolve(password);
        };

        submitButton.addEventListener('click', handleSubmit);
        input.addEventListener('keyup', (event) => {
            if (event.key === 'Enter') {
                handleSubmit();
            }
        });
    });
}

async function decryptPage() {
    if (!document.querySelector('meta[name="hasEncryptedContent"][content="true"]')) {
        return; // No encrypted content on this page
    }

    let password = getCookie(COOKIE_NAME);
    if (!password) {
        password = await showPasswordPrompt();
        setCookie(COOKIE_NAME, password, COOKIE_EXPIRY);
    }

    const encryptedElements = document.querySelectorAll('.hugo-encryptor-container');
    encryptedElements.forEach(container => {
        const encryptedContent = container.querySelector('.hugo-encryptor-cipher-text').textContent;
        try {
            const decryptedContent = decryptContent(encryptedContent, password);
            if (decryptedContent.includes(VALIDATION_STRING)) {
                container.innerHTML = decryptedContent.replace(VALIDATION_STRING, "");
            } else {
                console.log("Decryption failed: Invalid content");
            }
        } catch (error) {
            console.error('Decryption failed:', error);
        }
    });

    // Decrypt page title, description, and icon
    const elementsToDecrypt = [
        { selector: '.page-title', attribute: 'textContent' },
        { selector: '.page-description', attribute: 'textContent' },
        { selector: '.page-header-icon .icon', attribute: 'textContent' }
    ];

    elementsToDecrypt.forEach(({ selector, attribute }) => {
        const element = document.querySelector(selector);
        if (element) {
            const encryptedContent = element[attribute];
            try {
                const decryptedContent = decryptContent(encryptedContent, password);
                if (decryptedContent.includes(VALIDATION_STRING)) {
                element[attribute] = decryptedContent.replace(VALIDATION_STRING, "");
                } else {
                    console.log("Not successfully invalidated")
                }
            } catch (error) {
                console.error(`Decryption failed for ${selector}:`, error);
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', decryptPage);