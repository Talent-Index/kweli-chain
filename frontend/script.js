// Kwelichain App JavaScript
class KwelichainApp {
    constructor() {
        this.currentPage = 'landing';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupAnimations();
        this.setupFileUploads();
        this.setupVerification();
    }

    setupEventListeners() {
        // Navigation
        this.setupNavigation();
        
        // Page switching
        this.setupPageSwitching();
        
        // Mobile menu
        this.setupMobileMenu();
        
        // Button interactions
        this.setupButtonInteractions();
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.getAttribute('href').substring(1);
                this.switchPage(target);
            });
        });
    }

    setupPageSwitching() {
        // Hero action buttons
        const verifyBtn = document.querySelector('.hero-actions .btn-success');
        const loginBtn = document.querySelector('.hero-actions .btn-primary');
        
        if (verifyBtn) {
            verifyBtn.addEventListener('click', () => {
                this.switchPage('verifier');
            });
        }
        
        if (loginBtn) {
            loginBtn.addEventListener('click', () => {
                this.switchPage('dashboard');
            });
        }

        // Quick navigation buttons
        const quickNavButtons = document.querySelectorAll('[data-page]');
        quickNavButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const page = btn.getAttribute('data-page');
                this.switchPage(page);
            });
        });
    }

    setupMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');
        const sidebar = document.querySelector('.sidebar');

        if (hamburger) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navLinks.classList.toggle('active');
            });
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }

    setupButtonInteractions() {
        // Add hover effects to all buttons
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'translateY(-2px)';
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translateY(0)';
            });
        });

        // Certificate action buttons
        this.setupCertificateActions();
    }

    setupCertificateActions() {
        // QR Code buttons
        const qrButtons = document.querySelectorAll('[data-action="qr"]');
        qrButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showQRCode();
            });
        });

        // Share buttons
        const shareButtons = document.querySelectorAll('[data-action="share"]');
        shareButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.shareCertificate();
            });
        });

        // Revoke buttons
        const revokeButtons = document.querySelectorAll('[data-action="revoke"]');
        revokeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.revokeCertificate(btn);
            });
        });
    }

    setupFileUploads() {
        const uploadAreas = document.querySelectorAll('.upload-area, .upload-zone');
        
        uploadAreas.forEach(area => {
            // Drag and drop
            area.addEventListener('dragover', (e) => {
                e.preventDefault();
                area.classList.add('dragover');
            });

            area.addEventListener('dragleave', () => {
                area.classList.remove('dragover');
            });

            area.addEventListener('drop', (e) => {
                e.preventDefault();
                area.classList.remove('dragover');
                const files = e.dataTransfer.files;
                this.handleFileUpload(files);
            });

            // Click to upload
            area.addEventListener('click', () => {
                const input = document.createElement('input');
                input.type = 'file';
                input.accept = '.pdf,.png,.jpg,.jpeg';
                input.onchange = (e) => {
                    this.handleFileUpload(e.target.files);
                };
                input.click();
            });
        });
    }

    setupVerification() {
        const verifyHashBtn = document.querySelector('.hash-input .btn-success');
        if (verifyHashBtn) {
            verifyHashBtn.addEventListener('click', () => {
                this.verifyHash();
            });
        }

        const scanQRBtn = document.querySelector('[data-action="scan-qr"]');
        if (scanQRBtn) {
            scanQRBtn.addEventListener('click', () => {
                this.scanQRCode();
            });
        }
    }

    setupAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll('.feature-card, .certificate-card, .stat-card');
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    switchPage(page) {
        // Hide all pages
        const pages = document.querySelectorAll('.landing-page, .dashboard-page, .student-page, .verifier-page');
        pages.forEach(p => p.style.display = 'none');

        // Show target page
        let targetPage;
        switch(page) {
            case 'dashboard':
                targetPage = document.getElementById('dashboardPage');
                break;
            case 'students':
                targetPage = document.getElementById('studentPage');
                break;
            case 'verify':
                targetPage = document.getElementById('verifierPage');
                break;
            default:
                targetPage = document.querySelector('.landing-page');
        }

        if (targetPage) {
            targetPage.style.display = 'block';
            this.currentPage = page;
            
            // Add entrance animation
            targetPage.classList.add('animate-slide-in-right');
            setTimeout(() => {
                targetPage.classList.remove('animate-slide-in-right');
            }, 600);
        }
    }

    handleFileUpload(files) {
        if (files.length === 0) return;

        const file = files[0];
        console.log('File uploaded:', file.name);

        // Show loading state
        this.showLoadingState();

        // Simulate file processing
        setTimeout(() => {
            this.hideLoadingState();
            
            if (this.currentPage === 'verifier') {
                this.showVerificationResult(true);
            } else {
                this.showUploadSuccess();
            }
        }, 2000);
    }

    verifyHash() {
        const hashInput = document.querySelector('.hash-field');
        const hash = hashInput.value.trim();

        if (!hash) {
            this.showNotification('Please enter a certificate hash', 'warning');
            return;
        }

        this.showLoadingState();
        
        // Simulate verification
        setTimeout(() => {
            this.hideLoadingState();
            this.showVerificationResult(true);
        }, 1500);
    }

    showVerificationResult(isValid) {
        const resultContainer = document.getElementById('verificationResult');
        if (!resultContainer) return;

        const resultCard = resultContainer.querySelector('.result-card');
        
        if (isValid) {
            resultCard.className = 'result-card result-success';
            resultCard.querySelector('.result-icon i').className = 'fas fa-check-circle';
            resultCard.querySelector('h3').textContent = 'Certificate Verified ✅';
        } else {
            resultCard.className = 'result-card result-error';
            resultCard.querySelector('.result-icon i').className = 'fas fa-times-circle';
            resultCard.querySelector('h3').textContent = 'Certificate Invalid ❌';
        }

        resultContainer.style.display = 'block';
        resultContainer.classList.add('animate-fade-in-up');
    }

    showQRCode() {
        // Create QR code modal
        const modal = this.createModal('QR Code', `
            <div class="qr-code-container">
                <div class="qr-code">
                    <i class="fas fa-qrcode" style="font-size: 120px; color: var(--primary-blue);"></i>
                </div>
                <p>Scan this QR code to verify the certificate</p>
                <button class="btn btn-primary" onclick="this.closest('.modal').remove()">Close</button>
            </div>
        `);
        
        document.body.appendChild(modal);
    }

    shareCertificate() {
        if (navigator.share) {
            navigator.share({
                title: 'My Certificate',
                text: 'Check out my verified certificate on Kwelichain',
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href).then(() => {
                this.showNotification('Certificate link copied to clipboard!', 'success');
            });
        }
    }

    revokeCertificate(button) {
        if (confirm('Are you sure you want to revoke this certificate? This action cannot be undone.')) {
            // Simulate revocation
            button.closest('tr').style.opacity = '0.5';
            button.textContent = 'Revoked';
            button.disabled = true;
            button.classList.remove('btn-danger');
            button.classList.add('btn-outline');
            
            this.showNotification('Certificate has been revoked', 'success');
        }
    }

    scanQRCode() {
        this.showNotification('QR scanner would open here', 'info');
    }

    showLoadingState() {
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'loading-overlay';
        loadingOverlay.innerHTML = `
            <div class="loading-spinner">
                <div class="spinner"></div>
                <p>Processing...</p>
            </div>
        `;
        
        document.body.appendChild(loadingOverlay);
    }

    hideLoadingState() {
        const loadingOverlay = document.querySelector('.loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.remove();
        }
    }

    showUploadSuccess() {
        this.showNotification('Certificate uploaded successfully!', 'success');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Auto remove
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'times-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    createModal(title, content) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    ${content}
                </div>
            </div>
        `;
        
        // Close modal handlers
        modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
        modal.querySelector('.modal-overlay').addEventListener('click', () => modal.remove());
        
        return modal;
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new KwelichainApp();
});

// Add CSS for loading states and notifications
const additionalStyles = `
.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.loading-spinner {
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    text-align: center;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid var(--primary-blue);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    border-radius: 0.75rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--gray-200);
    padding: 1rem;
    z-index: 1000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
}

.notification.show {
    transform: translateX(0);
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.notification-success {
    border-left: 4px solid var(--success);
}

.notification-error {
    border-left: 4px solid var(--error);
}

.notification-warning {
    border-left: 4px solid var(--warning);
}

.notification-info {
    border-left: 4px solid var(--info);
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
}

.modal-content {
    background: white;
    border-radius: 1rem;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    position: relative;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid var(--gray-200);
}

.modal-close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--gray-500);
}

.modal-body {
    padding: 1.5rem;
}

.qr-code-container {
    text-align: center;
}

.qr-code {
    margin-bottom: 1rem;
}

.dragover {
    border-color: var(--primary-blue) !important;
    background: var(--gray-50) !important;
}

.hamburger.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
}

.hamburger.active span:nth-child(2) {
    opacity: 0;
}

.hamburger.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
}

@media (max-width: 768px) {
    .nav-links {
        position: fixed;
        top: 70px;
        left: 0;
        right: 0;
        background: white;
        border-top: 1px solid var(--gray-200);
        flex-direction: column;
        padding: 1rem;
        transform: translateY(-100%);
        transition: transform 0.3s ease;
    }
    
    .nav-links.active {
        transform: translateY(0);
    }
}
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
