// a "Mobile OBject". The things you can shoot. Balloons, and so on.


class Balloon extends Entity {

    constructor(pos: Point) {
        super( pos )
        this.sprite = new SimpleSprite(ImageResource.BALLOON)
        this.sprite.renderPivot = { x: CONST.MOB_BALLOON_RADIUS, y: CONST.MOB_BALLOON_RADIUS}
        this.collisionRadiusSqare = CONST.MOB_BALLOON_RADIUS * CONST.MOB_BALLOON_RADIUS 
        
        this.behaviors.push(new SineMovementBehavior(this, 10, 2.0, "y"))
    }

}

class Bird extends Entity {

    constructor(pos: Point) {
        super( pos )
        this.sprite = new AnimatedSprite(ImageResource.BIRD, { x: 182, y:117 })
        this.sprite.renderPivot = { x: 77, y: 77}
        this.collisionRadiusSqare = CONST.MOB_BIRD_RADIUS * CONST.MOB_BIRD_RADIUS 

        this.behaviors.push(new SineMovementBehavior(this, CONST.MOB_BIRD_MOVE_RANGE, CONST.MOB_BIRD_MOVE_TIME, "x"))
        this.behaviors.push(new AnimatedBehavior(CONST.MOB_BIRD_ANIMATION_LENGHT))        
    }
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
    new MobLayer((pos) => new Balloon(pos), 200, 500, 1),
    new MobLayer((pos) => new Balloon(pos), 200, 4000, 10),
    new MobLayer((pos) => new Balloon(pos), 200, 10000, 5),
    new MobLayer((pos) => new Bird(pos),    4000, 1000, 5),
    new MobLayer((pos) => new Bird(pos),    4000, 12000, 10),
]