# Frontend Mentor Challenge - Rock, Paper, Scissors

![Design preview for the Rock, Paper, Scissors coding challenge](./design/desktop-preview.jpg)

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the game depending on their device's screen size
- Play Rock, Paper, Scissors against the computer
- Maintain the state of the score after refreshing the browser _(optional)_
- **Bonus**: Play Rock, Paper, Scissors, Lizard, Spock against the computer _(optional)_

### Screenshot

Mobile design

![](./design/screenshot.jpg)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first workflow
- [Angular](https://angular.io/) - JS Framework library

### What I learned

I learned to manage race conditions by ordering tasks so that they don't interfere with each other. 
Using Angular compared to vanilla JS more than likely added a few extra get/set functions that make it
a little over complicated for the task but was a good "excuse" to learn a JS framework.

I learned to manage component state and making them responsive on a plethora of devices. A powerhouse
to accomplish this was the powerful CSS function clamp().

### Continued development

Modifying DOM elements directly using .nativeElement is very likely not a good idea in a security sensitive application.
Moving state modification to a Angular renderer2 seems to be an easy.

### Directions to run

Simply clone the project and through your terminal run in the directory

```
ng serve
```

Then go to your favorite browser and run the project through port 4200 (or whatever your terminal tells you)

```
localhost:4200
```

### Useful resources

- [Mozilla Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/clamp) - Incredible resource and reference for CSS Functions.
- [CSS Tricks](https://css-tricks.com/min-max-and-clamp-are-css-magic) - Mind bending CSS Jiu Jitsu!
