/* Smooth scrolling para os links de navegação
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});*/

/* Mostrar/ocultar navbar ao rolar
let lastScrollTop = 0;
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", function () {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > 100) {
    if (scrollTop > lastScrollTop) {
      // Rolando para baixo
      navbar.classList.remove("visible");
    } else {
      // Rolando para cima
      navbar.classList.add("visible");
    }
  } else {
    navbar.classList.remove("visible");
  }

  lastScrollTop = scrollTop;
});*/

// Animação de entrada das seções
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observar todas as seções
document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});

// Formulário de contato
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Simular envio do formulário
  const submitBtn = this.querySelector(".submit-btn");
  const originalText = submitBtn.textContent;

  submitBtn.textContent = "Enviando...";
  submitBtn.disabled = true;

  setTimeout(() => {
    alert("Mensagem enviada com sucesso! Retornarei o contato em breve.");
    this.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }, 1500);
});

// Efeitos interativos na foto de perfil
function initProfileEffects() {
  const profileImage = document.getElementById("profileImage");
  const profilePlaceholder = document.getElementById("profilePlaceholder");
  const profileContainer = document.querySelector(".profile-container");

  // Efeito de paralaxe com o mouse
  profileContainer.addEventListener("mousemove", function (e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const moveX = x * 0.1;
    const moveY = y * 0.1;

    const activeElement =
      profileImage.style.display !== "none" ? profileImage : profilePlaceholder;
    activeElement.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;

    // Efeito nos elementos flutuantes
    const floatingDots = this.querySelectorAll(".floating-dot");
    floatingDots.forEach((dot, index) => {
      const factor = (index + 1) * 0.05;
      dot.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
  });

  profileContainer.addEventListener("mouseleave", function () {
    const activeElement =
      profileImage.style.display !== "none" ? profileImage : profilePlaceholder;
    activeElement.style.transform = "translate(0, 0) scale(1)";

    const floatingDots = this.querySelectorAll(".floating-dot");
    floatingDots.forEach((dot) => {
      dot.style.transform = "translate(0, 0)";
    });
  });

  // Efeito de clique - zoom e rotação
  const clickHandler = function () {
    const activeElement =
      profileImage.style.display !== "none" ? profileImage : profilePlaceholder;

    // Adicionar efeito de flash
    const flash = document.createElement("div");
    flash.style.cssText = `
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 10;
                    animation: flashEffect 0.6s ease-out;
                `;

    // Adicionar keyframe do flash dinamicamente
    if (!document.querySelector("#flashAnimation")) {
      const style = document.createElement("style");
      style.id = "flashAnimation";
      style.textContent = `
                        @keyframes flashEffect {
                            0% { opacity: 0; transform: scale(0.8); }
                            50% { opacity: 1; transform: scale(1.2); }
                            100% { opacity: 0; transform: scale(1.5); }
                        }
                    `;
      document.head.appendChild(style);
    }

    profileContainer.appendChild(flash);

    // Remover o flash após a animação
    setTimeout(() => {
      if (flash.parentNode) {
        flash.parentNode.removeChild(flash);
      }
    }, 600);

    // Efeito de rotação e zoom
    activeElement.style.transform = "scale(1.2) rotate(360deg)";
    setTimeout(() => {
      activeElement.style.transform = "scale(1) rotate(0deg)";
    }, 800);

    // Efeito nas órbitas
    const techIcons = profileContainer.querySelectorAll(".tech-icon");
    techIcons.forEach((icon, index) => {
      setTimeout(() => {
        icon.style.transform = "scale(1.3)";
        icon.style.background = "#667eea";
        icon.style.color = "white";

        setTimeout(() => {
          icon.style.transform = "scale(1)";
          icon.style.background = "white";
          icon.style.color = "black";
        }, 300);
      }, index * 100);
    });
  };

  profileImage.addEventListener("click", clickHandler);
  profilePlaceholder.addEventListener("click", clickHandler);
}

// Função para trocar a imagem dinamicamente
function changeProfileImage(imagePath) {
  const profileImage = document.getElementById("profileImage");
  const profilePlaceholder = document.getElementById("profilePlaceholder");

  profileImage.src = imagePath;
  profileImage.style.display = "block";
  profilePlaceholder.style.display = "none";

  // Efeito de fade in
  profileImage.style.opacity = "0";
  profileImage.style.transform = "scale(0.8)";

  setTimeout(() => {
    profileImage.style.transition = "all 0.5s ease";
    profileImage.style.opacity = "1";
    profileImage.style.transform = "scale(1)";
  }, 100);
}

// Criar partículas que seguem o cursor na área do perfil
function createCursorParticles() {
  const profileContainer = document.querySelector(".profile-container");
  let particles = [];

  profileContainer.addEventListener("mousemove", function (e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Criar partícula
    const particle = document.createElement("div");
    particle.style.cssText = `
                    position: absolute;
                    left: ${x}px;
                    top: ${y}px;
                    width: 4px;
                    height: 4px;
                    background: #667eea;
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 15;
                    animation: particleFade 1s ease-out forwards;
                `;

    // Adicionar keyframe das partículas
    if (!document.querySelector("#particleAnimation")) {
      const style = document.createElement("style");
      style.id = "particleAnimation";
      style.textContent = `
                        @keyframes particleFade {
                            0% { 
                                opacity: 1; 
                                transform: scale(1) translateY(0); 
                            }
                            100% { 
                                opacity: 0; 
                                transform: scale(0) translateY(-30px); 
                            }
                        }
                    `;
      document.head.appendChild(style);
    }

    this.appendChild(particle);
    particles.push(particle);

    // Limitar número de partículas
    if (particles.length > 10) {
      const oldParticle = particles.shift();
      if (oldParticle.parentNode) {
        oldParticle.parentNode.removeChild(oldParticle);
      }
    }

    // Remover partícula após animação
    setTimeout(() => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
      particles = particles.filter((p) => p !== particle);
    }, 1000);
  });
}

// Efeito de typing no título (opcional)
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = "";

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Executar após o carregamento da página
window.addEventListener("load", function () {
  // Inicializar efeitos da foto de perfil
  initProfileEffects();
  createCursorParticles();

  // Efeito de typing
  setTimeout(() => {
    const title = document.querySelector("header h1");
    if (title) {
      typeWriter(title, "Robert Castro", 150);
    }
  }, 1000);

  // Criar elementos flutuantes no header
  createFloatingElements();
});

// Adicionar partículas flutuantes no header (efeito visual extra)
function createFloatingElements() {
  const header = document.querySelector("header");
  const numberOfElements = 15;

  for (let i = 0; i < numberOfElements; i++) {
    const element = document.createElement("div");
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
window.addEventListener("load", function () {
  createFloatingElements();
});

// Adicionar efeito de hover nos cards de projeto
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
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
