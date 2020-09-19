// some general utility types

interface Point {
    x: number
    y: number
}

abstract class Entity {
    public pos: Point
    public sprite?: CanvasImageSource
    public rotation: number = 0
    public renderPivot: Point

    constructor(pos: Point) {
        this.pos = { x: pos.x, y: pos.y }
        if (this.renderPivot === undefined) {
            this.renderPivot = { x: 0, y: 0 }
        }
    }
    public update(deltaTime: number, state:State) : void { };
}