class Particle extends Entity {

    constructor(pos: Point, sprite: Sprite, lifetime: number, fade: boolean, velocity:number) {
        super(pos)
        this.sprite = sprite
        this.sprite.drawOrder = CONST.LAYER_FX

        this.behaviors.push(new SelfDestructBehavior(lifetime, fade))
        if ("setProgress" in this.sprite) {
            this.behaviors.push(new AnimatedBehavior(lifetime, false))
        }
        if (velocity > 0) {
            let angle = Math.random() * Math.PI * 2
            this.behaviors.push(new FlyForwardBehavior(this, { x: Math.sin(angle), y:Math.cos(angle)}, velocity, { x:0, y:0}))
        }
    }
}

class ParticleEmitterBehavior extends Behavior {

    private time: number = 0
    private particleLifetime: number
    private particleSpread: number
    private particleSprite: ImageResource
    public  frequency: number

    constructor(particleLifetime: number, particleSprite: ImageResource, frequency: number, spread:number) {
        super()        
        this.particleLifetime = particleLifetime
        this.particleSprite = particleSprite
        this.particleSpread = spread
        this.frequency = frequency
    }

    update(entity:Entity, deltaTime: number, state: State) : void {
        
        this.time += deltaTime
        while (this.time > this.frequency) {
            state.addEntity(new Particle(
                entity.pos, 
                new SimpleSprite(this.particleSprite), 
                this.particleLifetime, 
                true, 
                Math.random() * Math.random() * this.particleSpread)
            )
            this.time -= this.frequency
        }
    }
}