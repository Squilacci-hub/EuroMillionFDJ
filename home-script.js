class HomePage {
    constructor() {
        this.modal = document.getElementById('infoModal');
        this.modalTitle = document.getElementById('modalTitle');
        this.modalBody = document.getElementById('modalBody');
        this.closeBtn = document.querySelector('.close');
        
        this.init();
    }

    init() {
        // Fermer la modal quand on clique sur le bouton X
        this.closeBtn.addEventListener('click', () => this.closeModal());
        
        // Fermer la modal quand on clique en dehors
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
        
        // Fermer la modal avec la touche Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modal.style.display === 'block') {
                this.closeModal();
            }
        });
        
        // Animation d'entrée pour les cartes
        this.animateCards();
        
        // Effet parallaxe sur le scroll
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Animation des statistiques au scroll
        this.observeStats();
        
        console.log('Page d\'accueil initialisée avec succès!');
    }

    animateCards() {
        const cards = document.querySelectorAll('.game-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 200 + (index * 200));
        });
    }

    handleScroll() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-section');
        
        if (parallax) {
            parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    }

    observeStats() {
        const stats = document.querySelectorAll('.stat-number');
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateNumber(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        stats.forEach(stat => observer.observe(stat));
    }

    animateNumber(element) {
        const finalText = element.textContent;
        const hasM = finalText.includes('M');
        const hasPercent = finalText.includes('%');
        const hasSlash = finalText.includes('/');
        
        let finalNumber = finalText.replace(/[M%\/]/g, '');
        let currentNumber = 0;
        const increment = finalNumber / 50;
        
        const timer = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= finalNumber) {
                currentNumber = finalNumber;
                clearInterval(timer);
            }
            
            let displayText = Math.floor(currentNumber);
            if (hasM) displayText += 'M';
            if (hasPercent) displayText += '%';
            if (hasSlash) displayText += '/7';
            
            element.textContent = displayText;
        }, 30);
    }

    showModal(title, content) {
        this.modalTitle.textContent = title;
        this.modalBody.innerHTML = content;
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Fonctions globales pour les liens du footer
function showResponsibility() {
    const content = `
        <h3>Jeu Responsable</h3>
        <p>Les générateurs de numéros sont des outils de divertissement et ne doivent pas être considérés comme une méthode pour gagner.</p>
        <br>
        <h4>Règles d'or :</h4>
        <ul>
            <li>Jouer uniquement pour le plaisir</li>
            <li>Définir un budget et s'y tenir</li>
            <li>Ne jamais jouer d'argent que vous ne pouvez pas vous permettre de perdre</li>
            <li>Ne pas chercher à récupérer les pertes</li>
            <li>Faire des pauses régulières</li>
        </ul>
        <br>
        <p><strong>Âge minimum légal : 18 ans</strong></p>
        <p>Pour toute aide : <a href="#" style="color: #ffd700;">www.joueurs-info-service.fr</a></p>
    `;
    window.homePage.showModal('Jeu Responsable', content);
}

function showProbabilities() {
    const content = `
        <h3>Probabilités des Jeux</h3>
        <br>
        <h4>🎰 Loto National</h4>
        <ul>
            <li><strong>Jackpot (5 numéros + Chance) :</strong> 1 chance sur 19 068 840</li>
            <li><strong>5 numéros :</strong> 1 chance sur 2 118 760</li>
            <li><strong>4 numéros + Chance :</strong> 1 chance sur 86 677</li>
            <li><strong>4 numéros :</strong> 1 chance sur 9 631</li>
            <li><strong>3 numéros + Chance :</strong> 1 chance sur 4 321</li>
            <li><strong>3 numéros :</strong> 1 chance sur 481</li>
            <li><strong>2 numéros + Chance :</strong> 1 chance sur 230</li>
            <li><strong>2 numéros :</strong> 1 chance sur 26</li>
            <li><strong>1 numéro + Chance :</strong> 1 chance sur 16</li>
            <li><strong>Chance uniquement :</strong> 1 chance sur 10</li>
        </ul>
        <br>
        <h4>⭐ EuroMillions</h4>
        <ul>
            <li><strong>Jackpot (5 numéros + 2 étoiles) :</strong> 1 chance sur 139 838 160</li>
            <li><strong>5 numéros + 1 étoile :</strong> 1 chance sur 6 991 908</li>
            <li><strong>5 numéros :</strong> 1 chance sur 3 107 515</li>
            <li><strong>4 numéros + 2 étoiles :</strong> 1 chance sur 621 503</li>
            <li><strong>4 numéros + 1 étoile :</strong> 1 chance sur 31 075</li>
            <li><strong>4 numéros :</strong> 1 chance sur 13 811</li>
            <li><strong>3 numéros + 2 étoiles :</strong> 1 chance sur 14 125</li>
            <li><strong>3 numéros + 1 étoile :</strong> 1 chance sur 706</li>
            <li><strong>3 numéros :</strong> 1 chance sur 314</li>
            <li><strong>2 numéros + 2 étoiles :</strong> 1 chance sur 985</li>
            <li><strong>2 numéros + 1 étoile :</strong> 1 chance sur 49</li>
            <li><strong>2 numéros :</strong> 1 chance sur 22</li>
            <li><strong>1 numéro + 2 étoiles :</strong> 1 chance sur 188</li>
        </ul>
        <br>
        <p><em>Source : FDJ - Française des Jeux</em></p>
    `;
    window.homePage.showModal('Probabilités des Jeux', content);
}

function showAbout() {
    const content = `
        <h3>À Propos des Générateurs FDJ</h3>
        <br>
        <p><strong>Version :</strong> 1.0.0</p>
        <p><strong>Développé par :</strong> Assistant IA Cascade</p>
        <p><strong>Technologies :</strong> HTML5, CSS3, JavaScript</p>
        <br>
        <h4>🎯 Notre Mission</h4>
        <p>Fournir des générateurs de numéros gratuits et fidèles aux jeux officiels de la FDJ, avec une interface moderne et immersive.</p>
        <br>
        <h4>✨ Fonctionnalités</h4>
        <ul>
            <li>Génération 100% aléatoire</li>
            <li>Design officiel FDJ</li>
            <li>Animations et effets sonores</li>
            <li>Compatible tous appareils</li>
            <li>Aucune publicité</li>
            <li>Gratuit à vie</li>
        </ul>
        <br>
        <h4>⚖️ Mentions Légales</h4>
        <p>Ce site est un outil de divertissement et n'est pas affilié à la FDJ. Les numéros générés sont purement aléatoires et ne garantissent aucun gain.</p>
        <p>Les jeux d'argent sont interdits aux mineurs. Jouez responsablement.</p>
        <br>
        <h4>📧 Contact</h4>
        <p>Pour toute suggestion ou signalement de bug, n'hésitez pas à nous contacter.</p>
        <p><em>Développé avec ❤️ en 2024</em></p>
    `;
    window.homePage.showModal('À Propos', content);
}

// Initialiser la page d'accueil
document.addEventListener('DOMContentLoaded', () => {
    window.homePage = new HomePage();
    
    // Effet de particules en arrière-plan
    createParticles();
    
    // Animation des titres au chargement
    animateTitles();
    
    console.log('Page d\'accueil chargée avec succès!');
});

// Créer des particules flottantes en arrière-plan
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(255, 215, 0, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s linear infinite;
        `;
        particlesContainer.appendChild(particle);
    }
    
    // Ajouter l'animation CSS
    if (!document.querySelector('#particles-style')) {
        const style = document.createElement('style');
        style.id = 'particles-style';
        style.textContent = `
            @keyframes float {
                from {
                    transform: translateY(100vh) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                to {
                    transform: translateY(-100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Animer les titres avec effet de machine à écrire
function animateTitles() {
    const titles = document.querySelectorAll('.hero-title, .features-title');
    titles.forEach(title => {
        const text = title.textContent;
        title.textContent = '';
        title.style.borderRight = '3px solid #ffd700';
        
        let i = 0;
        const typeWriter = setInterval(() => {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeWriter);
                setTimeout(() => {
                    title.style.borderRight = 'none';
                }, 1000);
            }
        }, 50);
    });
}

// Effet de brillance sur les cartes au survol
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.game-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
});
