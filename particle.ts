class Particle extends Entity {

    private initialLifetime: number;
    private lifetimeLeft: number;

    constructor(pos: Point, sprite: Sprite, lifetime: number) {
        super(pos)
        this.sprite = sprite
        this.lifetimeLeft = lifetime
        this.initialLifetime = lifetime
    }

    update(deltaTime: number, state: State) : void {
        this.lifetimeLeft -= deltaTime;

        if ("setProgress" in this.sprite) {
            (this.sprite as AnimatedSprite).setProgress(1 - this.lifetimeLeft / this.initialLifetime)
        }

        if (this.lifetimeLeft < 0) {
            state.removeEntity(this)
        }
    }
}