// File Upload Logic
document.getElementById('dropZone').addEventListener('click', function (e) {
    if (e.target.id !== 'clearFilesBtn' && e.target.id !== 'folderUploadLink') {
        document.getElementById('id_file').click();
    }
});

document.getElementById('folderUploadLink').addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    document.getElementById('id_folder').click();
});

document.getElementById('id_folder').addEventListener('change', function (e) {
    if (this.files.length > 0) {
        // Extract folder name from the first file's relative path
        // webkitRelativePath format: "FolderName/FileName.ext"
        const relativePath = this.files[0].webkitRelativePath;
        if (relativePath) {
            const folderName = relativePath.split('/')[0];
            document.getElementById('id_folder_name').value = folderName;
        }
    }
});

// General Page Logic
document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById('id_file');
    const folderInput = document.getElementById('id_folder');
    const dropZone = document.getElementById('dropZone');
    const fileList = document.getElementById('fileList');
    const clearFilesBtn = document.getElementById('clearFilesBtn');
    const lockerForm = document.getElementById('lockerForm');

    if (lockerForm) {
        lockerForm.addEventListener('submit', function (e) {
            const fileCount = fileInput ? fileInput.files.length : 0;
            const folderCount = folderInput ? folderInput.files.length : 0;
            // alert(`DEBUG: Submitting form. Files: ${fileCount}, Folder files: ${folderCount}`);
        });
    }

    function handleFiles(files) {
        updateFileList(files);
    }

    // Handle file selection
    if (fileInput) {
        fileInput.addEventListener('change', function (e) {
            handleFiles(this.files);
        });
    }

    if (folderInput) {
        folderInput.addEventListener('change', function (e) {
            handleFiles(this.files);
        });
    }

    // Drag and drop effects
    let dragCounter = 0;

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    dropZone.addEventListener('dragenter', function (e) {
        dragCounter++;
        dropZone.classList.add('drag-over');
    });

    dropZone.addEventListener('dragleave', function (e) {
        dragCounter--;
        if (dragCounter <= 0) {
            dragCounter = 0;
            dropZone.classList.remove('drag-over');
        }
    });

    dropZone.addEventListener('drop', function (e) {
        dragCounter = 0;
        dropZone.classList.remove('drag-over');

        const dt = e.dataTransfer;
        const files = dt.files;

        // For drag and drop, we'll use the file input
        if (fileInput) {
            fileInput.files = files;
            handleFiles(files);
        }
    });

    function updateFileList(files) {
        if (files.length > 0) {
            // Show first few files
            const maxDisplay = 3;
            let names = Array.from(files).slice(0, maxDisplay).map(f => f.name).join(', ');
            if (files.length > maxDisplay) {
                names += `, and ${files.length - maxDisplay} more`;
            }

            fileList.textContent = `Selected: ${names}`;
            document.querySelector('.upload-text').textContent = `${files.length} item(s) selected`;
            if (clearFilesBtn) clearFilesBtn.style.display = 'inline-block';
        } else {
            fileList.textContent = '';
            document.querySelector('.upload-text').textContent = 'Click to upload files or drag and drop';
            if (clearFilesBtn) clearFilesBtn.style.display = 'none';
        }
    }

    if (clearFilesBtn) {
        clearFilesBtn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            if (fileInput) fileInput.value = '';
            if (folderInput) folderInput.value = '';
            updateFileList([]);
        });
    }

    // Password visibility toggle
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('id_key');

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function (e) {
            // toggle the type attribute
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);

            // toggle the eye icon
            if (type === 'text') {
                this.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye-off"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;
            } else {
                this.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-eye"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
            }
        });
    }
});
