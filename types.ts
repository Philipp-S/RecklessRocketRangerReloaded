// some general utility types

interface Point {
    x: number
    y: number
}

interface Entity {
    pos: Point;
    sprite: CanvasImageSource;
    renderPivot: Point;
    update(deltaTime: number, state:State) : void;
}