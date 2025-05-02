// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Navbar scroll behavior
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        // Toggle menu icon
        const spans = menuToggle.querySelectorAll('span');
        if (mobileMenu.classList.contains('hidden')) {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        } else {
            spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        }
    });
    
    // Function to toggle mobile menu
    window.toggleMobileMenu = function() {
        menuToggle.click();
    };
    
    // Smooth scroll to sections
    window.scrollToSection = function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            // Close mobile menu if open
            if (!mobileMenu.classList.contains('hidden')) {
                toggleMobileMenu();
            }
        }
    };
    
    // Agenda tabs functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all tabs
            tabBtns.forEach(tab => tab.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all day content
            const dayId = this.getAttribute('data-day');
            document.querySelectorAll('.day-schedule').forEach(day => {
                day.classList.add('hidden');
            });
            
            // Show selected day content
            document.getElementById(dayId + '-content').classList.remove('hidden');
        });
    });
    
    // View more schedule functionality
    const viewMoreBtns = document.querySelectorAll('.view-more');
    viewMoreBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const dayId = this.getAttribute('data-day');
            const dayContent = document.getElementById(dayId + '-content');
            
            // Get all schedule items for this day
            const items = dayContent.querySelectorAll('.schedule-item');
            
            // If showing limited items, show all. Otherwise, hide extras
            if (this.textContent === 'View Full Schedule') {
                // Create more items if needed (in a real app, these would be loaded from data)
                if (items.length <= 5) {
                    const daySchedule = dayContent.querySelector('.day-schedule');
                    
                    // Add some sample extra items
                    for (let i = 0; i < 3; i++) {
                        const clone = items[0].cloneNode(true);
                        const titleEl = clone.querySelector('h3');
                        if (titleEl) {
                            titleEl.textContent = `Additional Session ${i + 1}`;
                        }
                        dayContent.insertBefore(clone, this.parentElement);
                    }
                }
                
                this.textContent = 'Show Less';
            } else {
                // Hide items beyond the first 5
                this.textContent = 'View Full Schedule';
                
                // In a real implementation, we would remove the extra items or hide them
                // For this demo, we'll just update the button text
            }
        });
    });
    
    // Form submission handling
    const registrationForm = document.getElementById('registration-form');
    const registrationSuccess = document.getElementById('registration-success');
    
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Form validation
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const ticketType = document.getElementById('ticketType').value;
        
        if (!firstName || !lastName || !email || !ticketType) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Simulate form submission
        const formContainer = document.querySelector('.registration-container');
        const registrationFooter = document.querySelector('.registration-footer');
        
        // Show loading state
        registrationForm.querySelector('button[type="submit"]').textContent = 'Processing...';
        
        // Simulate API call with timeout
        setTimeout(() => {
            // Hide form and show success message
            formContainer.style.display = 'none';
            registrationFooter.style.display = 'none';
            registrationSuccess.classList.remove('hidden');
            
            // Scroll to success message
            registrationSuccess.scrollIntoView({ behavior: 'smooth' });
        }, 1500);
    });
    
    // Handle fragment navigation if URL has a hash on page load
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1); // Remove the # character
        setTimeout(() => {
            scrollToSection(targetId);
        }, 500);
    }
});