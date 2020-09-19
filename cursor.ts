class Cursor extends Entity {

    constructor() {
        super( {x:0, y: 0})
        this.sprite = new SimpleSprite(ImageResource.CURSOR)
        this.sprite.renderPivot = {x:7, y:7}
    }

    update(deltaTime: number, state: State) : void {
        this.pos = state.camera.screenPointToWorld(Input.mouse);
    }
}