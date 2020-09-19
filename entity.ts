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