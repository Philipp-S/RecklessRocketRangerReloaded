class Player extends Entity {

    private isGrounded = false
    private timeSinceLastRocket = 0
    public velocity: Point = {x: 0, y:0}
    public airtime = 0
    private rocketlauncher: Rocketlauncher

    constructor(rocketlauncher: Rocketlauncher) {
        super( { x: 0, y: -500} )
        this.sprite = new SimpleSprite(ImageResource.PLAYER)
        this.sprite.drawOrder = CONST.LAYER_PLAYER_FG
        this.sprite.renderPivot = {x:30, y:50}
        this.rocketlauncher = rocketlauncher
    }

    update(deltaTime: number, state: State) : void {
        // apply gravity
        this.velocity.y += CONST.GRAVITY * deltaTime

        // apply input
        let controlForce = deltaTime * ( this.isGrounded ? CONST.PLAYER_ACCEL_GROUND : CONST.PLAYER_ACCEL_AIR )
        if(Input.keyDown("KeyA") || Input.keyDown("ArrowLeft")) {
            this.velocity.x -= controlForce
            this.sprite.flipped = true
        }
        if(Input.keyDown("KeyD") || Input.keyDown("ArrowRight")) {
            this.velocity.x += controlForce
            this.sprite.flipped = false
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


        // make sure the rocket launcher follows
        this.rocketlauncher.pos.x = this.sprite.flipped ? this.pos.x + 8 : this.pos.x - 8
        this.rocketlauncher.pos.y = this.pos.y - CONST.ROCKET_START_HEIGHT
        this.rocketlauncher.sprite.flipped = this.sprite.flipped

        // set direction of rocket launcher
        let direction = { x: state.cursor.pos.x - this.rocketlauncher.pos.x,
                          y: state.cursor.pos.y - this.rocketlauncher.pos.y }
        this.rocketlauncher.sprite.rotation =  Math.atan(direction.y / direction.x)
        if (direction.x > 0 === this.rocketlauncher.sprite.flipped) {
            this.rocketlauncher.sprite.rotation += Math.PI
        }
        
        // shooting
        this.timeSinceLastRocket += deltaTime
        if(Input.mouse.click && this.timeSinceLastRocket >= CONST.ROCKET_SHOOTING_COOLDOWN) {
            this.timeSinceLastRocket = 0
            state.addEntity(new Rocket(
                this.rocketlauncher.pos,
                direction,
                this.velocity
            ))
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

class Rocketlauncher extends Entity {


    constructor() {
        super( {x:0, y:0} )
        this.sprite = new SimpleSprite(ImageResource.ROCKETLAUNCHER)
        this.sprite.renderPivot = {x:30, y:8}
        this.sprite.drawOrder = CONST.LAYER_PLAYER_BG
    }

    update(deltaTime: number, state: State) : void {
    }
}