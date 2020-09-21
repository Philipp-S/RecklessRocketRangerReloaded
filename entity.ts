abstract class Entity {
    public pos: Point
    public sprite?: Sprite
    collisionRadiusSqare: number = 0

    protected behaviors: Behavior[] = new Array();

    constructor(pos: Point) {
        this.pos = { x: pos.x, y: pos.y }
    }
    public update(deltaTime: number, state:State) : void { 
        this.behaviors.forEach(b =>{
            b.update(this, deltaTime, state)
        }, this)
    };
}


abstract class Behavior {
    abstract update(entity: Entity, deltaTime: number, state:State) : void;   
}



class SineMovementBehavior extends Behavior{
    private movePhase: number
    private original: number
    private amplitude: number
    private duration: number
    private axis: "x" | "y"

    constructor(entity: Entity, amplitude: number, duration: number, axis: "x" | "y") {
        super()
        this.movePhase = Math.random() * duration
        this.amplitude = amplitude
        this.duration = duration
        this.axis = axis
        switch (this.axis) {
            case "x": 
                this.original = entity.pos.x;
                break
            case "y":                
                this.original = entity.pos.y;
                break
        }
    }

    public update(entity: Entity, deltaTime: number, state:State) : void { 
        // update position
        this.movePhase += deltaTime
        let phase = ((this.movePhase % this.duration) / this.duration) * Math.PI * 2
        switch (this.axis) {
            case "x": 
                entity.pos.x = this.original + Math.sin(phase) * this.amplitude
                break
            case "y":
                entity.pos.y = this.original + Math.sin(phase) * this.amplitude
                break
        }
        if (this.axis === "x") {
            entity.sprite.flipped = (phase < Math.PI / 2 || phase > Math.PI * 3 / 2)
        }
        

    };
}

class AnimatedBehavior extends Behavior {
    private time: number
    private duration: number

    constructor(cycleDuration: number, randomize:boolean) {
        super()
        
        this.duration = cycleDuration
        if (randomize) {
            this.time = Math.random() * cycleDuration
        } else {
            this.time = 0
        }
    }

    public update(entity: Entity, deltaTime: number, state:State) : void { 
        // update animation
        this.time += deltaTime
        while (this.time > this.duration) {
            this.time -= this.duration
        }
        (entity.sprite as AnimatedSprite).setProgress(this.time / this.duration)
    };
}


class FlyForwardBehavior extends Behavior {

    private velocity: Point;

    constructor(entity: Entity, direction: Point, velocity: number, initialVelocity: Point) {
        super()

        let distx = direction.x
        let disty = direction.y
        let dist = Math.sqrt(distx * distx + disty * disty)

        let directionNormalized = { x: distx / dist, y: disty / dist }
        this.velocity = { x: directionNormalized.x * velocity + initialVelocity.x,
                          y: directionNormalized.y * velocity + initialVelocity.y }
        entity.sprite.rotation = Math.atan(directionNormalized.y / directionNormalized.x)
        if (directionNormalized.x < 0) entity.sprite.rotation += Math.PI
    }

    update(entity:Entity, deltaTime: number, state: State) : void {
        entity.pos.x += this.velocity.x * deltaTime
        entity.pos.y += this.velocity.y * deltaTime
    }

    
}

class ExplodeOnImpactBehavior extends Behavior {
    
    update(entity:Entity, deltaTime: number, state: State) : void {

        // explode on ground contact
        if (entity.pos.y >= 0) {
            this.explode(entity, state)
            return
        }

        // explode on enemy contact
        // There might be some optimization potential here. But this is a game jam, so who cares about performance :)
        state.doWithAllEntities(other => {
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

        state.addEntity(new Particle(entity.pos,
                                         explosionSprite,
                                         CONST.EXPLOSION_FX_LIFETIME,
                                         false,
                                         0));
        state.player.explosion(entity.pos)
        new Audio(AudioResource.EXPLOSION).play()
    }
}


class SelfDestructBehavior extends Behavior {
    private initialLifetime: number
    private lifetimeLeft: number
    private fade: boolean

    constructor(lifetime: number, fade: boolean) {
        super()
        this.lifetimeLeft = lifetime
        this.initialLifetime = lifetime
        this.fade = fade
    }

    update(entity:Entity, deltaTime: number, state: State) : void {
        this.lifetimeLeft -= deltaTime;
        if (this.lifetimeLeft < 0) {
            state.removeEntity(entity)
        }
        if (this.fade) {
            entity.sprite.alpha = this.lifetimeLeft / this.initialLifetime
        }
    }
}

let SelfDestructIfOffscreen = new class extends Behavior {

    update(entity:Entity, deltaTime: number, state: State) : void {
        if (entity.pos.x - state.camera.pos.x > CONST.SCREEN_WIDTH || 
            entity.pos.x - state.camera.pos.x < -CONST.SCREEN_WIDTH || 
            entity.pos.y - state.camera.pos.y > CONST.SCREEN_HEIGHT || 
            entity.pos.y - state.camera.pos.y < -CONST.SCREEN_HEIGHT
            ) 
        {
            state.removeEntity(entity)
        }
    }
}
