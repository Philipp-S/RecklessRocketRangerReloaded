class Cursor extends Entity {

    constructor() {
        super( {x:0, y: 0})
        this.renderPivot = {x:7, y:7}
        Resources.setImage(this, ImageResource.CURSOR)
    }

    update(deltaTime: number, state: State) : void {
        this.pos = state.camera.screenPointToWorld(Input.mouse);
    }
}