document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    let currentTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        currentTheme = newTheme;
    });

    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Load Projects
    const projects = [
        {
            title: "Cervical Cancer Prediction Model | Python",
            description: "Built an ML model with 98% accuracy using SMOTE (data balancing) and RFE (feature selection).Published in IIIE Journal",
            image: "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*cG6U1qstYDijh9bPL42e-Q.jpeg"
        },
        {
            title: "CodeCanvas: A Modern Developer Portfolio",
            description: "CodeCanvas is a cutting-edge, interactive portfolio designed to highlight the skills, projects, and professional journey of a full-stack developer. Built with a modern aesthetic and seamless user experience, this portfolio combines sleek design with advanced functionality to create a dynamic showcase of technical expertise.",
            image: "https://www.swic.edu/wp-content/uploads/2021/05/portfolio-2048x1224.png"
        },
        {
            title: "Travel Booking & Onboarding Application | Pega ",
            description: "Designed a travel booking system for multiple users and reduced onboarding cycle time by 30% via automation.",
            image: "https://karthiktrainings.com/wp-content/uploads/2021/08/on-page-blog-image.jpg"
        }
    ];

    const projectsGrid = document.querySelector('.projects-grid');
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
        `;
        projectsGrid.appendChild(card);
    });

    // Parallax Effect
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.transform = `
                perspective(1000px)
                rotateX(${(y - rect.height/2) / 10}deg)
                rotateY(${-(x - rect.width/2) / 10}deg)
                translateY(-5px)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });

    // Form Validation
    const contactForm = document.querySelector('.contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        let isValid = true;

        contactForm.querySelectorAll('input, textarea').forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });

        if (isValid) {
            contactForm.reset();
            showMessage('Message sent successfully!', 'success');
        } else {
            showMessage('Please fill in all fields', 'error');
        }
    });

    function showMessage(text, type) {
        const message = document.createElement('div');
        message.className = `message ${type}`;
        message.textContent = text;
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
    }

    // Copyright Year
    document.querySelector('.copyright').textContent = 
        `© ${new Date().getFullYear()} Portfolio. All rights reserved.`;

    // Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
});
document.addEventListener('DOMContentLoaded', () => {
    // Tab functionality
    const tabs = document.querySelectorAll('.tab');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;
            tabs.forEach(t => t.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            tab.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});