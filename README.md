# FILE ENCRYPTION & DECRYPTION UTILITY (locker.py) – COMPLETE EXPLANATION

![Python](https://img.shields.io/badge/Python-3.6+-blue.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)
![Platform](https://img.shields.io/badge/Platform-Windows%20%7C%20Linux%20%7C%20macOS-lightgrey.svg)
![Web App](https://img.shields.io/badge/Web_App-Live-brightgreen.svg)

> **Simple, educational file encryption tool using XOR and Base64 algorithms**

---

## 🌐 WEB VERSION AVAILABLE!

**🚀 Try it online without installation:**

👉 **[https://secure-vault.up.railway.app/](file-encryptor-wedversion-33-production.up.railway.app)**

- ✅ No installation required
- ✅ Works directly in browser
- ✅ Same encryption algorithms
- ✅ User-friendly interface
- ✅ Instant file encryption/decryption

**Or use the command-line version (instructions below)**

---

## 📋 Table of Contents

- [What Does This Program Do?](#1-what-does-this-program-do)
- [What is Encryption?](#2-what-is-encryption-easy-explanation)
- [Algorithms Overview](#4-three-magic-tricks-algorithms-overview)
- [How to Use](#10-how-to-use-the-program--commands)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Warnings & Safety](#11-warnings--safety-notes)
- [FAQ](#12-frequently-asked-questions)

## 🚀 Quick Start

```bash
# Encrypt a file
python locker.py --encrypt --algo xor+base64 --key "mypassword" --input secret.txt --output secret.enc

# Decrypt a file
python locker.py --decrypt --algo xor+base64 --key "mypassword" --input secret.enc --output secret.txt
```

## 📦 Installation

### Requirements

- Python 3.6 or higher
- Standard library only (no external dependencies)

### Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/file-encryptor.git
cd file-encryptor

# Test run
python locker.py --help
```

## ✨ Features

- ✅ **Multiple algorithms** - XOR, Base64, XOR+Base64
- ✅ **Any file type** - Images, videos, documents, executables
- ✅ **Simple CLI** - Easy to use command-line interface
- ✅ **Timestamped logs** - Track encryption/decryption operations
- ✅ **Error handling** - Comprehensive error messages
- ✅ **Cross-platform** - Works on Windows, Linux, macOS
- ✅ **No dependencies** - Pure Python, no external packages

---

## 1. WHAT DOES THIS PROGRAM DO?

### 1.1 Encryption (Locking)

* Take any file as input (photo, PDF, video, text… anything).
* Scramble its bytes using a password.
* Output is a **locked/encrypted file** that looks like random data.
* Cannot be opened without the correct password.

### 1.2 Decryption (Unlocking)

* Take a locked file as input.
* Apply the same password.
* Scrambled bytes are converted back to the original file — in perfect form.

**In simple words:**  
This program turns your files into invisible ink. Password = the revealing pen.

---

## 2. WHAT IS ENCRYPTION? (EASY EXPLANATION)

### 2.1 Secret Code Analogy

You and your friend want to pass secret notes in class.  
To confuse the teacher, you create a rule:

**Example:**  
Original → `MEET ME AFTER SCHOOL`  
Rule: Replace each letter with the next letter  
Encrypted → `NFFU NF BGUFS TDIPPM`

Only someone who knows the rule can understand. This is exactly the core idea of encryption.

---

## 3. COMPUTER FILES ARE MADE OF BYTES

Computers don't understand photos or documents as "photo" or "text" — they only understand **numbers (0–255)**.

* Byte = 1 number (0–255)
* 'A' → 65
* 'H' → 72
* Pixel (white) → 255
* "Hi" = `[72][105]`

**Every file = a sequence of millions of bytes.**

---

## 4. THREE MAGIC TRICKS (ALGORITHMS OVERVIEW)

The program supports 3 algorithms:

### 4.1 XOR

* Real encryption.
* Simple, fast, reversible.
* `Byte XOR keybyte = encrypted`
* `encrypted XOR keybyte = original`

### 4.2 Base64

* Not encryption, just encoding.
* Binary → safe text characters.
* Anyone can decode Base64.

### 4.3 XOR + BASE64

* First lock with XOR
* Then wrap with Base64
* Double-layer
* Best option for learning/practical use

---

## 5. ALGORITHM #1 — XOR (DETAILED)

### 5.1 Simple Explanation

XOR is a number-flip trick:

* Take a byte
* XOR it with a byte from the password
* Get a new number
* XOR the same byte with the same key again → get back the original

### 5.2 XOR Rules (Bitwise)

* 0 XOR 0 = 0
* 0 XOR 1 = 1
* 1 XOR 0 = 1
* 1 XOR 1 = 0

Same bits → 0  
Different → 1

### 5.3 Example

```
Byte: 137
Key: 49
137 XOR 49 = 184
184 XOR 49 = 137 (original)
```

### 5.4 File-Level XOR Process

Password `"CAT"` → bytes `[67][65][84]`  
These bytes **repeat** across every byte of the file:

```
File bytes:   137, 200, 89, 45, 176, ...
Key bytes:     67,  65, 84, 67,  65, ...
Result:       202, 137, 13, 110, 241, ...
```

This entire sequence becomes the encrypted file.

---

## 6. ALGORITHM #2 — BASE64 (THE PACKING TRICK)

### 6.1 Simple Explanation

Base64 is **not** encryption.  
It just converts binary data to text format — so data can be safely transferred/stored.

**Analogy:**  
You want to mail marbles through the post office, but the post only accepts letters.  
Base64 converts your marbles into letters.

### 6.2 Technical Breakdown

Base64 breaks 3 bytes (24 bits) into 4 groups (6 bits each).  
Each 6-bit group is converted to a character:

**Allowed characters:**

```
A–Z  a–z  0–9  +  /
```

### 6.3 Example: "Hi"

```
H → 72 → 01001000
i → 105 → 01101001

Combine →
01001000 01101001

Add padding →
01001000 01101001 00000000

Split into 6-bit groups →
010010 000110 100100 000000
→ 18, 6, 36, 0
→ S G k A

Final Base64 = SGk=
```

The `=` indicates that the last bytes were incomplete.

---

## 7. ALGORITHM #3 — XOR + BASE64 (THE DOUBLE LOCK)

### 7.1 Simple Explanation

Two locks together:

1. XOR → real encryption (scramble)
2. Base64 → packaging (text format)

**Analogy:**

* First lock the diary (XOR)
* Then wrap the box in brown paper (Base64)

**Unlock:**

* First remove the wrapping (Base64 decode)
* Then unlock the box (XOR decrypt)

### 7.2 Technical Pipeline

#### Encryption

```
Data → XOR Encrypt → Base64 Encode → Final Output
```

#### Decryption

```
Encrypted → Base64 Decode → XOR Decrypt → Original
```

### 7.3 Full Example

Byte: **137**  
Key "A" → byte 65

#### Encrypt

1. XOR  
   137 ⊕ 65 = 200

2. Base64  
   200 → "yAA="

**Final: "yAA="**

#### Decrypt

1. Base64 decode → 200
2. XOR → 200 ⊕ 65 = 137

**Original byte restored.**

---

## 8. COMPLETE WORKFLOW — FILE LOCK/UNLOCK

### 8.1 Encryption Workflow

#### Step 1: User Input

Example command:

```bash
python locker.py --encrypt --algo xor+base64 --key "secret" --input photo.jpg --output photo.enc
```

#### Step 2: Validation Checks

The program ensures:

* Mode selected (encrypt/decrypt)
* Algorithm is valid
* Input file exists
* Password is not empty

#### Step 3: Input File Read (Binary Mode)

File bytes are read:

```
[137, 200, 89, 45, 176, ...]
```

#### Step 4: Password → Bytes

```
"secret" → [115, 101, 99, 114, 101, 116]
```

#### Step 5: XOR Encryption

Each file byte is XORed with the corresponding key byte:

```
137 ⊕ 115 = 250
200 ⊕ 101 = 173
89  ⊕ 99  = 54
45  ⊕ 114 = 67
176 ⊕ 101 = 213
...
```

The key repeats throughout.

#### Step 6: Base64 Encoding

XOR output is converted to Base64.  
Size increases by ~33%.

#### Step 7: Output Write

Result is written to the output file:  
`photo.enc`

---

### 8.2 Decryption Workflow

#### Step 1: User Input

```bash
python locker.py --decrypt --algo xor+base64 --key "secret" --input photo.enc --output photo.jpg
```

#### Step 2: Validation

Same checks as encryption.

#### Step 3: Read Base64 File

Encrypted Base64 text is read.

#### Step 4: Base64 Decode

Raw XOR-encrypted bytes are obtained.

#### Step 5: Password → Bytes

Same conversion as before.

#### Step 6: XOR Decrypt

```
250 ⊕ 115 = 137
173 ⊕ 101 = 200
54  ⊕ 99  = 89
67  ⊕ 114 = 45
213 ⊕ 101 = 176
...
```

#### Step 7: Output Write

Original bytes are saved back to the file →  
`photo.jpg` is perfectly restored.

---

### 8.3 Algorithm Comparison

| Algorithm | Encryption? | Encoding? | Security | Use Case |
| --- | --- | --- | --- | --- |
| XOR | Yes | No | Medium | Fast, simple protection |
| Base64 | No | Yes | None | Packaging only |
| XOR+Base64 | Yes | Yes | Medium+ | Best practical choice |

---

### 8.4 File Size Impact

Base64 → **33%** size increase  

**Math reason:**  
3 bytes → 4 Base64 chars  
4/3 = 1.333 = +33%

---

## 9. CODE EXPLANATION — WHAT EACH PART DOES

### 9.1 Import Section

```python
import argparse
import base64
import sys
import os
from datetime import datetime
```

**What it does:**

* **argparse** → Parses command line arguments (e.g., `--encrypt`, `--algo`).
* **base64** → Provides Base64 encoding/decoding tools.
* **sys** → For program exit and error handling.
* **os** → File existence check, path operations.
* **datetime** → Timestamps for logs.

---

### 9.2 Log Function

```python
def log(message):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{timestamp}] {message}")
```

**What it does:**

* Adds a time-label before each message.
* Example output: `[2025-11-13 15:30:45] Encrypting using xor`

---

### 9.3 Read File Function

```python
def read_file(path):
    try:
        with open(path, 'rb') as f:
            return f.read()
    except FileNotFoundError:
        log(f"ERROR: Input file not found: {path}")
        sys.exit(1)
    except PermissionError:
        log(f"ERROR: Permission denied reading file: {path}")
        sys.exit(1)
    except Exception as e:
        log(f"ERROR: Failed to read file: {e}")
        sys.exit(1)
```

**What it does:**

* Opens file in **binary mode (rb)**.
* Reads and returns bytes.
* File missing / permission issue / read error → log + exit.

---

### 9.4 Write File Function

```python
def write_file(path, data):
    try:
        with open(path, 'wb') as f:
            f.write(data)
    except PermissionError:
        log(f"ERROR: Permission denied writing file: {path}")
        sys.exit(1)
    except Exception as e:
        log(f"ERROR: Failed to write file: {e}")
        sys.exit(1)
```

**What it does:**

* Opens/creates output file in **binary mode (wb)**.
* Writes bytes.
* Write failure → log + exit.

---

### 9.5 XOR Encrypt Function

```python
def xor_encrypt(data, key):
    if len(key) == 0:
        log("ERROR: Key cannot be empty")
        sys.exit(1)

    result = bytearray()
    key_len = len(key)

    for i, byte in enumerate(data):
        result.append(byte ^ key[i % key_len])

    return bytes(result)
```

**What it does:**

* Prevents using an empty password.
* XORs each byte of the file with the corresponding byte of the key.
* Modulo with key length (`i % key_len`) → key repeats.
* Returns final encrypted bytes.

---

### 9.6 XOR Decrypt Function

```python
def xor_decrypt(data, key):
    return xor_encrypt(data, key)
```

**What it does:**

* XOR is reversible → same function decrypts.
* Double XOR = original.

---

### 9.7 Base64 Encrypt Function

```python
def b64_encrypt(data):
    try:
        return base64.b64encode(data)
    except Exception as e:
        log(f"ERROR: Base64 encoding failed: {e}")
        sys.exit(1)
```

**What it does:**

* Converts raw bytes to Base64.
* On error, exits the program.

---

### 9.8 Base64 Decrypt Function

```python
def b64_decrypt(data):
    try:
        return base64.b64decode(data)
    except Exception as e:
        log("ERROR: Base64 decoding failed. Data may be corrupted...")
        sys.exit(1)
```

**What it does:**

* Converts Base64 text back to original bytes.
* Invalid Base64 → error.

---

### 9.9 Encrypt Data Function

```python
def encrypt_data(data, key, algo):
    if algo == 'xor':
        return xor_encrypt(data, key)
    elif algo == 'base64':
        return b64_encrypt(data)
    elif algo == 'xor+base64':
        xor_data = xor_encrypt(data, key)
        return b64_encrypt(xor_data)
    else:
        log(f"ERROR: Invalid algorithm: {algo}")
        sys.exit(1)
```

**What it does:**

Applies the correct steps based on the user's chosen algorithm.

**Flow:**

* xor → XOR only
* base64 → encoding only
* xor+base64 → XOR → Base64

---

### 9.10 Decrypt Data Function

```python
def decrypt_data(data, key, algo):
    if algo == 'xor':
        return xor_decrypt(data, key)
    elif algo == 'base64':
        return b64_decrypt(data)
    elif algo == 'xor+base64':
        b64_data = b64_decrypt(data)
        return xor_decrypt(b64_data, key)
    else:
        log(f"ERROR: Invalid algorithm: {algo}")
        sys.exit(1)
```

**What it does:**

Applies operations in reverse order:

* xor → XOR only
* base64 → decode only
* xor+base64 → Base64 decode → XOR decrypt

---

### 9.11 Validate Arguments Function

```python
def validate_args(args):
    if args.encrypt and args.decrypt:
        log("ERROR: Cannot specify both --encrypt and --decrypt.")
        sys.exit(1)

    if not args.encrypt and not args.decrypt:
        log("ERROR: Must specify either --encrypt or --decrypt.")
        sys.exit(1)

    valid_algos = ['xor', 'base64', 'xor+base64']
    if args.algo not in valid_algos:
        log(f"ERROR: Invalid algorithm '{args.algo}'...")
        sys.exit(1)
```

**What it does:**

Detects mistakes in user input:

* Both modes together? (error)
* Mode missing? (error)
* Invalid algorithm? (error)

---

### 9.12 Main Function

```python
def main():
    parser = argparse.ArgumentParser(...)
    parser.add_argument('--encrypt', action='store_true', ...)
    parser.add_argument('--decrypt', action='store_true', ...)
    parser.add_argument('--algo', required=True, ...)
    parser.add_argument('--key', required=True, ...)
    parser.add_argument('--input', required=True, ...)
    parser.add_argument('--output', required=True, ...)

    args = parser.parse_args()
    validate_args(args)

    key_bytes = args.key.encode('utf-8')
    mode = 'encryption' if args.encrypt else 'decryption'

    log(f"Starting {mode} using algorithm: {args.algo}")

    data = read_file(args.input)
    log(f"Read {len(data)} bytes from input file")

    if args.encrypt:
        result = encrypt_data(data, key_bytes, args.algo)
    else:
        result = decrypt_data(data, key_bytes, args.algo)

    write_file(args.output, result)
    log(f"SUCCESS: Output written to {args.output}")
```

**What it does? Step-by-step:**

1. Creates argument parser.
2. Defines flags.
3. Parses user input.
4. Calls validation.
5. Password → bytes.
6. Decides mode.
7. Reads input file.
8. Encrypts/decrypts the data.
9. Writes to output file.
10. Logs success.

---

### 9.13 Program Entry Point

```python
if __name__ == '__main__':
    main()
```

**What it does:**

* When you run `python locker.py`, the program starts here.

---

## 10. HOW TO USE THE PROGRAM — COMMANDS

### 10.1 Command Structure

```bash
python locker.py [MODE] --algo [ALGORITHM] --key [PASSWORD] --input [INPUT_FILE] --output [OUTPUT_FILE]
```

#### MODE

* `--encrypt`
* `--decrypt`

#### ALGORITHMS

* `xor`
* `base64`
* `xor+base64`

#### REQUIRED FIELDS

* `--key`
* `--input`
* `--output`

---

### 10.2 Encryption Examples

#### Example 1 — Simple XOR

```bash
python locker.py --encrypt --algo xor --key "mypassword" --input homework.txt --output homework.locked
```

#### Example 2 — Image with XOR+Base64

```bash
python locker.py --encrypt --algo xor+base64 --key "secret123" --input photo.jpg --output photo.enc
```

#### Example 3 — Base64 Only

```bash
python locker.py --encrypt --algo base64 --key "dummy" --input video.mp4 --output video.b64
```

(Note: In Base64, the key is irrelevant.)

---

### 10.3 Decryption Examples

#### Example 1 — XOR Unlock

```bash
python locker.py --decrypt --algo xor --key "mypassword" --input homework.locked --output homework.txt
```

#### Example 2 — XOR+Base64 Unlock

```bash
python locker.py --decrypt --algo xor+base64 --key "secret123" --input photo.enc --output photo.jpg
```

#### Example 3 — Base64 Unlock

```bash
python locker.py --decrypt --algo base64 --key "dummy" --input video.b64 --output video.mp4
```

---

### 10.4 Flags Explanation

| Flag | Purpose |
| --- | --- |
| `--encrypt` | Lock file |
| `--decrypt` | Unlock file |
| `--algo` | Select algorithm |
| `--key` | Password |
| `--input` | Input file |
| `--output` | Output file |

---

### 10.5 Common Mistakes

#### Mistake 1 — Both modes together

```bash
--encrypt --decrypt
```

**Error:** mode conflict

#### Mistake 2 — Invalid algorithm

```bash
--algo xor+xor
```

Allowed only:

* xor
* base64
* xor+base64

#### Mistake 3 — Input file doesn't exist

File missing → program exits.

#### Mistake 4 — Wrong password during decryption

File becomes garbage.

---

## 11. WARNINGS & SAFETY NOTES

### 11.1 Password Recovery Impossible

Password forgotten = File permanently locked

No recovery possible.

---

### 11.2 XOR Limitations

* Good for beginners
* **NOT SAFE** for professional security

---

### 11.3 Base64 Is Not Encryption

* Just encoding
* Anyone can decode

---

### 11.4 Wrong Password Impact

No warning for decrypt failure — just corrupted data.

---

### 11.5 File Size Increase

Base64 → **33%** size increase

**Reason:**  
3 bytes → 4 Base64 chars

---

### 11.6 No Manual Editing

Manual editing of encrypted files = guaranteed corruption

Base64 decode will fail.

---

### 11.7 Learning Purpose Only

For real secrets, use:

* AES-256
* VeraCrypt
* GnuPG
* 7-Zip AES

---

## 12. FREQUENTLY ASKED QUESTIONS

### 12.1 Why won't Windows open encrypted files?

Because the file is now random bytes, not a valid format.

---

### 12.2 What happens with wrong password?

Random junk — corrupted output.

---

### 12.3 How is XOR reversible?

Math rule:

```
A XOR B XOR B = A
```

---

### 12.4 Can Base64 be decoded without password?

Yes. Base64 ≠ encryption.

---

### 12.5 What file types can be encrypted?

All:

* jpg/png
* mp4/mkv
* pdf/docx/txt
* zip/rar
* exe
* mp3/wav

Reason: everything is bytes.

---

### 12.6 How much security does it provide?

* XOR → medium
* Base64 → zero
* XOR+Base64 → medium+
* Real encryption → AES

---

### 12.7 Can I encrypt the same file multiple times?

Yes, but complexity increases.  
Must decrypt in reverse order.

---

### 12.8 What if I skip output filename?

Program error: `--output required`.

---

### 12.9 What if I manually edit the encrypted file?

Corruption guaranteed.

---

### 12.10 How fast is the program?

Approximately:

* 1 MB → 0.1 sec
* 10 MB → 1 sec
* 100 MB → 10 sec

XOR + Base64 are both fast operations.

---

## 13. FINAL SUMMARY

### 13.1 Program Overview

* Scrambles files using a password
* Restores them to original form

---

### 13.2 Algorithms Summary

* **XOR:** basic encryption, reversible
* **Base64:** encoding only
* **XOR+Base64:** double-layer, best of both

---

### 13.3 Key Points

* Forgetting password = file loss
* Use same algorithm + same key
* Base64 ≠ encryption
* Wrong key = junk output
* This tool is for **learning & basic protection**

---

### 13.4 Target Audience

* Students
* Beginners
* Portfolio projects
* Cryptography basics
* College assignments

---

## 14. TROUBLESHOOTING

### 14.1 Common Issues

#### Problem: "ModuleNotFoundError"

```bash
Solution: Install Python properly (version 3.6+)
```

#### Problem: "Permission denied"

```bash
Solution: Run the file with administrator/root access
```

#### Problem: Decrypted file is corrupt

**Possible reasons:**

* Used wrong password
* Used wrong algorithm
* Encrypted file was manually edited
* File was incompletely copied

**Solution:** Use the same password and algorithm that was used for encryption

#### Problem: File size increased too much

```
Using Base64 algorithm increases size by 33%.
Use XOR-only if size is important.
```

---

## 15. CONTRIBUTING

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Code Style

- Follow PEP 8 guidelines
- Add docstrings
- Comments in English acceptable

---

## 16. PROJECT STRUCTURE

```
file-encryptor/
│
├── locker.py           # Main encryption/decryption script
├── README.md           # Complete documentation (Hindi/English mix)
├── readme01.md         # Complete documentation (Pure English)
├── jmhvhjgvc.md       # Additional documentation
└── examples/           # Example files (optional)
    ├── test.txt
    ├── test.enc
    └── demo.jpg
```

---

## 17. TECHNICAL SPECIFICATIONS

### Supported Python Versions

- Python 3.6+
- Python 3.7
- Python 3.8
- Python 3.9
- Python 3.10
- Python 3.11
- Python 3.12

### Dependencies

**Built-in modules only:**

- `argparse` - CLI parsing
- `base64` - Base64 encoding/decoding
- `sys` - System operations
- `os` - File operations
- `datetime` - Timestamps

### Performance Benchmarks

| File Size | Algorithm | Time (approx) |
| --- | --- | --- |
| 1 KB | XOR | < 0.01 sec |
| 1 MB | XOR | 0.1 sec |
| 10 MB | XOR | 1 sec |
| 100 MB | XOR | 10 sec |
| 1 MB | XOR+Base64 | 0.15 sec |
| 10 MB | XOR+Base64 | 1.5 sec |

---

## 18. SECURITY DISCLAIMER

⚠️ **IMPORTANT SECURITY NOTICE** ⚠️

This tool was created for **educational purposes**:

- ❌ **DO NOT** use in production environments
- ❌ **DO NOT** encrypt sensitive data (passwords, financial info, personal data) with this
- ❌ **NOT SUITABLE** for professional security

### Production-grade alternatives:

- **AES-256** - Industry standard symmetric encryption
- **GPG/PGP** - Asymmetric encryption
- **VeraCrypt** - Full disk encryption
- **7-Zip (AES-256)** - File/archive encryption
- **OpenSSL** - Cryptographic toolkit

---

## 19. LICENSE

```
MIT License

Copyright (c) 2025 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 20. CONTACT & SUPPORT

### Bug Reports

Found a bug? [Create an issue](https://github.com/yourusername/file-encryptor/issues)

### Questions

- GitHub Discussions
- Email: your.email@example.com
- Twitter: @yourhandle

---

## 21. CHANGELOG

### Version 1.0.0 (Current)

- ✅ Initial release
- ✅ XOR encryption support
- ✅ Base64 encoding support
- ✅ Combined XOR+Base64 support
- ✅ CLI interface
- ✅ Error handling
- ✅ Timestamped logs

### Planned Features (Future)

- 🔄 AES encryption support
- 🔄 GUI interface
- 🔄 Batch file encryption
- 🔄 Progress bar for large files
- 🔄 Password strength checker
- 🔄 File integrity verification (checksums)

---

## 22. ACKNOWLEDGMENTS

**Inspired by:**

- Classic XOR cipher implementations
- Python cryptography tutorials
- Open-source encryption tools

**Built with:**

- 💻 Python
- ❤️ Love for cryptography
- 📚 Educational intent

---

**Made with ❤️ for learning and education**

⭐ Star this repo if you found it helpful!
