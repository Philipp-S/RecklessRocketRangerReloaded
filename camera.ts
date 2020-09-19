class Camera extends Entity {
    pos: Point = { x:0, y: 0}

    private tracedEntity: Entity;

    constructor(tracedEntity: Entity) {
        super( {x:0, y:0})
        this.tracedEntity = tracedEntity;

    }
    update(deltaTime: number, state: State) : void {
        this.pos = { x: this.tracedEntity.pos.x, y: this.tracedEntity.pos.y}
    }

    screenPointToWorld(screenPos: Point) {
        return {
            x: screenPos.x - CONST.SCREEN_WIDTH / 2 + this.pos.x,
            y: screenPos.y - CONST.SCREEN_HEIGHT / 2 + this.pos.y,
        }
    }
    
}