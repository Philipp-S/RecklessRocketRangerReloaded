// a "Mobile OBject". The things you can shoot. Balloons, and so on.


class Mob extends Entity {

    constructor(pos: Point) {
        super( pos )
        this.sprite = new SimpleSprite(ImageResource.BALLOON)
        this.sprite.renderPivot = { x: 32, y: 32}
        this.collisionRadiusSqare = CONST.MOB_BALLOON_RADIUS * CONST.MOB_BALLOON_RADIUS 
    }

}