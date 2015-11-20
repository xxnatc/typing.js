var typing = {
  options: {
    timeInit: 1000,     // initial wait before typing first line
    timeGap: 1000,      // wait time between each line
    timeChar: 40,       // time until next letter

    cursorChar: '&#9608;', 
    prefix: '&gt;&gt; ',
    
    skip: true,
    skipKeys: [13, 32]   // default trigger keys are spacebar and enter
  }
};

typing.typewriter = function(index) {
  var loc = document.getElementById(this.originId[index]);
  var fullText = this.originText[index];
  var letterCount = 0;

  // this function spits out one letter per call, then calls the subsequent typeLetter()
  var typeLetter = function() {
    typing.currentTimeout = setTimeout(function() {
      loc.className = 'visible';
      letterCount += 1;
      var showText = fullText.substring(0, letterCount);

      if (letterCount === fullText.length) {
        loc.innerHTML = typing.options.prefix + showText;
      } else {
        loc.innerHTML = typing.options.prefix + showText + '<span class="typed-cursor">' + typing.options.cursorChar + '</span>';
        typeLetter();
      }
    }, typing.options.timeChar);
  };
  typeLetter();

  // show cursor on next line
  var totalTime = fullText.length * typing.options.timeChar + typing.options.timeChar;
  typing.showCursor = setTimeout(function() {
    typing.cursorLine.className = 'visible';
  }, totalTime);
};

typing.initiate = function(listId) {
  this.originId = listId;
  this.originText = new Array();
  for (var i = 0; i < listId.length; i++) {
    this.originText.push(document.getElementById(listId[i]).innerHTML);
  };
  this.cursorLine = document.getElementById('cursor-line');
  
  this.currentTimeout;
  this.showCursor;

  // calculated time delays
  this.delayTime = [this.options.timeInit];
  this.cumulativeDelayTime = [this.options.timeInit];
  for (var i = 0; i < listId.length; i++) {
    var elapsedTimeLine = this.originText[i].length * this.options.timeChar + this.options.timeGap + this.options.timeChar * 2;
    this.delayTime.push(elapsedTimeLine);
    var sum = 0;
    for (var j = 0; j < this.delayTime.length; j++) {
      sum += this.delayTime[j];
    };
    this.cumulativeDelayTime.push(sum);
  };

  // calls setTimeout for each line
  this.typeLineTimeout = new Array();
  for (var i = 0; i < listId.length; i++) {
    this.typeLineTimeout[i] = setTimeout((function(index) {
      return function() {
        document.getElementById('cursor-line').className = 'hidden';
        typing.typewriter(index);
      }
    })(i), this.cumulativeDelayTime[i]);
  };

};

if (typing.options.skip) {
  // stops all timeouts
  typing.stop = function() {
    clearTimeout(this.currentTimeout);
    clearTimeout(this.showCursor);
    for (var i = 0; i < this.typeLineTimeout.length; i++) {
      clearTimeout(this.typeLineTimeout[i]);
    };
  };

  // rewrite text with value stored on page load
  typing.rewrite = function(element, index, array) {
    var loc = document.getElementById(element);
    loc.innerHTML = typing.options.prefix + typing.originText[index];
    loc.className = 'visible';
  };

  // trigger stop and rewrite on pressing specified keys
  window.onkeydown = function(key){
    if (typing.options.skipKeys.indexOf(key.which) > -1) {
      typing.stop();
      typing.originId.forEach(typing.rewrite);
      typing.cursorLine.className = 'visible';
    }
  };
};


typing.initiate(['line1', 'line2', 'line3']);
