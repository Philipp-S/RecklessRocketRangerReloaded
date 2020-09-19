class Player extends Entity {

    private isGrounded = false
    private timeSinceLastRocket = 0
    private velocity: Point = {x: 0, y:0}
    public airtime = 0;

    constructor() {
        super( { x: 0, y: -500} )
        this.sprite = new SimpleSprite(ImageResource.PLAYER)
        this.sprite.renderPivot = {x:32, y:32}
    }

    update(deltaTime: number, state: State) : void {

        // shooting
        this.timeSinceLastRocket += deltaTime
        if(Input.mouse.click && this.timeSinceLastRocket >= CONST.ROCKET_SHOOTING_COOLDOWN) {
            this.timeSinceLastRocket = 0
            let startPos = { x: this.pos.x,
                             y: this.pos.y - CONST.ROCKET_START_HEIGHT }
            state.entities.push(new Rocket(
                startPos,
                { x: state.cursor.pos.x - startPos.x,
                  y: state.cursor.pos.y - startPos.y },
                this.velocity
            ))
        }

        // apply gravity
        this.velocity.y += CONST.GRAVITY * deltaTime

        // apply input
        let controlForce = deltaTime * ( this.isGrounded ? CONST.PLAYER_ACCEL_GROUND : CONST.PLAYER_ACCEL_AIR )
        if(Input.keyDown("KeyA") || Input.keyDown("ArrowLeft")) {
            this.velocity.x -= controlForce
        }
        if(Input.keyDown("KeyD") || Input.keyDown("ArrowRight")) {
            this.velocity.x += controlForce
        }

        // apply friction
        let frictionFraction: number;
        if (this.isGrounded) {
            frictionFraction = Math.pow((1 - CONST.PLAYER_FRICTION_GROUND), deltaTime )
        } else {
            frictionFraction = Math.pow((1 - CONST.PLAYER_FRICTION_AIR), deltaTime )
        }
        this.velocity.x *= frictionFraction
        this.velocity.y *= frictionFraction

        // apply velocity
        this.pos.x += this.velocity.x * deltaTime
        this.pos.y += this.velocity.y * deltaTime

        // ground collision checking
        if (this.pos.y > CONST.PLAYER_GROUND_COLLISION) {
            this.pos.y = CONST.PLAYER_GROUND_COLLISION;
            if (!this.isGrounded) {
                this.velocity.x *= CONST.PLAYER_GROUND_BOUNCE
                this.velocity.y *= -CONST.PLAYER_GROUND_BOUNCE
            } else {
                this.velocity.y = 0
            }
            this.isGrounded = true
            this.airtime = 0
        } else {
            this.isGrounded = false
            this.airtime += deltaTime
        }



    }

    explosion(point: Point) {
        console.log("Explosion")
        let distx = this.pos.x - point.x
        let disty = this.pos.y - point.y
        let dist = Math.sqrt(distx * distx + disty * disty)

        if (dist <= CONST.EXPLOSION_MAX_RADIUS) {
            let normalized: Point = { x: distx / dist, y: disty / dist }
            if (dist < CONST.EXPLOSION_MIN_RADIUS) dist = CONST.EXPLOSION_MIN_RADIUS
            let force = CONST.EXPLOSION_FORCE / ( dist * dist )
    
            // it would be more physically correct to add the explosion force, but
            // stopping the player actually feels more right
            this.velocity.x = normalized.x * force
            this.velocity.y = normalized.y * force
        }

    }
}