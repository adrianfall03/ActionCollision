class Sprite{
    constructor({position,
        imageSrc,
        frameRate=1,
        animations,
        frameBuffer = 2,
        loop = true,
        autoplay = true,
        }){
        this.position = position;
        this.image = new Image();
        this.image.onload = () => {
            this.loaded = true;
            this.width = this.image.width/frameRate;
            this.height = this.image.height;
        }
        this.image.src = imageSrc;
        this.loaded = false;
        this.frameRate = frameRate;
        this.currentFrame = 0;
        this.elapsedFrames = 0;
        this.frameBuffer = frameBuffer;
        this.animations = animations;
        this.loop = loop;
        this.autoplay = autoplay;
        this.currentAnimation ;

        if(this.animations){
            for (const key in animations) {
               
                    const image = new Image();
                    image.src = this.animations[key].imageSrc;
                    this.animations[key].image = image;
                
                console.log(this.animations);
            }
        }
    }

    draw(){
        if(!this.loaded) return
        const cropbox = {
            positon:{
                x: this.width * this.currentFrame,
                y:0,
            },
            width:this.width,
            height:this.height
        }
        c.drawImage(
            this.image,
            cropbox.positon.x,
            cropbox.positon.y,
            cropbox.width,
            cropbox.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height,
            );
        this.updateFrames();
    }
      // about the door  
    play(){
    
        this.autoplay = true;
    }

    updateFrames(){
        if(!this.autoplay)return;
        else this.elapsedFrames++;
        //control the frame speed
        if(this.elapsedFrames % this.frameBuffer === 0){
        // make it can do a loop
        if(this.currentFrame<this.frameRate -1) this.currentFrame ++
        else if (this.loop) this.currentFrame = 0
    }
    if (this.currentFrame?.onComplete ){
        if(this.currentFrame === this.frameRate -1 && this.currentFrame.isActive){
            this.currentAnimation.onComplete();
            this.currentFrame.isActive = true;
        }
    }
    }
}