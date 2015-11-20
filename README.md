# typing.js
Typing.js is a typewriter animation written with vanilla JavaScript.

## How to Use

## Functionalities
Below is a brief summary of functionalities. 
<!-- For detailed documentation and examples, please visit _.  -->
#### Customizations
###### Typing Speed and Wait Time
```
typing.options.timeGap = 1200;
typing.options.timeChar = 40;
```
###### Prefix Characters
```
typing.options.prefix = '&gt;&gt; ';
```

###### Text Cursor Character
```
typing.options.cursorChar = '&#9608;';
```

###### End Cursor
```
typing.options.endCursor = true;
```

#### Skip Function
###### Toggle Skip Function
The skip function is enabled by default. To disable it, simply change the configurated value to `false`.
```
typing.options.skipOn = true;
```

###### Customize Keypress Trigger
The default set of keys that triggers the skip function includes enter and spacebar. 

```
typing.options.skipKeys = [13, 32];
```
You can add to or change the set by passing the respective JavaScript key codes in an array. Look up the key codes [here](http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes).

## Limitations
This version is currently limited to one set of typewriting text per load. Multiple typewriters will be added in future updates.

Text are editable through HTML, however, using any HTML tags inside the active text wrapping tags will result in a slight glitch during the animation. The full text will eventually be shown but there will be a delay when processing and typing HTML tags.

## Changelogs

## Licensing
