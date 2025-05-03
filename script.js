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
    
    
    
    
    
    // Form submission handling
    const form = document.getElementById('registration-form');

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
  
      const data = {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        email: document.getElementById('email').value.trim(),
        company: document.getElementById('company').value.trim(),
        comapnyurl: document.getElementById('comapnyurl').value.trim(),
        marketingConsent: document.getElementById('marketingConsent').checked
      };
  
      try {
        const response = await fetch('http://localhost:5050/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
  
        const result = await response.json();
  
        if (response.ok && result.success) {
          Swal.fire({
            icon: 'success',
            title: 'Registration Complete!',
            text: 'Thank you for registering. A confirmation email has been sent.',
            confirmButtonText: 'Awesome!'
          }).then(() => {
            form.reset();
            document.querySelector('.registration-form-container').style.display = 'none';
            document.getElementById('registration-success').classList.remove('hidden');
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: result.message || 'Something went wrong. Please try again later.',
          });
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Server Error',
          text: 'Unable to connect to the server. Please try again later.',
        });
      }
    });
});