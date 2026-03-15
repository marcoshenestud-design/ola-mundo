// Inicializar partículas de fundo
document.addEventListener('DOMContentLoaded', function() {
    // Configurar partículas
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 60,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#6C63FF"
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    }
                },
                opacity: {
                    value: 0.3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#6C63FF",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 200,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }

    // Efeito de digitação no título
    const typingTitle = document.getElementById('typing-title');
    if (typingTitle) {
        const text = typingTitle.textContent;
        typingTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                typingTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Iniciar efeito após um breve delay
        setTimeout(typeWriter, 500);
    }

    // Animar contadores
    const counters = document.querySelectorAll('.stat-value');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000; // 2 segundos
        const increment = target / (duration / 16); // 60fps
        
        let current = 0;
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                if (current > target) current = target;
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            }
        };
        
        // Iniciar animação quando o elemento estiver visível
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                updateCounter();
                observer.unobserve(counter);
            }
        });
        
        observer.observe(counter);
    });

    // Animar barras de habilidade
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                const width = bar.style.width;
                bar.style.width = '0';
                
                // Pequeno delay para visualizar a animação
                setTimeout(() => {
                    bar.style.width = width;
                }, 300);
                
                observer.unobserve(bar);
            }
        }, {
            threshold: 0.5
        });
        
        observer.observe(bar);
    });

    // Adicionar efeito de hover nos cards
    const cards = document.querySelectorAll('.goal-card, .interest-card, .tech-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = this.style.transform.includes('translateY') 
                ? this.style.transform.replace('translateY(-10px)', 'translateY(-15px)')
                : 'translateY(-15px)';
            this.style.boxShadow = '0 20px 40px rgba(108, 99, 255, 0.25)';
        });
        
        card.addEventListener('mouseleave', function() {
            const hasAos = this.getAttribute('data-aos-delay');
            if (hasAos) {
                this.style.transform = 'translateY(0)';
            } else {
                this.style.transform = '';
            }
            this.style.boxShadow = '';
        });
    });

    // Animar elementos ao rolar a página
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('[data-aos]');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('aos-animate');
            }
        });
    };

    // Adicionar evento de scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Executar uma vez ao carregar a página
    animateOnScroll();

    // Atualizar calendário com o mês atual
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();
    const monthElements = document.querySelectorAll('.month');
    
    monthElements.forEach((monthEl, index) => {
        if (monthEl.textContent === months[currentMonth]) {
            monthEl.style.background = 'linear-gradient(135deg, var(--primary-color), var(--accent-color))';
            monthEl.style.color = 'white';
            monthEl.style.transform = 'scale(1.1)';
        }
    });

    // Adicionar data atual ao calendário
    const today = new Date();
    const currentDay = today.getDate();
    const dayElements = document.querySelectorAll('.day');
    
    // Encontrar o elemento do dia atual (simulação)
    dayElements.forEach(dayEl => {
        if (parseInt(dayEl.textContent) === currentDay % 12 || parseInt(dayEl.textContent) === 1) {
            dayEl.classList.add('active');
        }
    });

    // Suavizar rolagem para âncoras
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Adicionar efeito de digitação ao carregar a página
    const tagline = document.querySelector('.tagline span');
    if (tagline) {
        const taglineText = tagline.textContent;
        tagline.textContent = '';
        
        let j = 0;
        function typeTagline() {
            if (j < taglineText.length) {
                tagline.textContent += taglineText.charAt(j);
                j++;
                setTimeout(typeTagline, 50);
            }
        }
        
        setTimeout(typeTagline, 1500);
    }
});

// Adicionar ano atual no footer
const currentYear = new Date().getFullYear();
const yearElement = document.querySelector('.copyright');
if (yearElement) {
    yearElement.textContent = yearElement.textContent.replace('2023', currentYear);
}