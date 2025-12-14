// Main JavaScript for SATNER Portfolio
document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // MOBILE NAVIGATION MENU
    // ======================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mainNav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('.main-nav a');
    
    // Mobile menu toggle
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            mainNav.classList.toggle('active');
            
            // Change hamburger to X and vice versa
            const icon = this.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = ''; // Re-enable scrolling
            }
        });
        
        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mainNav.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                document.body.style.overflow = '';
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mainNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mainNav.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });
    }
    
    // ======================
    // HEADER SCROLL EFFECT
    // ======================
    const header = document.getElementById('main-header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // ======================
    // ACTIVE NAV LINK ON SCROLL
    // ======================
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // ======================
    // HERO VIDEO CONTROLS
    // ======================
    const heroVideo = document.getElementById('hero-video');
    const videoControl = document.getElementById('video-control');
    const volumeIcon = document.getElementById('volume-icon');
    
    if (videoControl && heroVideo) {
        videoControl.addEventListener('click', function() {
            if (heroVideo.muted) {
                heroVideo.muted = false;
                volumeIcon.classList.remove('fa-volume-mute');
                volumeIcon.classList.add('fa-volume-up');
                this.title = 'Mute Video';
            } else {
                heroVideo.muted = true;
                volumeIcon.classList.remove('fa-volume-up');
                volumeIcon.classList.add('fa-volume-mute');
                this.title = 'Unmute Video';
            }
        });
        
        // Handle video error and show fallback
        heroVideo.addEventListener('error', function() {
            document.querySelector('.hero-section').classList.add('no-video');
            videoControl.style.display = 'none';
        });
    }
    
    // ======================
    // CONTACT VIDEO CONTROLS
    // ======================
    const contactVideo = document.getElementById('contact-video');
    const contactVideoControl = document.getElementById('contact-video-control');
    const contactVolumeIcon = document.getElementById('contact-volume-icon');
    
    if (contactVideoControl && contactVideo) {
        contactVideoControl.addEventListener('click', function() {
            if (contactVideo.muted) {
                contactVideo.muted = false;
                contactVolumeIcon.classList.remove('fa-volume-mute');
                contactVolumeIcon.classList.add('fa-volume-up');
                this.title = 'Mute Video';
            } else {
                contactVideo.muted = true;
                contactVolumeIcon.classList.remove('fa-volume-up');
                contactVolumeIcon.classList.add('fa-volume-mute');
                this.title = 'Unmute Video';
            }
        });
        
        // Handle contact video error
        contactVideo.addEventListener('error', function() {
            document.querySelector('.contact-section').classList.add('no-contact-video');
            contactVideoControl.style.display = 'none';
        });
    }
    
    // ======================
    // DOWNLOAD CV BUTTON
    // ======================
    const downloadCVBtn = document.getElementById('download-cv-btn');
    
    if (downloadCVBtn) {
        downloadCVBtn.addEventListener('click', function(e) {
            // Check if the CV file exists
            const cvPath = this.getAttribute('href');
            
            // Show toast notification
            showDownloadToast();
            
            // Prevent default if it's a placeholder link
            if (cvPath === '#' || cvPath.includes('#')) {
                e.preventDefault();
                showDownloadToast();
            }
        });
    }
    
    function showDownloadToast() {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = 'download-toast';
        toast.innerHTML = `
            <i class="fas fa-file-download"></i>
            <span>Downloading CV...</span>
        `;
        
        document.body.appendChild(toast);
        
        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }
    
    // ======================
    // BACK TO TOP BUTTON
    // ======================
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
        
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ======================
    // CONTACT FORM HANDLING
    // ======================
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields (Name, Email, Message)');
                return;
            }
            
            // Email validation regex
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For now, we'll just show a success message
            alert(`Thank you for your message, ${name}! I'll get back to you soon at ${email}.`);
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // ======================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ======================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ======================
    // INITIAL SETUP
    // ======================
    // Add 'show' class to back to top button if needed
    if (backToTopBtn && window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    }
    
    // Add CSS for back to top button if not in your CSS
    if (!document.querySelector('#back-to-top-style')) {
        const style = document.createElement('style');
        style.id = 'back-to-top-style';
        style.textContent = `
            .back-to-top-btn {
                position: fixed;
                bottom: 30px;
                right: 30px;
                width: 50px;
                height: 50px;
                background: var(--primary);
                color: white;
                border: none;
                border-radius: 50%;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.2rem;
                opacity: 0;
                visibility: hidden;
                transform: translateY(20px);
                transition: all 0.3s ease;
                z-index: 999;
                box-shadow: 0 4px 15px rgba(123, 97, 255, 0.3);
            }
            
            .back-to-top-btn.show {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
            }
            
            .back-to-top-btn:hover {
                background: var(--primary-dark);
                transform: translateY(-5px);
                box-shadow: 0 8px 20px rgba(123, 97, 255, 0.4);
            }
        `;
        document.head.appendChild(style);
    }
});
