class Particle extends Entity {


    constructor(pos: Point, sprite: Sprite, lifetime: number) {
        super(pos)
        this.sprite = sprite

        this.behaviors.push(new SelfDestructBehavior(lifetime))
        if ("setProgress" in this.sprite) {
            this.behaviors.push(new AnimatedBehavior(lifetime))
        }
        
    }

}
