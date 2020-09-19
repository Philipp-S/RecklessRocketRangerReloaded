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
    private anitime: number;
    private movePhase: number;
    private originalx: number;

    constructor(pos: Point) {
        super( pos )
        this.anitime = Math.random() * CONST.MOB_BIRD_ANIMATION_LENGHT
        this.sprite = new AnimatedSprite(ImageResource.BIRD, { x: 182, y:117 })
        this.sprite.renderPivot = { x: 77, y: 77}
        this.collisionRadiusSqare = CONST.MOB_BIRD_RADIUS * CONST.MOB_BIRD_RADIUS 
        this.movePhase = Math.random() * CONST.MOB_BIRD_MOVE_TIME
        this.originalx = pos.x
    }

    public update(deltaTime: number, state:State) : void { 
        // update animation
        this.anitime += deltaTime
        while (this.anitime > CONST.MOB_BIRD_ANIMATION_LENGHT) {
            this.anitime -= CONST.MOB_BIRD_ANIMATION_LENGHT
        }
        (this.sprite as AnimatedSprite).setProgress(this.anitime / CONST.MOB_BIRD_ANIMATION_LENGHT)

        // update position
        this.movePhase += deltaTime
        let phase = ((this.movePhase % CONST.MOB_BIRD_MOVE_TIME) / CONST.MOB_BIRD_MOVE_TIME) * Math.PI * 2
        this.sprite.flipped = (phase < Math.PI / 2 || phase > Math.PI * 3 / 2)
        this.pos.x = this.originalx + Math.sin(phase) * CONST.MOB_BIRD_MOVE_RANGE

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