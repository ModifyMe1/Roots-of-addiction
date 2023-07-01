document.addEventListener("DOMContentLoaded", function() {
  // Retrieve necessary elements from the DOM once it's loaded
  const chatLog = document.getElementById("chat-log");// display chat messages
  const userMessageInput = document.getElementById("user-message");//input field where user types messages
  const aggressiveModeButton = document.getElementById("aggressive-mode");//aggressiveMode radio button

  // boolean to track aggressive mode
  let isAggressiveMode = false;

  // Function to add a message, sender parameters to the chat log
  function addMessageToChatLog(message, sender) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");
    //set the right text content dependent on the sender
    if (sender === "User") {
      messageElement.textContent = sender + ": " + message;
    } else if (sender === "Bot") {
      messageElement.classList.add("bot-message"); //  CSS class to bot-message
      messageElement.textContent = sender + ": " + message;//add message
    }
    
    chatLog.appendChild(messageElement);//append the message to chat log
    chatLog.appendChild(document.createElement("br")); // Add a line break after each message
  }

  // Function to handle user message submission
  function handleUserMessage() {                           //message hanler
    const userMessage = userMessageInput.value.trim();     //trims user input

    if (userMessage !== "") {
      addMessageToChatLog(userMessage, "User");             //adds message to chat log

      // Generate a bot response with a delay
      setTimeout(function() {
        let botResponse;
        if (isAggressiveMode) {                              //generate bot response normal or aggressive
          botResponse = generateAggressiveBotResponse();
        } else {
          botResponse = generateBotResponse();
        }
        addMessageToChatLog(botResponse, "Bot");                          //add to the log
      }, 1000); // Delay of 1 second (1000 milliseconds)to slow responses

      userMessageInput.value = "";
    }
  }

  //  random bot response function
  function generateBotResponse() {                           //bot response selected from array random
    const randomResponses = [
      "I understand.",
      "Tell me more.",
      "How does that make you feel?",
      "Have you tried seeking professional help?",
      "Take it one day at a time.",
      "Stay strong and stay focused.",
      "You are not alone in this journey."
    ];

    const randomIndex = Math.floor(Math.random() * randomResponses.length);   
    return randomResponses[randomIndex];
  }

  // Function to generate an aggressive bot response
  function generateAggressiveBotResponse() {
    const aggressiveResponses = [
      "“Believe you can, and you’re halfway there.” – Theodore Roosevelt",     // Bot response encouragment changed the sign from aggressive.
      "“Success is the sum of small efforts, repeated day in and day out.” – Robert Collier",
      "“Either you run the day, or the day runs you.” – Jim Rohn",
      "“All the suffering, stress, and addiction comes from not realizing you already are what you are looking for. “– Jon Kabat-Zinn",
	  "“The most common way people give up their power is by thinking they don’t have any.” – Alice Walker"
	];

    const randomIndex = Math.floor(Math.random() * aggressiveResponses.length);
    return aggressiveResponses[randomIndex];
  }

  // Event listener for Enter key press in the input field
  userMessageInput.addEventListener("keydown", function(event) {   //keydown event listener to call handleUserMessage if Entre key hit
    if (event.key === "Enter") {
      handleUserMessage();
    }
  });

  // Event listener for aggressive mode button click
  aggressiveModeButton.addEventListener("click", function() { //second event listener to handle if radio button is clicked
    isAggressiveMode = aggressiveModeButton.checked;
  });
});
//add a fade in function to bot to enhance the appearence, duration (ms) and opacity updated every 10 ms with interval variable.
function fadeIn(element, duration) {
  let opacity = 0;
  const interval = 10; // Interval between opacity increments (in milliseconds)
  const increment = 1 / (duration / interval);

  element.style.opacity = opacity;
  element.style.display = "block";

  const fadeInterval = setInterval(function() {
    opacity += increment;
    element.style.opacity = opacity;

    if (opacity >= 1) {
      clearInterval(fadeInterval);
    }
  }, interval);
}

const element = document.getElementById("chat-container");
fadeIn(element, 1000); // Fade in the element over 1000 milliseconds (1 second)
