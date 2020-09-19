class Rocket extends Entity {

    private velocity: Point;
    private direction: Point;

    constructor(pos: Point, direction: Point, initialVelocity: Point) {
        super(pos)

        let distx = direction.x
        let disty = direction.y
        let dist = Math.sqrt(distx * distx + disty * disty)

        this.direction = { x: distx / dist, y: disty / dist }
        this.velocity = { x: this.direction.x * CONST.ROCKET_VELOCITY + initialVelocity.x,
                          y: this.direction.y * CONST.ROCKET_VELOCITY + initialVelocity.y }
        //this.rotation = Math.atan(-this.direction.x / -this.direction.y)
        this.rotation = Math.atan(this.direction.y / this.direction.x)
        if (this.direction.x < 0) this.rotation += Math.PI

        this.renderPivot = {x: 19, y: 9}
        Resources.setImage(this, ImageResource.ROCKET)
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
        state.player.explosion(this.pos)
    }
}