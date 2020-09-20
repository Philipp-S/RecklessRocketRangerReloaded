// a "Mobile OBject". The things you can shoot. Balloons, and so on.


class Balloon extends Entity {

    constructor(pos: Point) {
        super( pos )
        this.sprite = new SimpleSprite(ImageResource.BALLOON)
        this.sprite.renderPivot = { x: CONST.MOB_BALLOON_RADIUS, y: CONST.MOB_BALLOON_RADIUS}
        this.sprite.drawOrder = CONST.LAYER_MOBS
        this.collisionRadiusSqare = CONST.MOB_BALLOON_RADIUS * CONST.MOB_BALLOON_RADIUS 
        
        this.behaviors.push(new SineMovementBehavior(this, 10, 2.0, "y"))
    }

}

class Bird extends Entity {

    constructor(pos: Point) {
        super( pos )
        this.sprite = new AnimatedSprite(ImageResource.BIRD, { x: 182, y:117 })
        this.sprite.renderPivot = { x: 77, y: 77}
        this.sprite.drawOrder = CONST.LAYER_MOBS
        this.collisionRadiusSqare = CONST.MOB_BIRD_RADIUS * CONST.MOB_BIRD_RADIUS 

        this.behaviors.push(new SineMovementBehavior(this, CONST.MOB_BIRD_MOVE_RANGE, CONST.MOB_BIRD_MOVE_TIME, "x"))
        this.behaviors.push(new AnimatedBehavior(CONST.MOB_BIRD_ANIMATION_LENGHT))        
    }
}

class Ufo extends Entity {

    constructor(pos: Point) {
        super( pos )
        this.sprite = new AnimatedSprite(ImageResource.UFO, { x: 131, y:75 })
        this.sprite.renderPivot = { x: 65, y: 40}
        this.sprite.drawOrder = CONST.LAYER_MOBS
        this.collisionRadiusSqare = CONST.MOB_UFO_RADIUS * CONST.MOB_UFO_RADIUS 

        this.behaviors.push(new AnimatedBehavior(CONST.MOB_UFO_ANIMATION_LENGHT))        
        this.behaviors.push(new SineMovementBehavior(this, 600, 10, "x"))
        this.behaviors.push(new SineMovementBehavior(this, 200, 4, "y"))
    }
}


class MobLayer {
    from: number
    range: number
    count: number
    create: (pos:Point) => Entity
    spawn(state:State, start:number) {
        for (let i = 0; i < this.count; i++) {
            state.addEntity(this.create({
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

// these are the height levels at which the mobs spawn
const MOB_LAYERS = [
    new MobLayer((pos) => new Balloon(pos),   5 * CONST.METER,  15 * CONST.METER, 1),
    new MobLayer((pos) => new Balloon(pos),   5 * CONST.METER, 100 * CONST.METER, 10),
    new MobLayer((pos) => new Balloon(pos),   5 * CONST.METER, 300 * CONST.METER, 10),
    new MobLayer((pos) => new Bird(pos),    100 * CONST.METER,  20 * CONST.METER, 5),
    new MobLayer((pos) => new Bird(pos),    100 * CONST.METER, 400 * CONST.METER, 20),
    new MobLayer((pos) => new Ufo(pos),     300 * CONST.METER, 150 * CONST.METER, 3),
    new MobLayer((pos) => new Ufo(pos),     300 * CONST.METER, 600 * CONST.METER, 20),
]
