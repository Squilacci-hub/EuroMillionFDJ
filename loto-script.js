class LotoGenerator {
    constructor() {
        this.generateBtn = document.getElementById('loto-generateBtn');
        this.numberSlots = [
            document.getElementById('loto-number1'),
            document.getElementById('loto-number2'),
            document.getElementById('loto-number3'),
            document.getElementById('loto-number4'),
            document.getElementById('loto-number5')
        ];
        this.chanceSlot = document.getElementById('loto-chance');
        this.numbersDisplay = document.querySelector('.numbers-display');
        
        this.init();
    }

    init() {
        this.generateBtn.addEventListener('click', () => this.generateLotoNumbers());
        
        // Effet de vibration si disponible
        this.generateBtn.addEventListener('click', () => {
            if ('vibrate' in navigator) {
                navigator.vibrate([100, 50, 100]);
            }
        });
        
        // Support clavier
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.generateLotoNumbers();
            }
        });
    }

    generateLotoNumbers() {
        // Désactiver le bouton pendant la génération
        this.generateBtn.disabled = true;
        this.generateBtn.style.opacity = '0.7';
        
        // Effacer les classes précédentes
        this.clearGeneratedClasses();
        
        // Générer les 5 numéros principaux (1-49)
        const numbers = this.generateUniqueNumbers(5, 1, 49);
        
        // Générer le numéro chance (1-10)
        const chanceNumber = Math.floor(Math.random() * 10) + 1;
        
        // Animer l'affichage
        this.animateLotoNumbers(numbers, chanceNumber);
    }

    generateUniqueNumbers(count, min, max) {
        const numbers = [];
        
        while (numbers.length < count) {
            const num = Math.floor(Math.random() * (max - min + 1)) + min;
            
            if (!numbers.includes(num)) {
                numbers.push(num);
            }
        }
        
        // Trier par ordre croissant
        return numbers.sort((a, b) => a - b);
    }

    animateLotoNumbers(numbers, chanceNumber) {
        // Animation de défilement pour les numéros principaux
        let iterations = 0;
        const maxIterations = 20;
        
        const rollInterval = setInterval(() => {
            // Afficher des numéros aléatoires pendant l'animation
            this.numberSlots.forEach((slot, index) => {
                slot.textContent = Math.floor(Math.random() * 49) + 1;
            });
            
            // Animation pour le numéro chance
            this.chanceSlot.textContent = Math.floor(Math.random() * 10) + 1;
            
            iterations++;
            
            if (iterations >= maxIterations) {
                clearInterval(rollInterval);
                this.displayFinalLotoNumbers(numbers, chanceNumber);
            }
        }, 70);
    }

    displayFinalLotoNumbers(numbers, chanceNumber) {
        // Afficher les numéros principaux un par un
        numbers.forEach((num, index) => {
            setTimeout(() => {
                this.numberSlots[index].textContent = num;
                this.numberSlots[index].classList.add('generated');
                
                // Son différent pour chaque numéro
                this.playSound(600 + (index * 80));
            }, index * 150);
        });
        
        // Afficher le numéro chance avec un délai et effet spécial
        setTimeout(() => {
            this.chanceSlot.textContent = chanceNumber;
            this.chanceSlot.classList.add('generated');
            this.numbersDisplay.classList.add('generated');
            
            // Son spécial pour le numéro chance
            this.playChanceSound();
            
            // Effet visuel supplémentaire
            this.createConfetti();
        }, numbers.length * 150 + 300);
        
        // Réactiver les boutons
        setTimeout(() => {
            this.generateBtn.disabled = false;
            this.generateBtn.style.opacity = '1';
        }, numbers.length * 150 + 800);
    }

    clearGeneratedClasses() {
        this.numberSlots.forEach(slot => {
            slot.classList.remove('generated');
        });
        this.chanceSlot.classList.remove('generated');
        this.numbersDisplay.classList.remove('generated');
    }

    playSound(frequency) {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.15);
        } catch (e) {
            console.log('Web Audio API not available');
        }
    }

    playChanceSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // Créer un son plus complexe pour le numéro chance
            const oscillator1 = audioContext.createOscillator();
            const oscillator2 = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator1.connect(gainNode);
            oscillator2.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator1.frequency.value = 800;
            oscillator2.frequency.value = 1200;
            oscillator1.type = 'sine';
            oscillator2.type = 'triangle';
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator1.start(audioContext.currentTime);
            oscillator2.start(audioContext.currentTime);
            oscillator1.stop(audioContext.currentTime + 0.3);
            oscillator2.stop(audioContext.currentTime + 0.3);
        } catch (e) {
            console.log('Web Audio API not available');
        }
    }

    createConfetti() {
        // Effet de confetti simple avec CSS
        const colors = ['#ff6b35', '#ffd700', '#4a90e2', '#ff4757', '#2ecc71'];
        const confettiCount = 30;
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}%;
                top: -10px;
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                animation: confettiFall ${2 + Math.random() * 2}s linear forwards;
            `;
            document.body.appendChild(confetti);
            
            // Supprimer après l'animation
            setTimeout(() => {
                confetti.remove();
            }, 4000);
        }
        
        // Ajouter l'animation CSS si elle n'existe pas
        if (!document.querySelector('#confetti-style')) {
            const style = document.createElement('style');
            style.id = 'confetti-style';
            style.textContent = `
                @keyframes confettiFall {
                    to {
                        transform: translateY(100vh) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Validation de la combinaison
    validateLotoCombination(numbers, chanceNumber) {
        const validNumbers = numbers.every(num => num >= 1 && num <= 49);
        const validChance = chanceNumber >= 1 && chanceNumber <= 10;
        const uniqueNumbers = new Set(numbers).size === numbers.length;
        
        return validNumbers && validChance && uniqueNumbers;
    }

    // Statistiques simples
    getLotoStatistics(numbers, chanceNumber) {
        const stats = {
            evenNumbers: numbers.filter(n => n % 2 === 0).length,
            oddNumbers: numbers.filter(n => n % 2 !== 0).length,
            lowNumbers: numbers.filter(n => n <= 24).length, // 1-24
            highNumbers: numbers.filter(n => n >= 25).length, // 25-49
            sum: numbers.reduce((a, b) => a + b, 0),
            average: (numbers.reduce((a, b) => a + b, 0) / numbers.length).toFixed(1),
            isChanceEven: chanceNumber % 2 === 0
        };
        
        return stats;
    }
}

// Initialiser l'application
document.addEventListener('DOMContentLoaded', () => {
    const lotoGenerator = new LotoGenerator();
    
    // Animation d'entrée
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    console.log('Loto National Generator initialisé avec succès!');
    
    // Rendre accessible globalement pour le débogage
    window.LotoGenerator = LotoGenerator;
    window.lotoGenerator = lotoGenerator;
});
