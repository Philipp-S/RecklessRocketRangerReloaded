class Rocket extends Entity {

    static PARTICLE_SPRITE: Sprite

    constructor(pos: Point, direction: Point, initialVelocity: Point) {
        super(pos)
        
        this.sprite = new SimpleSprite(ImageResource.ROCKET)
        this.sprite.renderPivot = {x: 19, y: 9}
        this.sprite.drawOrder = CONST.LAYER_MOBS
        this.behaviors.push(new FlyForwardBehavior(this, direction, CONST.ROCKET_VELOCITY, initialVelocity))
        this.behaviors.push(new ExplodeOnImpactBehavior)
        this.behaviors.push(new ParticleEmitterBehavior(0.25, ImageResource.SPARK, 0.01, 3))
        this.behaviors.push(SelfDestructIfOffscreen)
    }
}