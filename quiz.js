const quizQuestions = [
    {
        question: "CREEEAKK! A hidden door just opened in the corner of your room. Behind, you see a cozy fire crackling and twinkling lights across the ceiling. What do you do first?",
        image: "",
        options: [
            {text: "Pick up the coat rack by the door...just in case.", type: "A"},
            {text: "Take a peek at the enchanted library to see if you can learn any spells.", type: "B"}
        ]
    },
    {
        question: "There's a tap at the window and a talking...squirrel? It sounds like its inviting you to a cafe! What do you order?",
        image: "",
        options: [
            {text: "A pumpkin spice latte brewed by the woodland creatures, with cinammon magic dusted on top.", type: "B"},
            {text: "An herbal tea to ground you. You need to relax after so much magical goodness!", type: "A"}
        ]
    },
    {
        question: "You discover a village hidden in the mist. A local vendor offers you a warm blanket as a welcome gift. Which do you choose?",
        image: "",
        options: [
            {text: "A knitted blanket woven by the vendor's wife. He says its her favorite.", type: "B"},
            {text: "A soft quilt that feels like home. It smells like cookies too!", type: "A"}
        ]
    },
    {
        question: "It starts to rain and everyone goes home. You go back to your enchanted cabin too. What's the first thing you do?",
        image: "",
        options: [
            {text: "Wrap yourself in your new blanket and sit in the cozy armchair.", type: "A"},
            {text: "Look for food in the magical pantry. All this exploring made you hungry!", type: "B"}
        ]
    },
    {
        question: "As night falls, an enchanted breeze blows through the cabin, carrying the scent of magic. What candle does it light for you?",
        image: "",
        options: [
            {text: "A woodsy scent that fills the room with the sound of different forest friends telling stories.", type: "A"},
            {text: "A sugary vanilla candle that reminds you of fresh baked treats!", type: "B"}
        ]
    },
    {
        question: "You wake up to the sound of birds chirping and the TV playing. You realize you're back in your room...",
        image: "",
        options: [
            {text: "I wish to go back! (The door magically appears once again)", type: "_B"},
            {text: "That...was a crazy dream.", type: "_A"}
        ]
    }
]

const optionCounts = {
    A: 0,
    B: 0,
    _A: 0,
    _B: 0
};

let currentQuestion = 0; // Track the current question
const quizContainer = document.getElementById('quiz');
const homepage = document.getElementById('home');

document.getElementById('start-button').addEventListener('click', function() {
    homepage.style.display = 'none'; // Hide the homepage
    quizContainer.style.display = 'block'; // Show the quiz container
    showQuestion(); // Call the function to display the questions
});

// Function to display a question
function showQuestion() {
    // Clear previous content
    quizContainer.innerHTML = '';

    // Get the current question from quizQuestions
    const questionObj = quizQuestions[currentQuestion];

    // Question element
    const questionElement = document.createElement('div');
    questionElement.classList.add('question');
    questionElement.textContent = questionObj.question;
    quizContainer.appendChild(questionElement);

    // For each option, create a button
    const optionsContainer = document.createElement('div');
    optionsContainer.classList.add('options-container');
    
    questionObj.options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.textContent = option.text;

        // Add click event to capture the selected answer
        optionElement.addEventListener('click', () => {
            handleAnswer(option.type);
        });

        optionsContainer.appendChild(optionElement);
    });

    quizContainer.appendChild(optionsContainer);
}

// Handle the user's answer and proceed to the next question
function handleAnswer(type) {
    if (type === 'A') {
        optionCounts.A++;
    } else if (type === 'B') {
        optionCounts.B++;
    } else if (type === '_A') {
        optionCounts._A++;
    } else if (type === '_B') {
        optionCounts._B++;
    }

    // Move to the next question
    currentQuestion++;

    // Check if there are more questions
    if (currentQuestion < quizQuestions.length) {
        showQuestion();
    } else {
        showResults(); // Show the results when the quiz is complete
    }
}

// Function to display the final results
// I did use ChatGPT for help on the "whimsical" answers because it's midterm szn mannnn

