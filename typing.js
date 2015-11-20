var typing = {
  options: {
    // timeInit: 100,      // wait time before initiating typewriter
    timeGap: 1200,      // idle time before typing each line
    timeChar: 40,       // time until next letter

    cursorChar: '&#9608;', 
    prefix: '&gt;&gt; ',

    skip: true,
    skipKeys: [13, 32],   // default trigger keys are spacebar and enter

    endCursor: false
  }
};

typing.typewriter = function(index) {
  var loc = document.getElementById(this.originId[index]);
  var fullText = this.originText[index];
  var letterCount = 0;

  var typeIdle = function() {
    loc.className = 'visible';
    loc.innerHTML = typing.options.prefix + '<span class="typed-cursor">' + typing.options.cursorChar + '</span>';
  };

  this.currentTimeout;
  // this function spits out one letter per call, then calls the subsequent typeLetter()
  var typeLetter = function() {
    typing.currentTimeout = setTimeout(function() {
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

  typeIdle();
  if (fullText) {
    this.idleWaitTimeout = setTimeout(typeLetter, typing.options.timeGap);
  }
};

typing.initiate = function(listId) {
  this.originId = listId;
  this.originText = new Array();
  for (var i = 0; i < listId.length; i++) {
    this.originText.push(document.getElementById(listId[i]).innerHTML);
  };

  // calculated time delays
  this.delayTime = [0];
  this.cumulativeDelayTime = [0];
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
        typing.typewriter(index);
      }
    })(i), this.cumulativeDelayTime[i]);
  };

};

if (typing.options.skip) {
  // stops all timeouts
  typing.stop = function() {
    clearTimeout(this.idleWaitTimeout);
    clearTimeout(this.currentTimeout);
    for (var i = 0; i < this.typeLineTimeout.length; i++) {
      clearTimeout(this.typeLineTimeout[i]);
    };
  };

  // rewrite text with value stored on page load
  typing.rewrite = function(index) {
    var loc = document.getElementById(typing.originId[index]);
    loc.innerHTML = typing.options.prefix + typing.originText[index];
    if ((index === typing.originId.length - 1) && typing.options.endCursor) {
      loc.innerHTML += '<span class="typed-cursor">' + typing.options.cursorChar + '</span>';
    }
    loc.className = 'visible';
  };

  // trigger stop and rewrite on pressing specified keys
  window.onkeydown = function(key){
    if (typing.options.skipKeys.indexOf(key.which) > -1) {
      typing.stop();
      // typing.originId.forEach(typing.rewrite);

      for (var i = 0; i < typing.originId.length; i++) {
        typing.rewrite(i);
      };
    }
  };
};

typing.initiate(['line1', 'line2', 'line3']);
