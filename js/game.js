var actionR = 0;
var actionL = 0;
var actionU = 0;
var actionD = 0;
var right = 0;
var left = 0;
var up = 0;
var down = 0;
var frameNumR = 0;
var frameNumL = 0;
var frameNumU = 0;
var frameNumD = 0;

var frameNum = 0;
var actionNum = 0;
/* game namespace */


var moveRight = function () {
    actionR = 1;
    if(right == 0){
        right = 1;
    }
    else{
        right += 1;
    }


};

var moveLeft = function () {
    actionL = 1;
    if (left == 0) {
        left = 1;
    }
    else {
        left += 1;
    }
};

var moveUp = function () {
    actionU = 1;
    if(up == 0){
        up = 1;
    }
    else {
        up += 1;
    }
};

var moveDown = function () {
    actionD = 1;
    if(down == 0){
        down = 1;
    }
    else {
        down += 1;
    }
}


var game = {
    /**
     * an object where to store game global data
     */
    data: {
        score: 0
    },



    // Run on page load.
    onload: function () {
        // Initialize the video.
        if (!me.video.init(640, 480, { wrapper: "screen", scale: "auto", scaleMethod: "flex-width" })) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // add "#debug" to the URL to enable the debug Panel
        if (me.game.HASH.debug === true) {
            window.onReady(function () {
                me.plugin.register.defer(this, me.debug.Panel, "debug", me.input.KEY.V);
            });
        }

        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // Set a callback to run when loading is complete.
        me.loader.onload = this.loaded.bind(this);

        // Load the resources.
        me.loader.preload(game.resources);

        // Initialize melonJS and display a loading screen.
        me.state.change(me.state.LOADING);
    },

    // Run on game resources loaded.
    loaded: function () {
        // set the "Play/Ingame" Screen Object
        me.state.set(me.state.PLAY, new game.PlayScreen());

        // register our player entity in the object pool
        me.pool.register("mainPlayer", game.PlayerEntity);

        // enable the keyboard
        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.SPACE, "jump", true);

        // start the game
        me.state.change(me.state.PLAY);
    },

    
};
