abstract class Entity {
    public pos: Point
    public sprite?: Sprite
    collisionRadiusSqare: number = 0

    constructor(pos: Point) {
        this.pos = { x: pos.x, y: pos.y }
    }
    public update(deltaTime: number, state:State) : void { };
}