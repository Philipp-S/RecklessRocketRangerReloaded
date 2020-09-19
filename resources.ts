// handler for resources
enum ImageResource {
    PLAYER = "img/player.png"
}

class Resources {


    public static setImage(entity: Entity, res: ImageResource) : void {
        let image = new Image();
        image.src = res;
        image.onload = () => {
            entity.sprite = image;
        }
        image.onerror = () => {
            console.error("Could not load image " + res);
        }
    }
}