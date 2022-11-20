class Player extends Sprite {
    constructor ({
        collisionBlocks = [],
        imageSrc,
        frameRate,
        animations
    }){
        
        super({ imageSrc,frameRate,animations});
        this.position={
            x:200,
            y:200,
        }
        this.velocity={
            x:0,
            y:0,
        }
        this.sides = {
            bottom: this.position.y +this.height,
        }
             
        this.gravity = 1;
        this.collisionBlocks = collisionBlocks;
        console.log(this.collisionBlocks);
        this.preventInput = false;
        }



    update(){
        // this is a box to test site
        // c.fillStyle='rgba(0,0,225,0.5)';
        // c.fillRect(this.position.x,this.position.y,this.width,this.height);
        this.position.x += this.velocity.x;
        this.updateHitbox();
        this.checkForHorizontalCollisions();
        this.applyGravity();

       //this is a hitbox to test hitbox site
        // c.fillRect(
        //     this.hitbox.position.x,
        //     this.hitbox.position.y,
        //     this.hitbox.width,
        //     this.hitbox.height,
        // )
        this.updateHitbox();
        this.checkForVerticalCollisions();
        //check horizontal collision
       
        
        // apply gravity
        
        // this.sides.bottom = this.positon.y + this.height;

        

        

        // //above the bottom
        // if(this.sides.bottom +this.velocity.y< canvas.height){
        // }else  this.velocity.y = 0;
        
    }

    checkForHorizontalCollisions(){
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];
            if(this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width&&
               this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
               this.hitbox.position.y + this.hitbox.height>= collisionBlock.position.y &&
                this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height){
                    if (this.velocity.x < -0) {
                        const offset = this.hitbox.position.x - this.position.x
                        this.position.x =
                          collisionBlock.position.x + collisionBlock.width - offset + 0.01
                        break
                      }
              
                      if (this.velocity.x > 0) {
                        const offset =
                          this.hitbox.position.x - this.position.x + this.hitbox.width
                        this.position.x = collisionBlock.position.x - offset - 0.01
                        break
                      }
                } 
        }

    }
    checkForVerticalCollisions(){
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisonBlock = this.collisionBlocks[i];
            if(this.hitbox.position.x <= collisonBlock.position.x + collisonBlock.width&&
                this.hitbox.position.x + this.hitbox.width >= collisonBlock.position.x &&
                this.hitbox.position.y + this.hitbox.height >= collisonBlock.position.y &&
                this.hitbox.position.y <= collisonBlock.position.y + collisonBlock.height){
                    if(this.velocity.y < 0){
                        this.velocity.y = 0;
                        const offset  = this.hitbox.position.y - this.position.y;
                        this.position.y = collisonBlock.position.y + collisonBlock.height - offset+0.01;
                        break;
                    }
                    if(this.velocity.y>0){
                        this.velocity.y = 0;
                        const offset = this.hitbox.position.y -this.position.y  + this.hitbox.height;
                        this.position.y = collisonBlock.position.y - offset -0.01;
                        break;
                    }
                }
        }
    }
    applyGravity(){
        this.velocity.y += this.gravity;
        this.position.y += this.velocity.y;
    }

    updateHitbox(){
        this.hitbox = {
            position:{
                x:this.position.x+58,
                y:this.position.y+34,
            },
            width: 50,
            height: 50,
        }
    }

    switchSprite(name){
        if (this.image === this.animations[name].image) return
        this.currentFrame = 0;
        this.image = this.animations[name].image;
        this.frameRate = this.animations[name].frameRate;
        this.frameBuffer = this.animations[name].frameBuffer;
        this.loop = this.animations[name].loop;
        this.currentAnimation = this.animations[name]
    }

    haddleInput(keys){
        
    if(this.preventInput) return
    this.velocity.x = 0;
    if(keys.d.pressed){
        this.switchSprite('runRight');
        this.velocity.x = 4;
        this.lastDirection = 'right';
    }
    else if (keys.a.pressed){
        this.switchSprite('runLeft');
        this.velocity.x = -4;
        this.lastDirection = 'left'
    }
    else {
        if(this.lastDirection === 'left'){
            this.switchSprite('idleLeft')
        }else{
            this.switchSprite ('idleRight');
        }
       }
    }
    
}
//positon