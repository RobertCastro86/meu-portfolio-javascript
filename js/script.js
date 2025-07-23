// Smooth scrolling para os links de navegação
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Mostrar/ocultar navbar ao rolar
        let lastScrollTop = 0;
        const navbar = document.getElementById('navbar');

        window.addEventListener('scroll', function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                if (scrollTop > lastScrollTop) {
                    // Rolando para baixo
                    navbar.classList.remove('visible');
                } else {
                    // Rolando para cima
                    navbar.classList.add('visible');
                }
            } else {
                navbar.classList.remove('visible');
            }
            
            lastScrollTop = scrollTop;
        });

        // Animação de entrada das seções
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity='1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Inicialização dos cards
        document.addEventListener('DOMContentLoaded', () => {
            const cards = document.querySelectorAll('.project-card');
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(50px)';
                card.style.transition = `all 0.6s ease ${index * 0.1}s`;
                observer.observe(card);
            });
        });

        // Observar todas as seções
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });

        // Formulário de contato
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simular envio do formulário
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.style.backgorund = 'linear-gradient(45deg, #4CAF50, #45a049)';
            
            setTimeout(() => {
                alert('Mensagem enviada com sucesso! Retornarei o contato em breve.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });

        // Efeito parallax suave nos emojis
        document.addEventListener('mousemove', (e) => {
            const emojis = document.querySelectorAll('.project-image');
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            
            emojis.forEach((emoji, index) => {
                const xMove = (x - 0.5) * 20 * (index % 2 === 0 ? 1 : -1);
                const yMove = (y - 0.5) * 20 * (index % 2 === 0 ? 1 : -1);
                emoji.style.transform = `translate(${xMove}px, ${yMove}px)`;
            });
        });

        // Efeito de typing no título (opcional)
        function typeWriter(element, text, speed = 100) {
            let i = 0;
            element.textContent = '';
            
            function type() {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            
            type();
        }

        // Aplicar efeito de typing após o carregamento
        window.addEventListener('load', function() {
            setTimeout(() => {
                const title = document.querySelector('header h1');
                if (title) {
                    typeWriter(title, 'Robert Castro', 150);
                }
            }, 1000);
        });

        // Adicionar partículas flutuantes no header (efeito visual extra)
        function createFloatingElements() {
            const header = document.querySelector('header');
            const numberOfElements = 15;
            
            for (let i = 0; i < numberOfElements; i++) {
                const element = document.createElement('div');
                element.style.cssText = `
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    pointer-events: none;
                    animation: float 8s ease-in-out infinite;
                    animation-delay: ${Math.random() * 8}s;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                `;
                header.appendChild(element);
            }
        }

        // Executar após o carregamento da página
        window.addEventListener('load', function() {
            createFloatingElements();
        });

        // Adicionar efeito de hover nos cards de projeto
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Easter egg: console message
        console.log(`
        🚀 Olá! Vejo que você está inspecionando o código!
        
        Esta landing page foi criada com:
        ✅ HTML5 semântico
        ✅ CSS3 moderno (Grid, Flexbox, Animations)
        ✅ JavaScript puro (ES6+)
        ✅ Design responsivo
        ✅ Animações suaves
        ✅ Boa acessibilidade
        
        Se gostou do que viu, vamos conversar! 😊
        `);