// set typing speed and wait times

var timeInit = 1000;     // initial wait before typing first line
var timeGap = 1000;      // wait time between each line
var timeChar = 70;       // time until next letter

var cursorChar = '&#9608;';

var originText = [document.getElementById('line1').innerHTML, document.getElementById('line2').innerHTML];

var currentTimeout;
var showCursor;

var typeWriter = function(id, index) {
  var loc = document.getElementById(id);
  var fullText = originText[index];
  var letter = 0;

  // this function types one letter per call, then calls the subsequent typeLetter()
  var typeLetter = function() {
    currentTimeout = setTimeout(function() {
      loc.className = 'visible';
      letter += 1;
      var showText = fullText.substring(0, letter);

      // stops the function from recurring when all letters are typed
      if (letter === fullText.length) {
        loc.innerHTML = '&gt;&gt; ' + showText;
      } else {
        loc.innerHTML = '&gt;&gt; ' + showText + '<span class="typed-cursor">' + cursorChar + '</span>';
        typeLetter();
      }
    }, timeChar);
  };
  typeLetter();

  // show cursor on next line
  var totalTime = fullText.length * timeChar + 100;
  showCursor = setTimeout(function() {
    document.getElementById('cursor-line').className = 'visible';
  }, totalTime);
};

var typeLine1 = setTimeout(function() {
  document.getElementById('cursor-line').className = 'hidden';
  typeWriter('line1', 0);
}, timeInit);

var delayTime1 = timeInit
  + originText[0].length * timeChar
  + 50 + timeGap;

var typeLine2 = setTimeout(function() {
  document.getElementById('cursor-line').className = 'hidden';
  typeWriter('line2', 1);
}, delayTime1);

var delayTime2 = originText[1].length * timeChar + timeGap;

// specific for index.html
var showLogin;
if (document.getElementById('agent-login')) {
  showLogin = setTimeout(function() {
    document.getElementById('agent-login').className = 'visible';
  }, delayTime1 + delayTime2);
}

// Specific for Fail.html
var showReturnButton;
if (document.getElementById('return-button')) {
  showReturnButton = setTimeout(function() {
    document.getElementById('return-button').className = 'visible';
  }, delayTime1 + delayTime2);
}

// stops all timeouts
var skip = function() {
  clearTimeout(currentTimeout);
  clearTimeout(showCursor);
  clearTimeout(typeLine1);
  clearTimeout(typeLine2);
  clearTimeout(showLogin);
};

// rewrite text with value stored on page load
var rewriteText = function(id, index) {
  var loc = document.getElementById(id);
  loc.innerHTML = '&gt;&gt; ' + originText[index];
  loc.className = 'visible';
};

// trigger skip and rewrite on pressing enter or spacebar
// $(document).keypress(function(key){
window.onkeydown = function(key){
  if (key.which === 13 || key.which === 32) {
    skip();
    rewriteText('line1', 0);
    rewriteText('line2', 1);
    document.getElementById('cursor-line').className = 'visible';
    
    // restoring element specific to page
    if (document.getElementById('agent-login')) {
      document.getElementById('agent-login').className = 'visible';
    }
    if (document.getElementById('return-button')) {
      document.getElementById('return-button').className = 'visible';
    }
  }
};
