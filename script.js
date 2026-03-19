class EuroMillionsGenerator {
    constructor() {
        this.generateBtn = document.getElementById('generateBtn');
        this.numberSlots = [
            document.getElementById('number1'),
            document.getElementById('number2'),
            document.getElementById('number3'),
            document.getElementById('number4'),
            document.getElementById('number5')
        ];
        this.starSlots = [
            document.getElementById('star1'),
            document.getElementById('star2')
        ];
        
        this.init();
    }

    init() {
        this.generateBtn.addEventListener('click', () => this.generateNumbers());
        
        // Ajouter un effet sonore simulé avec vibration si disponible
        this.generateBtn.addEventListener('click', () => {
            if ('vibrate' in navigator) {
                navigator.vibrate(200);
            }
        });
    }

    generateNumbers() {
        // Désactiver le bouton pendant la génération
        this.generateBtn.disabled = true;
        this.generateBtn.style.opacity = '0.7';
        
        // Effacer les classes précédentes
        this.clearGeneratedClasses();
        
        // Générer les 5 numéros (1-50)
        const numbers = this.generateUniqueNumbers(5, 1, 50);
        
        // Générer les 2 étoiles (1-12)
        const stars = this.generateUniqueNumbers(2, 1, 12);
        
        // Animer l'affichage des numéros
        this.animateNumbers(numbers, stars);
    }

    generateUniqueNumbers(count, min, max) {
        const numbers = [];
        
        while (numbers.length < count) {
            const num = Math.floor(Math.random() * (max - min + 1)) + min;
            
            if (!numbers.includes(num)) {
                numbers.push(num);
            }
        }
        
        // Trier les numéros par ordre croissant
        return numbers.sort((a, b) => a - b);
    }

    animateNumbers(numbers, stars) {
        // Effet de défilement rapide avant d'afficher les numéros finaux
        let iterations = 0;
        const maxIterations = 15;
        
        const rollInterval = setInterval(() => {
            // Afficher des numéros aléatoires pendant l'animation
            this.numberSlots.forEach((slot, index) => {
                const valueSpan = slot.querySelector('.number-value');
                valueSpan.textContent = Math.floor(Math.random() * 50) + 1;
            });
            
            this.starSlots.forEach((slot, index) => {
                slot.textContent = Math.floor(Math.random() * 12) + 1;
            });
            
            iterations++;
            
            if (iterations >= maxIterations) {
                clearInterval(rollInterval);
                
                // Afficher les numéros finaux avec animation
                this.displayFinalNumbers(numbers, stars);
            }
        }, 80);
    }

    displayFinalNumbers(numbers, stars) {
        // Afficher les numéros un par un avec un délai
        numbers.forEach((num, index) => {
            setTimeout(() => {
                const slot = this.numberSlots[index];
                const valueSpan = slot.querySelector('.number-value');
                valueSpan.textContent = num;
                slot.classList.add('generated');
                
                // Effet sonore simulé
                this.playSound(800 + index * 100);
            }, index * 200);
        });
        
        // Afficher les étoiles avec un délai supplémentaire
        stars.forEach((star, index) => {
            setTimeout(() => {
                const slot = this.starSlots[index];
                slot.textContent = star;
                slot.classList.add('generated');
                
                // Effet sonore différent pour les étoiles
                this.playSound(1200 + index * 200);
            }, (numbers.length * 200) + (index * 250));
        });
        
        // Réactiver le bouton après l'animation
        setTimeout(() => {
            this.generateBtn.disabled = false;
            this.generateBtn.style.opacity = '1';
        }, (numbers.length * 200) + (stars.length * 250) + 500);
    }

    playSound(frequency) {
        // Créer un son simple avec l'API Web Audio si disponible
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        } catch (e) {
            // Ignorer si l'API Web Audio n'est pas disponible
            console.log('Web Audio API not available');
        }
    }

    clearGeneratedClasses() {
        this.numberSlots.forEach(slot => {
            slot.classList.remove('generated');
        });
        
        this.starSlots.forEach(slot => {
            slot.classList.remove('generated');
        });
    }

    // Méthode pour vérifier si une combinaison est valide
    validateCombination(numbers, stars) {
        // Vérifier que tous les numéros sont dans les bonnes plages
        const validNumbers = numbers.every(num => num >= 1 && num <= 50);
        const validStars = stars.every(star => star >= 1 && star <= 12);
        
        // Vérifier qu'il n'y a pas de doublons
        const uniqueNumbers = new Set(numbers).size === numbers.length;
        const uniqueStars = new Set(stars).size === stars.length;
        
        return validNumbers && validStars && uniqueNumbers && uniqueStars;
    }

    // Méthode pour générer une statistique simple
    getStatistics() {
        const stats = {
            evenNumbers: 0,
            oddNumbers: 0,
            lowNumbers: 0, // 1-25
            highNumbers: 0, // 26-50
            evenStars: 0,
            oddStars: 0
        };
        
        // Cette méthode peut être appelée après génération pour analyser la combinaison
        return stats;
    }
}

// Initialiser l'application quand le DOM est chargé
document.addEventListener('DOMContentLoaded', () => {
    const generator = new EuroMillionsGenerator();
    
    // Ajouter un effet de chargement initial
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Gérer les touches clavier
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            generator.generateBtn.click();
        }
    });
    
    console.log('EuroMillions Generator initialisé avec succès!');
});

// Exporter pour utilisation externe si nécessaire
window.EuroMillionsGenerator = EuroMillionsGenerator;
