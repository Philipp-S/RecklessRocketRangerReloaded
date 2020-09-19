// a "Mobile OBject". The things you can shoot. Balloons, and so on.


class Balloon extends Entity {

    constructor(pos: Point) {
        super( pos )
        this.sprite = new SimpleSprite(ImageResource.BALLOON)
        this.sprite.renderPivot = { x: 32, y: 32}
        this.collisionRadiusSqare = CONST.MOB_BALLOON_RADIUS * CONST.MOB_BALLOON_RADIUS 
    }

}

class Bird extends Entity {
    anitime: number = 0

    constructor(pos: Point) {
        super( pos )
        this.sprite = new AnimatedSprite(ImageResource.BIRD, { x: 182, y:117 })
        this.sprite.renderPivot = { x: 77, y: 77}
        this.collisionRadiusSqare = CONST.MOB_BALLOON_RADIUS * CONST.MOB_BALLOON_RADIUS 
    }

    public update(deltaTime: number, state:State) : void { 
        this.anitime += deltaTime
        while (this.anitime > CONST.MOB_BIRD_ANIMATION_LENGHT) {
            this.anitime -= CONST.MOB_BIRD_ANIMATION_LENGHT
        }
        (this.sprite as AnimatedSprite).setProgress(this.anitime / CONST.MOB_BIRD_ANIMATION_LENGHT)
    };
}

class MobLayer {
    from: number
    range: number
    count: number
    create: (pos:Point) => Entity
    spawn(state:State, start:number) {
        for (let i = 0; i < this.count; i++) {
            state.entities.push(this.create({
                x: Math.random() * CONST.CHUNK_WIDTH + start,
                y: Math.pow(Math.random(), 2) * -this.range - this.from
             }))
        }
    }
    constructor(create: (pos:Point) => Entity, from: number,  to: number, count: number) {
        this.create = create
        this.from = from
        this.range = to - from
        this.count = count
    }
}

const MOB_LAYERS = [
    new MobLayer((pos) => new Balloon(pos), 200, 3000, 5),
    new MobLayer((pos) => new Bird(pos),    4000, 1000, 5),
    new MobLayer((pos) => new Bird(pos),    4000, 8000, 10),
]