function showResults() {
    quizContainer.innerHTML = '';
    const headingElement = document.createElement('h2');
    headingElement.textContent = 'Your Cozy Personality Result'; // Heading text
    quizContainer.appendChild(headingElement);
    
    let resultText = '';
    let chaosLevel = '';
    let description = '';

    //Disclaimer: The logic is a little wonky but all personalities are achievable!
    if (optionCounts.B == 4) {
        resultText = "The Whimsical Adventurer"; // Most answers B -> level 5
        chaosLevel = '5';
        description = 'Here comes the merry maker of mischief! You thrive on spontaneity, always ready to embark on delightful escapades. With a flair for themed gatherings and a love for cozy cafes, you sprinkle a touch of magic wherever you go. Whether it’s a costumed movie night or a spontaneous adventure, you infuse joy and laughter into every cozy moment!';
    } else if (optionCounts.B == 5 && optionCounts._B == 1) {
        resultText = "The Festive Host"; // Mostly B plus B boost -> level 6
        chaosLevel = '6';
        description = 'Welcome the enchanting maestro of merriment! You are the heart of every celebration, orchestrating grand gatherings filled with laughter, games, and twinkling lights. Your home transforms into a joyful carnival, where cookies bake, melodies play, and friends come together in a whirlwind of warmth and fun. Here, chaos is a delightful dance of festivities and cozy joy!';
    }else if (optionCounts.A == 4) {
        resultText = "The Calm Companion"; // Most answers A -> level 2
        chaosLevel = '2';
        description = 'Say hello to the gentle gatherer! You love to invite friends into your cozy cocoon for laughter-filled evenings of games and film escapades. Picture twinkling fairy lights and the soft rustle of blankets as you share tales over steaming mugs of cocoa. Your home is a sanctuary of warmth, where joy dances quietly in the air.';
    } else if (optionCounts.B > optionCounts.A && optionCounts._A == 1) {
        resultText = "The Scented Baker"; // Equal answers -> level 4
        chaosLevel = '4';
        description = 'Meet the delightful alchemist of the kitchen! With a sprinkle of flour and a dash of whimsy, you whip up sweet delights that enchant the senses. Picture an aromatic wonderland where laughter and frosting collide, as friends gather for spirited baking parties. The result? A deliciously chaotic kitchen filled with joy and treats that warm the heart!';
    } else if (optionCounts.A > optionCounts.B  && optionCounts._B == 1) {
        resultText = "The Cozy Crafter"; // More A than B -> level 3
        chaosLevel = '3';
        description = 'Behold the crafty conjurer of creativity! With a rainbow of yarn and a sprinkle of imagination, you transform ordinary days into whimsical wonderlands. Your abode is a treasure trove of colorful supplies, where friends gather for crafting escapades, giggling over glue sticks and glitter. Here, delightful chaos reigns, and every creation is a masterpiece of warmth!';
    } else if (optionCounts.A == 5 && optionCounts._A == 1) {
        resultText = "The Tranquil Observer"; // Mostly A plus A boost -> level 1
        chaosLevel = '1';
        description = 'Meet the serene sage of stillness! With a twinkle in your eye, you cozy up in your favorite nook, where the whispers of a good book and the gentle hum of nature create a symphony of peace. Armed with a steaming cup of herbal tea, you bask in the soft glow of twilight, cherishing moments of solitude like rare gems.';
    } else {
        resultText = "You didn't fit any profile!"; // Optional fallback
        chaosLevel = 'Unpredictable';
        description = 'Looks like you are extra special! You don\'t fit in any of our predefined personalities, meaning you are a magical unicorn!';
    }

    // Personality title element
    const titleElement = document.createElement('h3');
    titleElement.textContent = resultText; // Set the personality title
    quizContainer.appendChild(titleElement);

    // Chaos level element
    const chaosElement = document.createElement('p');
    chaosElement.textContent = `Chaos Level: ${chaosLevel}`; // Set the chaos level
    quizContainer.appendChild(chaosElement);

    // Description element
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = description; // Set the description
    quizContainer.appendChild(descriptionElement);

}