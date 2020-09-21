class Player extends Entity {

    public velocity: Point = {x: 0, y:0}
    public airtime = 0
    public falldist = 0
    public isGrounded = false
    public kills = 0

    private rocketlauncher: Rocketlauncher

    constructor(rocketlauncher: Rocketlauncher) {
        super( { x: 0, y: -CONST.PLAYER_START_ALTITUDE} )
        this.sprite = new SimpleSprite(ImageResource.PLAYER)
        this.sprite.drawOrder = CONST.LAYER_PLAYER_FG
        this.sprite.renderPivot = {x:30, y:50}
        this.rocketlauncher = rocketlauncher

        this.behaviors.push(new class extends Behavior {
            private timeSinceLastRocket = 0

            update(entity: Entity, deltaTime: number, state: State) : void {
                // apply gravity
                let player = entity as Player
                player.velocity.y += CONST.GRAVITY * deltaTime

                // apply input
                let controlForce = deltaTime * ( player.isGrounded ? CONST.PLAYER_ACCEL_GROUND : CONST.PLAYER_ACCEL_AIR )
                if(Input.keyDown("KeyA") || Input.keyDown("ArrowLeft")) {
                    player.velocity.x -= controlForce
                    player.sprite.flipped = true
                }
                if(Input.keyDown("KeyD") || Input.keyDown("ArrowRight")) {
                    player.velocity.x += controlForce
                    player.sprite.flipped = false
                }

                // apply friction
                let frictionFraction: number;
                if (player.isGrounded) {
                    frictionFraction = Math.pow((1 - CONST.PLAYER_FRICTION_GROUND), deltaTime )
                } else {
                    frictionFraction = Math.pow((1 - CONST.PLAYER_FRICTION_AIR), deltaTime )
                }
                player.velocity.x *= frictionFraction
                player.velocity.y *= frictionFraction

                // apply velocity
                player.pos.x += player.velocity.x * deltaTime
                player.pos.y += player.velocity.y * deltaTime

                if (player.velocity.y > 0) {
                    player.falldist += player.velocity.y * deltaTime
                } else {
                    player.falldist = 0
                }

                // ground collision checking
                if (player.pos.y > CONST.PLAYER_GROUND_COLLISION) {
                    player.pos.y = CONST.PLAYER_GROUND_COLLISION;
                    if (!player.isGrounded) {
                        player.velocity.x *= CONST.PLAYER_GROUND_BOUNCE
                        player.velocity.y *= -CONST.PLAYER_GROUND_BOUNCE
                    } else {
                        player.velocity.y = 0
                    }
                    player.isGrounded = true
                    player.airtime = 0
                } else {
                    player.isGrounded = false
                    player.airtime += deltaTime
                }


                // make sure the rocket launcher follows
                player.rocketlauncher.pos.x = player.sprite.flipped ? player.pos.x + 8 : player.pos.x - 8
                player.rocketlauncher.pos.y = player.pos.y - CONST.ROCKET_START_HEIGHT
                player.rocketlauncher.sprite.flipped = player.sprite.flipped

                // set direction of rocket launcher
                let direction = { x: state.cursor.pos.x - player.rocketlauncher.pos.x,
                                  y: state.cursor.pos.y - player.rocketlauncher.pos.y }
                player.rocketlauncher.sprite.rotation =  Math.atan(direction.y / direction.x)
                if (direction.x > 0 === player.rocketlauncher.sprite.flipped) {
                    player.rocketlauncher.sprite.rotation += Math.PI
                }
                
                // shooting
                this.timeSinceLastRocket += deltaTime
                if(Input.mouse.click && this.timeSinceLastRocket >= CONST.ROCKET_SHOOTING_COOLDOWN) {
                    this.timeSinceLastRocket = 0
                    state.addEntity(new Rocket(
                        player.rocketlauncher.pos,
                        direction,
                        player.velocity
                    ))
                }
            }
        })
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
}