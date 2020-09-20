class Rocket extends Entity {


    constructor(pos: Point, direction: Point, initialVelocity: Point) {
        super(pos)
        
        this.sprite = new SimpleSprite(ImageResource.ROCKET)
        this.sprite.renderPivot = {x: 19, y: 9}
        this.sprite.drawOrder = CONST.LAYER_MOBS
        this.behaviors.push(new FlyForwardBehavior(this, pos, direction, initialVelocity))
        this.behaviors.push(new ExplodeOnImpactBehavior)
    }
    
}