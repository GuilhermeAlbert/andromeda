/**
 * Gravity Game: JavaScript
 */

// Creating a game piece
var myGamePiece;

// Creating obstacles
var myObstacles = [];

// Creating a score
var myScore;

/**
 * Starts the game
 * 
 * @return void
 */
function startGame() {
    // Creating the main component 
    myGamePiece = new component(30, 30, "black", 10, 120);
    
    // Setting the gravity of the component
    myGamePiece.gravity = 0.05;

    // Creating the score design
    myScore = new component("15px", "Courier New", "black", 280, 40, "text");

    // Starting the area
    myGameArea.start();
}

/**
 * Create the canvas game area
 * 
 * @return void
 */
var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        
        // Setting the width
        this.canvas.width = 480;
        
        // Setting the height
        this.canvas.height = 270;
        
        // Setting the canvas context
        this.context = this.canvas.getContext("2d");
        
        // Inserting a child element before canvas
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        
        // Setting the frame to 0
        this.frameNo = 0;

        // Setting the interval to update game area
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        // Cleaning the canvas rect 
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

/**
 * Create the game component
 * 
 * @return void
 */
function component(width, height, color, x, y, type) {
    
    // Initializing the type
    this.type = type;

    // Initializing the score
    this.score = 0;

    // Initializing the width
    this.width = width;

    // Initializing the height
    this.height = height;

    // Initializing the speed X
    this.speedX = 0;

    // Initializing the speed Y
    this.speedY = 0;    

    // Initializing x
    this.x = x;

    // Initializing y
    this.y = y;

    // Initializing the gravity
    this.gravity = 0;

    // Initializing the gravity speed
    this.gravitySpeed = 0;

    // Creating the update function
    this.update = function() {

        // Initializing the canvas box
        ctx = myGameArea.context;

        // Conditional about text
        if (this.type == "text") {
            
            // Filling with font
            ctx.font = this.width + " " + this.height;
            
            // Filling with color
            ctx.fillStyle = color;

            // Setting the X and Y coordinate
            ctx.fillText(this.text, this.x, this.y);
        } else {
            // Filling with color
            ctx.fillStyle = color;

            // Filling with coordinates and width/height
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    // Creating a new position
    this.newPos = function() {
        // Initializing the gravity speed
        this.gravitySpeed += this.gravity;
        
        // Initializing the speed X
        this.x += this.speedX;
        
        // Initializing the speed Y
        this.y += this.speedY + this.gravitySpeed;
        
        // Setting the hit bottom
        this.hitBottom();
    }

    // Creating a hit bottom function
    this.hitBottom = function() {

        // Creating a rock bottom
        var rockbottom = myGameArea.canvas.height - this.height;
        
        // Conditional Y
        if (this.y > rockbottom) {
            
            // Setting rockbottom to y
            this.y = rockbottom;

            // Setting the rockbottom to 0
            this.gravitySpeed = 0;
        }
    }

    // Creating a crash with element
    this.crashWith = function(otherobj) {
        
        // Creating my left element
        var myleft = this.x;
        
        // Creating my right element
        var myright = this.x + (this.width);
        
        // Creating my top element
        var mytop = this.y;
        
        // Creating my bottom element
        var mybottom = this.y + (this.height);
        
        // Creating other left element
        var otherleft = otherobj.x;
        
        // Creating other right element
        var otherright = otherobj.x + (otherobj.width);
        
        // Creating other top element
        var othertop = otherobj.y;
        
        // Creating other bottom element
        var otherbottom = otherobj.y + (otherobj.height);
        
        // Setting crash to true
        var crash = true;

        // Setting crash to false according condition
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            
            // Setting crash to false
            crash = false;
        }

        // Returning crash value
        return crash;
    }
}

/**
 * Update the game area
 * 
 * @return void
 */
function updateGameArea() {

    // Setting the initial attributes
    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    
    // Loop of obstacles
    for (i = 0; i < myObstacles.length; i += 1) {
        
        // Setting crash with
        if (myGamePiece.crashWith(myObstacles[i])) {
            return;
        } 
    }

    // Cleaning the game area
    myGameArea.clear();
    
    // Creating a new frame 
    myGameArea.frameNo += 1;

    // Setting the interval according the frames
    if (myGameArea.frameNo == 1 || everyinterval(150)) {
        
        // Initializing the canvas width
        x = myGameArea.canvas.width;
        
        
        // Creating the minimal height
        minHeight = 20;
        
        // Creating maximum height
        maxHeight = 200;
        
        // Setting the height
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        
        // Creating the minimal gap
        minGap = 50;
        
        // Creating  the maximum gap
        maxGap = 200;
        
        // Setting the gap
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        
        // Creating obstacles with color and position over
        myObstacles.push(new component(10, height, "orange", x, 0));
        
        // Creating obstables under the main component
        myObstacles.push(new component(10, x - height - gap, "orange", x, height + gap));
    }

    // Creating a loop of obstacles
    for (i = 0; i < myObstacles.length; i += 1) {
        
        // Setting the obstacles
        myObstacles[i].x += -1;
        
        // Updating the obstacles 
        myObstacles[i].update();
    }

    // Printing the score
    myScore.text="SCORE: " + myGameArea.frameNo;
    
    // Update score
    myScore.update();

    // Set a new position to piece
    myGamePiece.newPos();

    // Update position
    myGamePiece.update();
}

/**
 * Setting the interval
 * 
 * @return void
 */
function everyinterval(n) {
    
    // Conditional to get the interval
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    
    // Returning value
    return false;
}

/**
 * Accelerate the canvas element for play
 * 
 * @return void
 */
function accelerate(n) {

    // Setting my game piece to n
    myGamePiece.gravity = n;
}