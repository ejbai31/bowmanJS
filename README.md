## BowmanJS 

### Introduction

BowmanJS is modeled after the popular flashgame Bowman. The user is able to control a single archer and take aim with his bow and arrow. Using a touchpad/mouse, they can determine the velocity of the arrow as well as the angle. Game physics will be applied to determine arrow flight patterns. 

Users will be able to shoot at a target some distance away. They will score points based on what part of the target they hit. They will have a limited number of tries to score as many points as they can. 

### Functionality & MVP

Users will be able to:

- [ ] Shoot arrows at varying velocities and angles
- [ ] Score points based on their projectile's end point
- [ ] Have audio feedback on actions
- [ ] Reset the game state at any time by pressing the restart button

### Architecture and Technologies 

This application will use the following:

- Vanilla JavaScript for overall structure and game logic
- HTML5 Canvas for DOM manipulation and rendering of objects
- Howler.js to play various sound sprites 
- Webpack to bundle and serve up the various scripts

### Implementation Timeline 

**Over the weekend**:
- [ ] read through canvas tutorials (again)
- [ ] read through howler.js documentation and import sound sprites to library

**Day 1**:
- [ ] render basic images upon cavas
- [ ] (try) to implement basic physics on objects across screen
- [ ] implement user inputs to input values for velocity and angle

**Day 2**:
- [ ] incorporate physics to arrow flight 
- [ ] time sounds with actions (such as arrow release and arrow hit)

**Day 3**:
- [ ] implement scoring system with target object
- [ ] set limit on arrows/attempts


**Day 4**:
- [ ] create reset button to restart game
- [ ] create audio enable/disable button
- [ ] style with a "how to" panel showing general game controls

### Bonus Features 

- [ ] implement web sockets for multiplayer mode 
- [ ] set a scoreboard 
- [ ] render different target variations, such as moving targets or "fun" targets (like balloons)