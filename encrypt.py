import os
import re
import sys
import base64
import yaml
from Crypto.Cipher import AES
from Crypto.Util.Padding import pad
from Crypto.Hash import MD5

def encrypt_content(content, password):
    # Hash the password with MD5
    key = MD5.new(password.encode('utf-8')).hexdigest().encode('utf-8')
    iv = key[:16]  # Use first 16 bytes of key as IV

    # Add validation string and encode
    content = "--- VALIDATION STRING ---"+content
    content_bytes = content.encode('utf-8')

    # Pad the content
    padded_content = pad(content_bytes, AES.block_size)

    # Encrypt
    cipher = AES.new(key, AES.MODE_CBC, iv)
    ct_bytes = cipher.encrypt(padded_content)

    # Encode to base64
    ct_base64 = base64.b64encode(ct_bytes).decode('utf-8')

    return ct_base64

def encrypt_frontmatter(frontmatter, password):
    encrypted_frontmatter = {}
    for key, value in frontmatter.items():
        if key in ['layout', 'date', 'hasEncryptedContent']:
            encrypted_frontmatter[key] = value
        elif isinstance(value, str):
            encrypted_frontmatter[key] = encrypt_content(value, password)
        else:
            encrypted_frontmatter[key] = value
    return encrypted_frontmatter

def process_file(file_path, password):
    with open(file_path, 'r') as file:
        content = file.read()

    frontmatter_pattern = r'^---\s*\n(.*?)\n---\s*\n'
    frontmatter_match = re.match(frontmatter_pattern, content, re.DOTALL)

    if frontmatter_match:
        frontmatter_content = frontmatter_match.group(1)
        frontmatter = yaml.safe_load(frontmatter_content)

        if frontmatter.get('hasEncryptedContent') == True:
            encrypted_frontmatter = encrypt_frontmatter(frontmatter, password)
            new_frontmatter = yaml.dump(encrypted_frontmatter, default_flow_style=False)
            content = re.sub(frontmatter_pattern, f'---\n{new_frontmatter}---\n', content, flags=re.DOTALL)

    pattern = r'{{< encrypt >}}(.*?){{< /encrypt >}}'

    def encrypt_match(match):
        original_content = match.group(1)
        encrypted_content = encrypt_content(original_content, password)
        return f'<div class="hugo-encryptor-container"><div class="hugo-encryptor-cipher-text">{encrypted_content}</div>'

    new_content = re.sub(pattern, encrypt_match, content, flags=re.DOTALL)

    with open(file_path, 'w') as file:
        file.write(new_content)

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
            if file.endswith(('.md', '.html')):  # Process Markdown and HTML files
                file_path = os.path.join(root, file)
                print(f"Processing file: {file_path}")
                process_file(file_path, password)

    print("Content encryption completed successfully.")

if __name__ == "__main__":
    main()