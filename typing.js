// set typing speed and wait times

var timeInit = 1000;     // initial wait before typing first line
var timeGap = 1000;      // wait time between each line
var timeChar = 40;       // time until next letter

var cursorChar = '&#9608;';

var originId = ['line1', 'line2'];
var originText = [];
for (var i = 0; i < originId.length; i++) {
  originText.push(document.getElementById(originId[i]).innerHTML);
}

var cursorLine = document.getElementById('cursor-line');

var currentTimeout;
var showCursor;

var typeWriter = function(index) {
  var loc = document.getElementById(originId[index]);
  var fullText = originText[index];
  var letter = 0;

  // this function types one letter per call, then calls the subsequent typeLetter()
  var typeLetter = function() {
    currentTimeout = setTimeout(function() {
      loc.className = 'visible';
      letter += 1;
      var showText = fullText.substring(0, letter);

      // stops the function from self-calling when all letters are typed
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
  var totalTime = fullText.length * timeChar + timeChar;
  showCursor = setTimeout(function() {
    document.getElementById('cursor-line').className = 'visible';
  }, totalTime);
};

var delayTime = [timeInit];
var cumulativeDelayTime = [timeInit];
for (var i = 0; i < originId.length; i++) {
  var elapsedTimeLine = originText[i].length * timeChar + timeGap + timeChar * 2;
  delayTime.push(elapsedTimeLine);
  var sum = 0;
  for (var j = 0; j < delayTime.length; j++) {
    sum += delayTime[j];
  };
  cumulativeDelayTime.push(sum);
};


var typeLineTimeout = new Array();
for (var i = 0; i < originId.length; i++) {
  typeLineTimeout[i] = setTimeout((function(index) {
    return function() {
      cursorLine.className = 'hidden';
      typeWriter(index);
    }
  })(i), cumulativeDelayTime[i]);

};

// stops all timeouts
var skip = function() {
  clearTimeout(currentTimeout);
  clearTimeout(showCursor);
  clearTimeout(typeLineTimeout);

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
