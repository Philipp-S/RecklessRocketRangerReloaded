abstract class Sprite {
    public rotation: number = 0
    public renderPivot: Point = { x:0, y:0 }
    public isLoaded: boolean;
    public flipped: boolean = false;
    public alpha: number = 1.0
    public drawOrder: number;

    public image: CanvasImageSource;

    public abstract draw(ctx: CanvasRenderingContext2D): void
}

class SimpleSprite extends Sprite {
    

    public constructor(src: ImageResource) {
        super()
        this.image = new Image()
        this.image.src = src
        this.image.onload = () => {
            this.isLoaded = true
        }
        this.image.onerror = () => {
            console.error("Could not load image " + src)
        }
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.image, 0 , 0 )
    }


}

class AnimatedSprite extends Sprite {
    
    private framesize: Point;
    private currentFrame = 0;

    private frames: Point[] = new Array();

    public constructor(src: ImageResource, framesize:Point) {
        super()
        this.framesize = framesize
        this.image = new Image()
        this.image.src = src
        this.image.onload = () => {
            this.isLoaded = true

            // generate the frames
            let x = 0
            let y = 0
            while( x + framesize.x <= this.image.width &&
                   y + framesize.y <= this.image.height ) {
                this.frames.push( { x: x, y: y } )
                x += framesize.x
                if (x + framesize.x > this.image.width) {
                    x = 0
                    y += framesize.y
                }
            }
        }
        this.image.onerror = () => {
            console.error("Could not load image " + src)
        }
    }

    public setProgress(time: number) {

        this.currentFrame = Math.floor(this.frames.length * time)
    }

    public draw(ctx: CanvasRenderingContext2D) {
        if (this.currentFrame < 0 ) this.currentFrame = 0
        if (this.currentFrame >= this.frames.length ) this.currentFrame = this.frames.length - 1
        let frame = this.frames[this.currentFrame];
        
        ctx.drawImage(  this.image, 
                        frame.x,    frame.y,    this.framesize.x, this.framesize.y,     // srcrect
                        0,          0,          this.framesize.x, this.framesize.y )    // dstrect
    }
}

