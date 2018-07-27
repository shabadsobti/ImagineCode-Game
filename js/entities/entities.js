/**
 * Player Entity
 */
game.PlayerEntity = me.Entity.extend({

    /**
     * constructor
     */
    init:function (x, y, settings) {
        // call the constructor
        this._super(me.Entity, 'init', [x, y, settings]);

        this.body.setVelocity(2, 2);

        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH, 0.1);

        this.alwaysUpdate = true;

        this.renderable.addAnimation("walk_right", [3, 7, 11, 15]);
        this.renderable.addAnimation("walk_left", [1, 5, 9, 13]);
        this.renderable.addAnimation("walk_up", [2, 6, 10, 14]);
        this.renderable.addAnimation("walk_down", [0, 4, 8, 12]);

        this.renderable.addAnimation("stand_r", [3]);
        this.renderable.addAnimation("stand_l", [1]);
        this.renderable.addAnimation("stand_u", [2]);
        this.renderable.addAnimation("stand_d", [0]);

        this.renderable.setCurrentAnimation("stand_r");

        //this.anchorPoint.set(-0, 0);

    },

    /**
     * update the entity
     */
    update: function (dt) {


        if (actionL == 1) {
            // flip the sprite on horizontal axis

            // update the entity velocity
            this.body.vel.x -= this.body.accel.x * me.timer.tick;

            // change to the walking animation
            if (!this.renderable.isCurrentAnimation("walk_left")) {
                this.renderable.setCurrentAnimation("walk_left");
            }

            frameNumL += 1;

            if(frameNumL == 45 && left == 1){
                actionL = 0;
                frameNumL = 0;
                this.renderable.setCurrentAnimation("stand_l");
                left = 0;
            }
            else if(frameNumL == 45){
                frameNumL = 0;
                --left;
            }


        }
        else if (actionR == 1) {

            // update the entity velocity
            this.body.vel.x += this.body.accel.x * me.timer.tick;

            // change to the walking animation
            if (!this.renderable.isCurrentAnimation("walk_right")) {
                this.renderable.setCurrentAnimation("walk_right");
            }

            frameNumR += 1;

            if(frameNumR == 45 && right == 1){
                actionR = 0;
                frameNumR = 0;
                this.renderable.setCurrentAnimation("stand_r");
                right = 0;
            }
            else if(frameNumR == 45){
                frameNumR = 0;
                --right;
            }
            //actionNum = 0;
        }

        else if (actionU == 1) {


            // make sure we are not already jumping or falling
            this.body.vel.y -= this.body.accel.y * me.timer.tick;

            // change to the walking animation
            if (!this.renderable.isCurrentAnimation("walk_up")) {
                this.renderable.setCurrentAnimation("walk_up");
            }

            frameNumU += 1;

            if(frameNumU == 45 && up == 1){
                actionU = 0;
                frameNumU = 0;
                this.renderable.setCurrentAnimation("stand_u");
                up = 0;
            }
            else if(frameNumU == 45){
                frameNumU = 0;
                --up;
            }

        }

        else if (actionD == 1) {

            // make sure we are not already jumping or falling
            this.body.vel.y += this.body.accel.y * me.timer.tick;

            // change to the walking animation
            if (!this.renderable.isCurrentAnimation("walk_down")) {
                this.renderable.setCurrentAnimation("walk_down");
            }

            frameNumD += 1;

            if(frameNumD == 45 && down == 1){
                actionD = 0;
                frameNumD = 0;
                this.renderable.setCurrentAnimation("stand_d");
                down = 0;
            }
            else if(frameNum == 45){
                frameNumD = 0;
                --down;
            }

        }

        else {
            this.body.vel.x = 0;
            this.body.vel.y = 0;

            // change to the standing animation
            this.renderable.setCurrentAnimation("stand_d");
        }



        // experimental ladder climbing method: does not work rn
        /*else if (actionNum == 4) {
            // unflip the sprite

            this.renderable.flipX(false);

            // update the entity velocity
            this.body.vel.y -= this.body.accel.y * me.timer.tick;

            // change to the walking animation
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
            }

            frameNum += 1;

            if (frameNum == 5) {
                actionNum = 0;
                frameNum = 0
                this.renderable.setCurrentAnimation("stand");
            }
            //actionNum = 0;
        }*/

        // apply physics to the body (this moves the entity)
        this.body.update(dt);

        // handle collisions against other shapes
        me.collision.check(this);

        // return true if we moved or if the renderable was updated
        return (this._super(me.Entity, 'update', [dt]) || this.body.vel.x !== 0 || this.body.vel.y !== 0);
    },

    /**
     * colision handler
     * (called when colliding with other objects)
     */
    onCollision: function (response, other) {
        // Make all other objects solid

        return true;
    }



});
