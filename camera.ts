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
    
}