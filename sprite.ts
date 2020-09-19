abstract class Sprite {
    public rotation: number = 0
    public renderPivot: Point = { x:0, y:0 }

    public abstract getImage() : CanvasImageSource
}

class SimpleSprite extends Sprite {
    
    private image: CanvasImageSource;
    public isLoaded: boolean;

    public constructor(src: ImageResource) {
        super()
        this.image = new Image();
        this.image.src = src;
        this.image.onload = () => {
            this.isLoaded = true
        }
        this.image.onerror = () => {
            console.error("Could not load image " + src)
        }
    }

    public getImage() : CanvasImageSource {
        return this.image
    }
}

