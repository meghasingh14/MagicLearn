// MagicLearn Application JavaScript

// Application data
const appData = {
    houses: [
        {
            name: "Gryffindor",
            traits: "Bravery and Courage",
            color: "#DC2626",
            description: "Where dwell the brave at heart"
        },
        {
            name: "Hufflepuff", 
            traits: "Loyalty and Patience",
            color: "#EAB308",
            description: "Where they are just and loyal"
        },
        {
            name: "Ravenclaw",
            traits: "Wisdom and Wit", 
            color: "#2563EB",
            description: "Where those of wit and learning"
        },
        {
            name: "Slytherin",
            traits: "Ambition and Cunning",
            color: "#16A34A", 
            description: "Where you'll make your real friends"
        }
    ],
    spells: [
        "Lumos - Creates light from wand tip",
        "Expelliarmus - Disarming spell",
        "Alohomora - Unlocks doors and windows",
        "Wingardium Leviosa - Levitation charm",
        "Expecto Patronum - Conjures a Patronus",
        "Avada Kedavra - Killing curse (Unforgivable)",
        "Stupefy - Stunning spell",
        "Protego - Shield charm",
        "Accio - Summoning charm",
        "Riddikulus - Banishes Boggarts",
        "Obliviate - Memory charm",
        "Sectumsempra - Slashing curse",
        "Imperio - Control curse (Unforgivable)",
        "Crucio - Torture curse (Unforgivable)",
        "Finite Incantatem - Ends spells",
        "Reparo - Repairs broken objects",
        "Diffindo - Severing charm",
        "Nox - Extinguishes light from Lumos",
        "Silencio - Silencing charm",
        "Accio - Summoning charm",
        "Descendo - Moves objects downwards",
        "Levicorpus - Causes objects to fly upwards",
        "Expulso - Causes an explosion",
        "Confringo - Blasting curse",
        "Aguamenti - Conjures water",
        "Muffliato - Creates a buzzing sound to block eavesdropping",
        "Sonorus - Amplifies the caster's voice",   
        "Quietus - Returns amplified voice to normal",
        "Impervius - Makes objects waterproof",
        "Reducio - Shrinks objects",
        "Engorgio - Enlarges objects",
        "Episkey - Heals minor injuries",
        "Aparecium - Reveals hidden writing",
    ],
    quotes: [
        "Happiness can be found, even in the darkest of times, if one only remembers to turn on the light.",
        "It is our choices that show what we truly are, far more than our abilities.",
        "Don't let the muggles get you down.",
        "After all this time? Always.",
        "You're a wizard, Harry!",
        "It does not do to dwell on dreams and forget to live.",
        "The last enemy that shall be destroyed is death.",
        "Words are, in my not-so-humble opinion, our most inexhaustible source of magic.",
        "We are only as strong as we are united, as weak as we are divided.",
        "It matters not what someone is born, but what they grow to be.",
        "The world has ended, so why not just enjoy it?",
        "Fear of a name increases fear of the thing itself.",
    ],
    potionIngredients: [
        "Dragon heartstring",
        "Phoenix feather", 
        "Unicorn hair",
        "Moonstone",
        "Powdered silver",
        "Beetle eyes",
        "Snake fangs",
        "Mandrake root",
        "Powdered bicorn horn",
        "Dittany leaves",
        "Hellebore petals",
        "Gillyweed",
        "Fluxweed",
        "Powdered dragon liver",
        "Ashwinder eggs",
        "Jobberknoll feathers",
        "Horklump juice",
        "Wormwood",
        "Valerian roots",
        "Lavender sprigs",
        "Peppermint leaves",
        "Puffskein fur",
    ],
    botResponses: [
        "Ah, a curious young wizard! What magical knowledge do you seek?",
        "The magic flows strong in you. Ask me about spells, potions, or houses!",
        "Every great wizard started with questions. What would you like to know?",
        "Magic is everywhere if you know where to look. How can I guide you?",
        "Welcome to the magical realm! I sense great potential in you.",
        "The wand chooses the wizard, but I can help you choose your path.",
        "In the world of magic, knowledge is power. What do you wish to learn?",
        "The secrets of magic are vast. Let's explore them together!",
        "Every spell has a story. What tale do you wish to uncover?",
        "The magic of friendship is the strongest of all. How can I assist you today?",
        "Remember, young wizard, the journey of a thousand spells begins with a single incantation.",
        "In the world of magic, curiosity is your greatest ally. What mysteries shall we unravel today?",
        "The magic within you is waiting to be unleashed. What do you seek?",   
        "Every question is a step towards mastery. What knowledge do you crave?",
        "The path of a wizard is paved with questions. What wisdom do you seek?",
        "Magic is not just about spells, but understanding the world around you. How can I help?",
        "The essence of magic lies in discovery. What would you like to explore?",
        "In the realm of magic, every answer leads to more questions. What is your next inquiry?",
        "The magic of learning is the most powerful of all. What do you wish to discover?",
        "The world of magic is vast and wondrous. What secrets do you wish to uncover?",
        "Every spell has its own history. What magical tale do you want to hear?",
    ]
};

