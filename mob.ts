// a "Mobile OBject". The things you can shoot. Balloons, and so on.


class Mob extends Entity {
    pos: Point
    sprite: CanvasImageSource
    renderPivot: Point

    constructor(pos: Point) {
        super( pos )
        Resources.setImage(this, ImageResource.BALLOON)
        this.renderPivot = { x: 32, y: 32}
        this.collisionRadiusSqare = CONST.MOB_BALLOON_RADIUS * CONST.MOB_BALLOON_RADIUS 
    }

}