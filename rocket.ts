class Rocket extends Entity {


    constructor(pos: Point, direction: Point, initialVelocity: Point) {
        super(pos)
        
        this.sprite = new SimpleSprite(ImageResource.ROCKET)
        this.sprite.renderPivot = {x: 19, y: 9}
        this.behaviors.push(new FlyForwardBehavior(this, pos, direction, initialVelocity))
    }
    
}


class FlyForwardBehavior extends Behavior {

    private velocity: Point;

    constructor(entity: Entity, pos: Point, direction: Point, initialVelocity: Point) {
        super()

        let distx = direction.x
        let disty = direction.y
        let dist = Math.sqrt(distx * distx + disty * disty)

        let directionNormalized = { x: distx / dist, y: disty / dist }
        this.velocity = { x: directionNormalized.x * CONST.ROCKET_VELOCITY + initialVelocity.x,
                          y: directionNormalized.y * CONST.ROCKET_VELOCITY + initialVelocity.y }
        entity.sprite.rotation = Math.atan(directionNormalized.y / directionNormalized.x)
        if (directionNormalized.x < 0) entity.sprite.rotation += Math.PI
    }

    update(entity:Entity, deltaTime: number, state: State) : void {
        // fly
        entity.pos.x += this.velocity.x * deltaTime
        entity.pos.y += this.velocity.y * deltaTime

        // explode on ground contact
        if (entity.pos.y >= 0) {
            this.explode(entity, state)
            return
        }

        // explode on enemy contact
        // There might be some optimization potential here. But this is a game jam, so who cares about performance :)
        state.entities.forEach(other => {
            if (other.collisionRadiusSqare > 0) {
                let distX = entity.pos.x - other.pos.x
                let distY = entity.pos.y - other.pos.y
                let distSquared = distX  * distX  + distY * distY
                if (distSquared < other.collisionRadiusSqare) {
                    // collision detected
                    state.removeEntity(other)
                    this.explode(entity, state)
                    return
                }
            }
        })

    }

    private explode(entity:Entity, state: State) : void {
        state.removeEntity(entity)
        let explosionSprite = new AnimatedSprite(ImageResource.EXPLOSION, {x: 200, y: 200})
        explosionSprite.renderPivot = {x:100, y:200}
        explosionSprite.rotation = entity.sprite.rotation - Math.PI / 2

        state.entities.push(new Particle(entity.pos,
                                         explosionSprite,
                                         CONST.EXPLOSION_FX_LIFETIME));
        state.player.explosion(entity.pos)
    }
}