// Application state
let currentIngredients = [];
let selectedAnswer = null;

// Utility function to safely get elements
function safeGetElement(id) {
    const element = document.getElementById(id);
    if (!element) {
        console.warn(`Element with id '${id}' not found`);
    }
    return element;
}

// Navigation functionality
function initNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const targetPage = this.getAttribute('data-page');
            console.log('Navigation clicked:', targetPage);
            
            // Remove active class from all nav buttons
            navButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show the target page
            showPage(targetPage);
        });
    });
}

function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    
    // Hide all pages
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        console.log('Page shown:', pageId);
    } else {
        console.error('Page not found:', pageId);
    }
}

// Great Hall - Quote functionality
function initQuotes() {
    const quoteElement = safeGetElement('daily-quote');
    const newQuoteBtn = safeGetElement('new-quote-btn');
    
    function displayRandomQuote() {
        if (!quoteElement) return;
        
        const randomIndex = Math.floor(Math.random() * appData.quotes.length);
        const quote = appData.quotes[randomIndex];
        
        quoteElement.textContent = `"${quote}"`;
        
        // Add animation
        quoteElement.style.opacity = '0';
        setTimeout(() => {
            quoteElement.style.opacity = '1';
            quoteElement.style.transition = 'opacity 0.5s ease-in-out';
        }, 100);
    }
    
    // Display initial quote
    displayRandomQuote();
    
    if (newQuoteBtn) {
        newQuoteBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            displayRandomQuote();
        });
    }
}

// Sorting Quiz functionality
function initQuiz() {
    const optionButtons = document.querySelectorAll('.option-btn');
    const revealButton = safeGetElement('reveal-fate-btn');
    const questionContainer = safeGetElement('question-container');
    const resultContainer = safeGetElement('quiz-result');
    const resultTitle = document.querySelector('.result-title');
    const resultText = document.querySelector('.result-text');
    const retryButton = safeGetElement('retry-quiz-btn');
    
    optionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Remove previous selections
            optionButtons.forEach(btn => btn.classList.remove('selected'));
            
            // Select current option
            this.classList.add('selected');
            selectedAnswer = this.getAttribute('data-answer');
            
            // Show reveal button
            if (revealButton) {
                revealButton.classList.remove('hidden');
            }
        });
    });
    
    if (revealButton) {
        revealButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (questionContainer) questionContainer.classList.add('hidden');
            if (resultContainer) resultContainer.classList.remove('hidden');
            
            if (selectedAnswer === 'correct') {
                if (resultTitle) resultTitle.textContent = '🎉 Excellent Choice!';
                if (resultText) resultText.textContent = 'You are correct! A wand is indeed essential for casting spells. You show great wisdom and would make a fine wizard!';
            } else {
                if (resultTitle) resultTitle.textContent = '🤔 Not Quite Right';
                if (resultText) resultText.textContent = 'While spell books and invisibility cloaks are magical, a wand is the essential tool for casting spells. Keep studying, young wizard!';
            }
        });
    }
    
    if (retryButton) {
        retryButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (questionContainer) questionContainer.classList.remove('hidden');
            if (resultContainer) resultContainer.classList.add('hidden');
            if (revealButton) revealButton.classList.add('hidden');
            
            optionButtons.forEach(btn => btn.classList.remove('selected'));
            selectedAnswer = null;
        });
    }
}

