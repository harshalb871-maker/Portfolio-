// Mobile menu toggle with improved functionality
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navList = document.getElementById("navList");
const navLinks = document.querySelectorAll(".nav-list a");
const header = document.getElementById("header");
const themeToggle = document.getElementById("theme-toggle");
const currentTheme = localStorage.getItem("theme");

// Check for saved user preference
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);
}

themeToggle.addEventListener("click", () => {
  let theme = document.documentElement.getAttribute("data-theme");

  if (theme === "dark") {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  }
});

mobileMenuBtn.addEventListener("click", () => {
  navList.classList.toggle("active");
  mobileMenuBtn.innerHTML = navList.classList.contains("active")
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navList.classList.remove("active");
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';

    // Update active link
    navLinks.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  });
});

// Header scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.1)";
    header.style.padding = "0";
    document.querySelector(".header-container").style.padding = "15px 0";
  } else {
    header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
    header.style.padding = "";
    document.querySelector(".header-container").style.padding = "20px 0";
  }

  // Update active nav link based on scroll position
  updateActiveNavLink();
});

// Update active navigation link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section");
  const scrollPos = window.scrollY + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const sectionId = section.getAttribute("id");

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

// MongoDB Contact Form Submission (Using a mock API for demonstration)
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get form data
  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
    timestamp: new Date().toISOString(),
  };

  // Show loading state
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  submitBtn.disabled = true;

  try {
    // In a real application, you would send this to your backend API
    // which would then save to MongoDB. For demonstration, we'll simulate this.

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock successful submission
    const success = Math.random() > 0.1; // 90% success rate for demo

    if (success) {
      // Show success message
      formStatus.textContent =
        "Thank you! Your message has been sent successfully. I'll get back to you soon.";
      formStatus.className = "form-status success";

      // In a real application, you would send the data to your backend:
      // Example using Fetch API:
      /*
                    const response = await fetch('https://your-backend-api.com/contact', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData)
                    });
                    
                    if (response.ok) {
                        formStatus.textContent = 'Thank you! Your message has been sent successfully.';
                        formStatus.className = 'form-status success';
                        contactForm.reset();
                    } else {
                        throw new Error('Failed to send message');
                    }
                    */

      // Reset form
      contactForm.reset();
    } else {
      throw new Error("Simulated network error");
    }
  } catch (error) {
    // Show error message
    formStatus.textContent =
      "Sorry, there was an error sending your message. Please try again or email me directly at hello@alexmorgan.dev";
    formStatus.className = "form-status error";
    console.error("Form submission error:", error);
  } finally {
    // Reset button state
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;

    // Hide status message after 8 seconds
    setTimeout(() => {
      formStatus.className = "form-status";
      formStatus.textContent = "";
    }, 8000);
  }
});

// Animate elements on scroll
const fadeElements = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // Animate skill bars
        if (entry.target.classList.contains("skill-category")) {
          const skillBars = entry.target.querySelectorAll(".skill-progress");
          skillBars.forEach((bar) => {
            const width = bar.getAttribute("data-width");
            setTimeout(() => {
              bar.style.width = width + "%";
            }, 300);
          });
        }
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  },
);

fadeElements.forEach((element) => {
  observer.observe(element);
});

// Animate skill bars on page load for those already in view
document.querySelectorAll(".skill-progress").forEach((bar) => {
  const rect = bar.getBoundingClientRect();
  if (rect.top < window.innerHeight - 100) {
    const width = bar.getAttribute("data-width");
    setTimeout(() => {
      bar.style.width = width + "%";
    }, 500);
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();

      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});

// Initialize active nav link
updateActiveNavLink();
