$(document).ready(function() {
    // Character array
    var characters = ["Daenerys Targaryen", "Jon Snow", "Gregor Clegane", "Cersei Lannister", "Tyrion Lannister", "Arya Stark", 
    "Sansa Stark", "Khal Drodo", "Joffrey Baratheon", "Petyr Baelsih", "Sandor Clegane", "Eddard Stark", "Melisandre", "Jamie Lannister",
    "Ramsey Bolton", "Margaery Tyrell", "Brienne of Tarth", "Theon Greyjoy", "Ygritte", "Rob Stark", "Bronn", "Bran Stark", "Shae", "Stannis Baratheon",
    "Lord Varys", "Gendry", "Daario Naharis", "Tormund Giantsbane", "Missanderi", "Oberyn Martel", "Jorah Mormont", "Gilly", "Samwell Tarly",
    "Catelyn Stark", "Jeor Mormont", "Tyene Sand", "Tommen Baratheon", "Jojen Reed", "Grey Worm", "Ellaria Sand", "Viserys Taragaryen", 
    "Davos Seaworth", "Walder Frey", "Robert Baratheon", "Tywin Lannister", "Mance Rayder", "Llyn Payne", "Roose Bolton"];

    //  Real Name array 
    var realName = ["Emilia Clarke", "Kit Harington", "Maisie Williams", "Sophie Turner", "Jason Momoa", " Jack Gleeson", "Lena Headey", "Peter Dinklage",
    "Aiden Gillen", "Rory McCann", "Sean Bean", "Iwan Rheon", "Natalie Dormer", "Alfie Allen", "Richard Madden", "Rose Leslie","Jerome Flynn",
    "Issac Hempster", "Sibel Kekilli", "Joe Dempsie", "Michael Huisman", "Kristofer Hivju", "Pedro Pascal", "Hannah Murray", "Lain Glen", "John Bradley",
    "Michelle Fairley", "Indira Varma", "Harry Lloyd", "Nell Tiger Free", "Art Parkinson", "Charles Dance"];

    // Alphabet array
    var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

   
    // Holds all the correct guesses
    var correctGuesses = [];

    // Holds all the incorrect guesses
    var wrongGuesses = [];

    // ========================================================== Varibles =======================================================================

    //Random Selection in the characters array
    var randCharChosen = " ";

    //Random Selection in the characters array
    var randRealChosen = " ";

    // This will be the number of empty spaces basic on the letters
 
   

    // Counter variables
    var winCounter = 0;
    var lossCounter = 0;
    var defaultNumGuesses = 9;
    
    

    // ========================================================== Functions ======================================================================
  leftSide();
    // ------------------------------------------
    function leftSide(){
        $("#score").hide();

        $("#hidden").on("click", function(){
            $("#hide").hide();
            $("#score").show();

        });

        $("#unhide").on("click", function(){
            $("#score").hide();
            $("#hide").show();

        });
    }

function startOfGame(gameArray){ 
  $("#empty-words").empty();
  var randId = Math.floor(Math.random() * gameArray.length);
  var character = gameArray.splice(randId, 1)[0];
    
  // Logging character to the console
  console.log(character);
  
  //looping _'s
  for(var j = 0; j < character.length; j++){
    var tag = $("<span>");
    tag.addClass("game-letter");
    if(character[j] === " "){
      tag.text(" ");
    }else{
    tag.text("_");
    tag.attr("data-letter", character[j].toUpperCase());

    console.log(character[j]);

    }

    $("#empty-words").append(tag);
  }

  wrongGuesses = [];

  
    $("#guesses-left").removeClass("red");
  


}

startOfGame(characters);  






    // ============================== Loop =========================================

    for (var i = 0; i < alphabet.length; i++) {

        var letterButton = $("<button>");

        letterButton.addClass("button-color letter");

        letterButton.attr("data-letter", alphabet[i]);

        letterButton.text(alphabet[i]);

        $("#buttons").append(letterButton);

        console.log(letterButton);

    }
    // ========================================================================

    $("button.letter").on("click", function(){
      console.log("Button clicked ");
      var letter = $(this).attr("data-letter");

      for(var i = 0; i < wrongGuesses ; i++){
        if(letter === wrongGuesses[i]){
          console.log("Letter chosen " + letter);
          // return wrong guess
          return;
          
        }
        
      }

      checkLetter(letter);
      $("#guesses-left").text(defaultNumGuesses - wrongGuesses.length);

    });


function checkLetter(letter){

  var letterValid = false;

  console.log("Checking letter " + letter);

  $(".game-letter").each(function(){

    var letterToChecker = $(this).attr("data-letter");

    console.log("About to check letter chosen " + letter);
    console.log("Letter to check " + letterToChecker);

    if(letterToChecker === letter){
      console.log("Updating game board with " + letter);
      $(this).text(letter);

      letterValid = true;

      if($("#empty-words span:contains('_')").length === 0){
        alert("You win, play again");
        
        winCounter++;
        console.log(winCounter);
        $("#win-counter").text(winCounter);


        startOfGame(characters);
      }

    }
  });


  // Update number of attempts
  if(letterValid === false){
    
      if(wrongGuesses.includes(letter) === false){
        wrongGuesses.push(letter);
      }
   console.log(wrongGuesses.length + " " + defaultNumGuesses)

    if(wrongGuesses.length === defaultNumGuesses){
      lossCounter++;
      console.log(lossCounter);
      $("#loss-counter").text(lossCounter);

      if( confirm("You lose. Do you what to play again?")){
        startOfGame(characters);  
      }

    }else{
      if(wrongGuesses.length > 6){
        $("#guesses-left").addClass("red");
      }
    }

    $("#wrong-guesses").text(wrongGuesses);
    
  }


 
   

  
}





  });