// Potion Lab functionality
function initPotionLab() {
    const mixButton = safeGetElement('mix-potion-btn');
    const ingredientList = safeGetElement('ingredient-list');
    const potionResult = safeGetElement('potion-result');
    const brewingMessage = document.querySelector('.brewing-message');
    
    function updateIngredientDisplay() {
        if (!ingredientList) return;
        
        if (currentIngredients.length === 0) {
            ingredientList.innerHTML = '<p style="color: #e6e6fa; font-style: italic;">No ingredients added yet...</p>';
        } else {
            ingredientList.innerHTML = currentIngredients
                .map(ingredient => `<div class="ingredient-item">✨ ${ingredient}</div>`)
                .join('');
        }
    }
    
    function addRandomIngredients() {
        const numIngredients = Math.floor(Math.random() * 3) + 2;
        currentIngredients = [];
        
        const shuffled = [...appData.potionIngredients].sort(() => 0.5 - Math.random());
        currentIngredients = shuffled.slice(0, numIngredients);
        
        updateIngredientDisplay();
    }
    
    function brewPotion() {
        const potionNames = [
            'Elixir of Wisdom',
            'Potion of Courage',
            'Draught of Peace',
            'Felix Felicis (Liquid Luck)',
            'Strengthening Solution',
            'Pepper-Up Potion',
            'Love Potion'
        ];
        
        const randomPotion = potionNames[Math.floor(Math.random() * potionNames.length)];
        
        if (brewingMessage) {
            brewingMessage.textContent = `🎉 Success! You've brewed a ${randomPotion}!`;
        }
        
        if (potionResult) {
            potionResult.classList.remove('hidden');
        }
        
        // Generate new ingredients for next brewing
        setTimeout(() => {
            addRandomIngredients();
            if (potionResult) {
                potionResult.classList.add('hidden');
            }
        }, 3000);
    }
    
    // Initialize with random ingredients
    addRandomIngredients();
    
    if (mixButton) {
        mixButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            brewPotion();
        });
    }
}

// Spells functionality
function initSpells() {
    const revealSpellBtn = safeGetElement('reveal-spell-btn');
    const spellDisplay = safeGetElement('spell-display');
    
    if (revealSpellBtn && spellDisplay) {
        revealSpellBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const randomIndex = Math.floor(Math.random() * appData.spells.length);
            const spell = appData.spells[randomIndex];
            
            spellDisplay.innerHTML = `<p class="spell-text">✨ ${spell} ✨</p>`;
        });
    }
}

// SpellBot functionality
function initSpellBot() {
    const chatMessages = safeGetElement('chat-messages');
    const chatInput = safeGetElement('chat-input');
    const sendButton = safeGetElement('send-spell-btn');
    
    function addMessage(sender, text, isBot = false) {
        if (!chatMessages) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isBot ? 'bot-message' : 'user-message'}`;
        
        messageDiv.innerHTML = `
            <span class="message-sender">${isBot ? '🤖 SpellBot:' : '🧙‍♂️ You:'}</span>
            <span class="message-text">${text}</span>
        `;
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function generateBotResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        if (message.includes('spell') || message.includes('magic')) {
            const randomSpell = appData.spells[Math.floor(Math.random() * appData.spells.length)];
            return `Here's a spell for you: ${randomSpell}. Practice it wisely!`;
        } else if (message.includes('house')) {
            const randomHouse = appData.houses[Math.floor(Math.random() * appData.houses.length)];
            return `Ah, interested in the houses! ${randomHouse.name} values ${randomHouse.traits}. ${randomHouse.description}!`;
        } else if (message.includes('potion') || message.includes('brew')) {
            const randomIngredient = appData.potionIngredients[Math.floor(Math.random() * appData.potionIngredients.length)];
            return `For potion making, ${randomIngredient} is a powerful ingredient. Visit the Potion Lab to experiment!`;
        } else if (message.includes('hello') || message.includes('hi')) {
            return "Greetings, young wizard! Welcome to the magical world. How may I assist you in your magical studies?";
        } else if (message.includes('help')) {
            return "I can help you with spells, potions, house information, and general magical knowledge. What would you like to explore?";
        } else {
            return appData.botResponses[Math.floor(Math.random() * appData.botResponses.length)];
        }
    }
    
    function sendMessage() {
        if (!chatInput) return;
        
        const userMessage = chatInput.value.trim();
        if (!userMessage) return;
        
        addMessage('You', userMessage, false);
        chatInput.value = '';
        
        setTimeout(() => {
            const botResponse = generateBotResponse(userMessage);
            addMessage('SpellBot', botResponse, true);
        }, 1000);
    }
    
    if (sendButton) {
        sendButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            sendMessage();
        });
    }
    
    if (chatInput) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage();
            }
        });
    }
}

// Initialize application
function initApp() {
    console.log('🏰 Initializing MagicLearn application...');
    
    try {
        initNavigation();
        initQuotes();
        initQuiz();
        initPotionLab();
        initSpells();
        initSpellBot();
        
        // Show home page by default
        showPage('home');
        
        console.log('🏰 MagicLearn application initialized successfully!');
    } catch (error) {
        console.error('Error initializing application:', error);
    }
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);