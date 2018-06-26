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

        this.body.setVelocity(2, 15);

        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH, 0.1);

        this.alwaysUpdate = true;

        this.renderable.addAnimation("walk", [0, 1, 2, 3, 4, 5, 6, 7]);

        this.renderable.addAnimation("stand", [0]);

        this.renderable.setCurrentAnimation("stand");
        
        this.anchorPoint.set(-0.4, 0);

    },

    /**
     * update the entity
     */
    update: function (dt) {


        if (actionNum == 1) {
            // flip the sprite on horizontal axis
            this.renderable.flipX(true);

            // update the entity velocity
            this.body.vel.x -= this.body.accel.x * me.timer.tick;

            // change to the walking animation
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
            }

            frameNum += 1;

            if(frameNum == 30){
              actionNum = 0;
              frameNum = 0
            }


        }
        else if (actionNum == 2) {
            // unflip the sprite

            this.renderable.flipX(false);

            // update the entity velocity
            this.body.vel.x += this.body.accel.x * me.timer.tick;

            // change to the walking animation
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
            }

            frameNum += 1;

            if(frameNum == 45){
              actionNum = 0;
              frameNum = 0
              this.renderable.setCurrentAnimation("stand");
            }
            //actionNum = 0;
        }
        else {
            this.body.vel.x = 0;

            // change to the standing animation
            this.renderable.setCurrentAnimation("stand");
        }

        if (actionNum == 3) {
            // make sure we are not already jumping or falling
            if (!this.body.jumping && !this.body.falling) {
                // set current vel to the maximum defined value
                // gravity will then do the rest
                this.body.vel.y = -this.body.maxVel.y * me.timer.tick;
                // set the jumping flag
                this.body.jumping = true;
            }
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            this.body.vel.x += this.body.accel.x * me.timer.tick;

            frameNum += 1;
            if (frameNum >= 30 && !this.body.jumping) {
                actionNum = 0;
                frameNum = 0
                this.renderable.setCurrentAnimation("stand");
            }
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
