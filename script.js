// DOM Elements
const continueBtn = document.getElementById('continueBtn');
const nameInput = document.getElementById('nameInput');
const welcomeScreen = document.getElementById('welcomeScreen');
const questionScreen = document.getElementById('questionScreen');
const acceptScreen = document.getElementById('acceptScreen');
const rejectScreen = document.getElementById('rejectScreen');
const boxesContainer = document.getElementById('boxesContainer');
const questionText = document.getElementById('questionText');
const acceptText = document.getElementById('acceptText');
const rejectText = document.getElementById('rejectText');
const happyMusic = document.getElementById('happyMusic');
const sadMusic = document.getElementById('sadMusic');

// 🔥 THE SECRET KEYWORD - Change this to your crush's name!
const SPECIAL_NAME = "eima";

let userName = '';

// Create floating hearts for accept screen
function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
    heart.style.animationDelay = Math.random() * 2 + 's';
    acceptScreen.appendChild(heart);
    
    setTimeout(() => heart.remove(), 8000);
}

// Show question screen with mystery boxes
function showQuestionScreen() {
    userName = nameInput.value.trim();
    
    if (!userName) {
        alert('Please enter your name! 💝');
        return;
    }

    questionText.textContent = `${userName}, will you be mine? 💕`;
    
    // 🎯 THE MAGIC HACK: Check if name matches Eima (case insensitive)
    const isSpecialPerson = userName.toLowerCase() === SPECIAL_NAME.toLowerCase();
    
    let isFirstBoxAccept;
    
    if (isSpecialPerson) {
        // 🔒 GUARANTEED ACCEPT for Eima - BOTH boxes accept!
        isFirstBoxAccept = true; // Doesn't matter, both will accept
    } else {
        // 🎲 TRUE 50/50 RANDOM for everyone else
        isFirstBoxAccept = Math.random() < 0.5;
    }
    
    boxesContainer.innerHTML = '';
    
    // Create two mystery boxes
    const box1 = document.createElement('div');
    box1.className = 'mystery-box';
    
    const box2 = document.createElement('div');
    box2.className = 'mystery-box';
    
    if (isSpecialPerson) {
        // 💖 SECRET: If it's Eima, BOTH boxes lead to accept!
        box1.onclick = showAccept;
        box2.onclick = showAccept;
    } else {
        // 🎲 For others: Random assignment
        if (isFirstBoxAccept) {
            box1.onclick = showAccept;
            box2.onclick = showReject;
        } else {
            box1.onclick = showReject;
            box2.onclick = showAccept;
        }
    }
    
    boxesContainer.appendChild(box1);
    boxesContainer.appendChild(box2);

    welcomeScreen.classList.add('hidden');
    setTimeout(() => {
        questionScreen.classList.add('active');
    }, 1000);
}

// Show ACCEPT result
function showAccept() {
    questionScreen.style.opacity = '0';
    
    setTimeout(() => {
        acceptText.textContent = `Congratulations! ${userName} accepted proposal! 💖✨`;
        acceptScreen.classList.add('active');
        happyMusic.play().catch(e => console.log('Audio play prevented'));
        
        // Generate hearts continuously
        setInterval(createHeart, 300);
    }, 1000);
}

// Show REJECT result
function showReject() {
    questionScreen.style.opacity = '0';
    
    setTimeout(() => {
        rejectText.textContent = `Your bad luck... ${userName} rejected you 💔`;
        rejectScreen.classList.add('active');
        sadMusic.play().catch(e => console.log('Audio play prevented'));
    }, 1000);
}

// Event Listeners
continueBtn.addEventListener('click', showQuestionScreen);

nameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        showQuestionScreen();
    }
});
