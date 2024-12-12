// game.js
let currentQuestionIndex = 0;
let userProgress = 0;
let userScore = 0;

const questionsDatabase = {
    "User Administration": [
        {
            question: "Which transaction code is used to create a new user in SAP?",
            options: ["SU01", "PFCG", "SM59", "ST22"],
            correctAnswer: "SU01"
        },
        {
            question: "What is the purpose of the SU53 transaction?",
            options: ["Display System Logs", "User Authorization Check", "Backup Management", "System Monitoring"],
            correctAnswer: "User Authorization Check"
        },
        {
            question: "What is the primary function of transaction PFCG?",
            options: ["Create Users", "Assign Roles to Users", "Monitor System Performance", "Manage Transport Requests"],
            correctAnswer: "Assign Roles to Users"
        },
        {
            question: "Which user type can log in to the SAP system without a user license?",
            options: ["Dialog User", "System User", "Service User", "Communication User"],
            correctAnswer: "Communication User"
        }
    ],
    "Transport Management": [
        {
            question: "What is the primary function of the Transport Directory in SAP?",
            options: ["Store transport requests", "Manage user roles", "Database backup", "System configuration"],
            correctAnswer: "Store transport requests"
        },
        {
            question: "Which transaction is used to release a transport request?",
            options: ["STMS", "SE09", "SM37", "SCC4"],
            correctAnswer: "SE09"
        },
        {
            question: "What is the purpose of transaction STMS?",
            options: ["Transport Management System", "System Monitoring", "User Authentication", "Backup and Restore"],
            correctAnswer: "Transport Management System"
        },
        {
            question: "In SAP, what is the name of the request type used for transporting roles and authorizations?",
            options: ["Workbench Request", "Customizing Request", "Transport Request", "Transport Directory"],
            correctAnswer: "Customizing Request"
        }
    ],
    "System Architecture": [
        {
            question: "What is the primary function of the SAP Kernel?",
            options: ["Manage Database Connections", "Handle User Logins", "Execute ABAP Programs", "Administer Transport Requests"],
            correctAnswer: "Execute ABAP Programs"
        },
        {
            question: "Which layer of SAP is responsible for the user interface?",
            options: ["Presentation Layer", "Application Layer", "Database Layer", "Integration Layer"],
            correctAnswer: "Presentation Layer"
        },
        {
            question: "In SAP, what is the purpose of the Central Instance?",
            options: ["Manage Application Server", "Host the Database", "Handle User Requests", "Manage Communication between Systems"],
            correctAnswer: "Manage Application Server"
        },
        {
            question: "Which component of the SAP architecture stores and retrieves data?",
            options: ["Application Server", "Database Server", "Web Server", "Gateway Server"],
            correctAnswer: "Database Server"
        }
    ]
};

// Event listener for login form submission
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username && password) {
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('main-menu').classList.remove('hidden');
    }
});

// Event listener for selecting a system
document.querySelectorAll('.system-button').forEach(button => {
    button.addEventListener('click', function() {
        const system = this.getAttribute('data-system');
        startQuiz(system);
    });
});

// Function to start the quiz for a selected system
function startQuiz(system) {
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('quiz-screen').classList.remove('hidden');
    document.getElementById('progress-screen').classList.add('hidden');
    currentQuestionIndex = 0;
    userScore = 0;  // Reset score at the start of each new system
    displayQuestion(system);
    updateScore();
}

// Function to display a question
function displayQuestion(system) {
    const questionData = questionsDatabase[system][currentQuestionIndex];
    document.getElementById('question-text').innerText = questionData.question;
    const optionsList = document.getElementById('options-list');
    optionsList.innerHTML = '';

    questionData.options.forEach(option => {
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.innerText = option;
        button.addEventListener('click', function() {
            checkAnswer(system, option);
        });
        li.appendChild(button);
        optionsList.appendChild(li);
    });
}

// Function to check the selected answer
function checkAnswer(system, selectedOption) {
    const correctAnswer = questionsDatabase[system][currentQuestionIndex].correctAnswer;

    if (selectedOption === correctAnswer) {
        userScore += 10; // Increase score for correct answer
        alert("Correct Answer!");
    } else {
        // If answer is wrong, show the correct answer
        alert(`Wrong Answer! The correct answer is: ${correctAnswer}`);
    }

    // After the user has answered, show the next question or finish
    currentQuestionIndex++;

    if (currentQuestionIndex < questionsDatabase[system].length) {
        displayQuestion(system);  // Display the next question
    } else {
        alert("You have completed this section!");
        document.getElementById('quiz-screen').classList.add('hidden');
        document.getElementById('progress-screen').classList.remove('hidden');
        showFinalScore();
    }

    updateScore();  // Update the score after each answer
}

// Function to update the score
function updateScore() {
    document.getElementById('score').innerText = `Score: ${userScore}`;
}

// Function to display the final score
function showFinalScore() {
    const scorePercentage = (userScore / (questionsDatabase[Object.keys(questionsDatabase)[0]].length * 10)) * 100;
    document.getElementById('progress-bar').value = scorePercentage;
    document.getElementById('progress-bar').max = 100;
}
