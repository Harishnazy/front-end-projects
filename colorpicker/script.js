const uploadBox = document.getElementById('uploadBox');
        const imageInput = document.getElementById('imageInput');
        const previewImage = document.getElementById('previewImage');
        const imageContainer = document.getElementById('imageContainer');
        const colorDisplay = document.getElementById('colorDisplay');
        const hexValue = document.getElementById('hexValue');
        const rgbValue = document.getElementById('rgbValue');
        const hslValue = document.getElementById('hslValue');
        const rgbaValue = document.getElementById('rgbaValue');
        const historyContainer = document.getElementById('history');
        const historyColors = document.getElementById('historyColors');
        const copyButtons = document.querySelectorAll('.copy-btn');
        const colorCursor = document.getElementById('colorCursor');
        const colorPreview = document.getElementById('colorPreview');
        const colorPreviewSwatch = document.getElementById('colorPreviewSwatch');

        let colorHistory = [];

        // Upload handlers
        uploadBox.addEventListener('click', () => imageInput.click());

        uploadBox.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadBox.classList.add('dragover');
        });

        uploadBox.addEventListener('dragleave', () => {
            uploadBox.classList.remove('dragover');
        });

        uploadBox.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadBox.classList.remove('dragover');
            const files = e.dataTransfer.files;
            if (files[0]) handleImageUpload(files[0]);
        });

        imageInput.addEventListener('change', (e) => {
            if (e.target.files[0]) handleImageUpload(e.target.files[0]);
        });

        function handleImageUpload(file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                previewImage.src = e.target.result;
                previewImage.classList.add('active');
            };
            reader.readAsDataURL(file);
        }

        // Click to pick color
        previewImage.addEventListener('click', (e) => {
            const rect = previewImage.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            pickColor(x, y);
        });

        // Mouse move for cursor and preview
        imageContainer.addEventListener('mousemove', (e) => {
            if (!previewImage.classList.contains('active')) return;
            
            const rect = previewImage.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Check if within image bounds
            if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
                colorCursor.classList.remove('active');
                return;
            }
            
            // Position cursor at mouse coordinates (fixed positioning)
            colorCursor.style.left = e.clientX + 'px';
            colorCursor.style.top = e.clientY + 'px';
            colorCursor.classList.add('active');
            
            // Get preview color
            getPreviewColor(x, y);
        });

        imageContainer.addEventListener('mouseleave', () => {
            colorCursor.classList.remove('active');
        });

        function getPreviewColor(x, y) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = previewImage.naturalWidth;
            canvas.height = previewImage.naturalHeight;
            ctx.drawImage(previewImage, 0, 0);

            const scaleX = previewImage.naturalWidth / previewImage.width;
            const scaleY = previewImage.naturalHeight / previewImage.height;
            const imageData = ctx.getImageData(x * scaleX, y * scaleY, 1, 1);
            const data = imageData.data;

            const previewColor = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${(data[3] / 255).toFixed(2)})`;
            colorPreviewSwatch.style.backgroundColor = previewColor;
            colorPreview.classList.add('active');
        }

        function pickColor(x, y) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = previewImage.naturalWidth;
            canvas.height = previewImage.naturalHeight;
            ctx.drawImage(previewImage, 0, 0);

            const scaleX = previewImage.naturalWidth / previewImage.width;
            const scaleY = previewImage.naturalHeight / previewImage.height;
            const imageData = ctx.getImageData(x * scaleX, y * scaleY, 1, 1);
            const data = imageData.data;

            const r = data[0], g = data[1], b = data[2], a = data[3] / 255;
            updateColorDisplay(r, g, b, a);
        }

        function updateColorDisplay(r, g, b, a) {
            const hex = '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0').toUpperCase()).join('');
            const rgb = `rgb(${r}, ${g}, ${b})`;
            const rgba = `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`;
            const hsl = rgbToHsl(r, g, b);

            hexValue.textContent = hex;
            rgbValue.textContent = rgb;
            hslValue.textContent = hsl;
            rgbaValue.textContent = rgba;
            colorDisplay.style.backgroundColor = rgba;

            addToHistory(hex, rgba);
        }

        function rgbToHsl(r, g, b) {
            r /= 255, g /= 255, b /= 255;
            const max = Math.max(r, g, b), min = Math.min(r, g, b);
            let h, s, l = (max + min) / 2;

            if (max === min) {
                h = s = 0;
            } else {
                const d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
                    case g: h = ((b - r) / d + 2) / 6; break;
                    case b: h = ((r - g) / d + 4) / 6; break;
                }
            }

            return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
        }

        function addToHistory(hex, rgba) {
            if (!colorHistory.includes(hex)) {
                colorHistory.unshift(hex);
                if (colorHistory.length > 10) colorHistory.pop();
                updateHistoryDisplay();
            }
        }

        function updateHistoryDisplay() {
            if (colorHistory.length > 0) {
                historyContainer.classList.add('active');
                historyColors.innerHTML = colorHistory.map(hex => 
                    `<div class="history-color" style="background-color: ${hex}" title="${hex}"></div>`
                ).join('');

                document.querySelectorAll('.history-color').forEach(el => {
                    el.addEventListener('click', () => {
                        const hex = el.getAttribute('title');
                        hexValue.textContent = hex;
                        colorDisplay.style.backgroundColor = hex;
                    });
                });
            }
        }

        // Copy functionality
        copyButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const type = btn.getAttribute('data-copy');
                let text = '';
                switch(type) {
                    case 'hex': text = hexValue.textContent; break;
                    case 'rgb': text = rgbValue.textContent; break;
                    case 'hsl': text = hslValue.textContent; break;
                    case 'rgba': text = rgbaValue.textContent; break;
                }
                navigator.clipboard.writeText(text).then(() => {
                    const feedback = btn.nextElementSibling;
                    feedback.textContent = '✓ Copied!';
                    feedback.classList.add('show');
                    setTimeout(() => feedback.classList.remove('show'), 2000);
                });
            });
        });

        // Initialize with white
        updateColorDisplay(255, 255, 255, 1);