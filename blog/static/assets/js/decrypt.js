const COOKIE_NAME = 'encrypted_content_password';
const COOKIE_EXPIRY = 7 * 24 * 60 * 60 * 1000; // 7 days
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
    console.log("Encrypted content:", encryptedContent);
    console.log("Password:", password);

    // Hash the password with MD5
    const key = CryptoJS.MD5(password).toString();
    console.log("Hashed key:", key);
    const iv = CryptoJS.enc.Utf8.parse(key.slice(0, 16));

    // Decode base64
    const ciphertext = CryptoJS.enc.Base64.parse(encryptedContent);

    // Decrypt
    const decrypted = CryptoJS.AES.decrypt(
        { ciphertext: ciphertext },
        CryptoJS.enc.Utf8.parse(key),
        { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }
    );

    const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);
    console.log("Decrypted content:", decryptedString);

    return decryptedString;
}

function showPasswordPrompt() {

    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '1000';

    // Create modal content
    const modal = document.createElement('div');
    modal.style.backgroundColor = 'white';
    modal.style.padding = '20px';
    modal.style.borderRadius = '5px';
    modal.style.textAlign = 'center';

    const heading = document.createElement('h2');
    heading.textContent = 'Enter Password';
    modal.appendChild(heading);

    const input = document.createElement('input');
    input.type = 'password';
    input.style.display = 'block';
    input.style.width = '100%';
    input.style.marginBottom = '10px';
    input.style.padding = '5px';
    modal.appendChild(input);

    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    submitButton.style.padding = '5px 10px';
    modal.appendChild(submitButton);

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    return new Promise((resolve) => {
        submitButton.onclick = () => {
            const password = input.value;
            document.body.removeChild(overlay);
            resolve(password);
        };
    });
}


async function decryptPage() {
    console.log("starting decryption");
    let password = getCookie(COOKIE_NAME);
    if (!password) {
        password = await showPasswordPrompt();
        setCookie(COOKIE_NAME, password, COOKIE_EXPIRY);
    }

    // Decrypt main content
    const encryptedElements = document.querySelectorAll('.hugo-encryptor-cipher-text');
    console.log(encryptedElements);
    encryptedElements.forEach(element => {
        const encryptedContent = element.textContent;
        try {
            const decryptedContent = decryptContent(encryptedContent, password);


            console.log("Decryption result:", decryptedContent);
            if (decryptedContent.includes(VALIDATION_STRING)) {
                const container = element.closest('.hugo-encryptor-container');
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