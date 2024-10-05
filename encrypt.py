import os
import sys
import base64
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad
from Crypto.Hash import MD5
from bs4 import BeautifulSoup

def encrypt_content(content, password):
    key = MD5.new(password.encode('utf-8')).hexdigest().encode('utf-8')
    iv = key[:16]
    content = "--- VALIDATION STRING ---" + content
    content_bytes = content.encode('utf-8')
    padded_content = pad(content_bytes, AES.block_size)
    cipher = AES.new(key, AES.MODE_CBC, iv)
    ct_bytes = cipher.encrypt(padded_content)
    ct_base64 = base64.b64encode(ct_bytes).decode('utf-8')
    print(f"Debug: Encrypted content length: {len(ct_base64)}")
    return ct_base64

def process_file(file_path, password):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()

    soup = BeautifulSoup(content, 'html.parser')

    # Check for the hasEncryptedContent meta tag
    meta_tag = soup.find('meta', attrs={'name': 'hasEncryptedContent', 'content': 'true'})
    if not meta_tag:
        return
    print(f"Debug: File {file_path} has hasEncryptedContent meta tag.")

    content_area = soup.find('div', class_='content-area')

    if content_area:
        print(f"Debug: Content area found in {file_path}")
        print(f"Debug: Content area length before encryption: {len(str(content_area))}")

        # Encrypt the content area
        encrypted_content = encrypt_content(str(content_area), password)

        # Replace the content area with the encrypted version
        new_div = soup.new_tag('div')
        new_div['class'] = 'content-area hugo-encryptor-container'
        cipher_div = soup.new_tag('div')
        cipher_div['class'] = 'hugo-encryptor-cipher-text'
        cipher_div.string = encrypted_content
        new_div.append(cipher_div)
        content_area.replace_with(new_div)

        new_content = str(soup)
        print(f"Debug: New content length after encryption: {len(new_content)}")

        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(new_content)

        print(f"Debug: File {file_path} encrypted successfully.")
    else:
        print(f"Debug: No content area found in {file_path}")

def main():
    if len(sys.argv) != 3:
        print("Usage: python encrypt_content.py <password> <directory_path>")
        sys.exit(1)

    password = sys.argv[1]
    directory_path = sys.argv[2]

    if not os.path.isdir(directory_path):
        print(f"Error: The specified path '{directory_path}' is not a valid directory.")
        sys.exit(1)

    for root, dirs, files in os.walk(directory_path):
        for file in files:
            if file.endswith('.html'):  # Process only HTML files
                file_path = os.path.join(root, file)
                print(f"Processing file: {file_path}")
                process_file(file_path, password)

    print("Content encryption completed successfully.")

if __name__ == "__main__":
    main()