class Rocket extends Entity {

    private velocity: Point;

    constructor(pos: Point, direction: Point, initialVelocity: Point) {
        super(pos)
        
        this.sprite = new SimpleSprite(ImageResource.ROCKET)
        this.sprite.renderPivot = {x: 19, y: 9}

        let distx = direction.x
        let disty = direction.y
        let dist = Math.sqrt(distx * distx + disty * disty)

        let directionNormalized = { x: distx / dist, y: disty / dist }
        this.velocity = { x: directionNormalized.x * CONST.ROCKET_VELOCITY + initialVelocity.x,
                          y: directionNormalized.y * CONST.ROCKET_VELOCITY + initialVelocity.y }
        this.sprite.rotation = Math.atan(directionNormalized.y / directionNormalized.x)
        if (directionNormalized.x < 0) this.sprite.rotation += Math.PI

    }

    update(deltaTime: number, state: State) : void {
        // fly
        this.pos.x += this.velocity.x * deltaTime
        this.pos.y += this.velocity.y * deltaTime

        // explode on ground contact
        if (this.pos.y >= 0) {
            this.explode(state)
            return
        }

        // explode on enemy contact
        // There might be some optimization potential here. But this is a game jam, so who cares about performance :)
        state.entities.forEach(other => {
            if (other.collisionRadiusSqare > 0) {
                let distX = this.pos.x - other.pos.x
                let distY = this.pos.y - other.pos.y
                let distSquared = distX  * distX  + distY * distY
                if (distSquared < other.collisionRadiusSqare) {
                    this.explode(state)
                    return
                }
            }
        }, this)

    }

    private explode(state: State) : void {
        state.removeEntity(this)
        let explosionSprite = new AnimatedSprite(ImageResource.EXPLOSION, {x: 200, y: 200})
        explosionSprite.renderPivot = {x:100, y:200}
        explosionSprite.rotation = this.sprite.rotation - Math.PI / 2

        state.entities.push(new Particle(this.pos,
                                         explosionSprite,
                                         CONST.EXPLOSION_FX_LIFETIME));
        state.player.explosion(this.pos)
    }
}