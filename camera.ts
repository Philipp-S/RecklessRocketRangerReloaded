class Camera extends Entity {

    private player: Player;
    private currentOffset: Point;

    constructor(player: Player) {
        super( {x:0, y:0})
        this.player = player;
        this.currentOffset = { x:0, y: 0 }

    }
    update(deltaTime: number, state: State) : void {
        let desiredOffset =  { x: this.player.velocity.x * CONST.CAMERA_LEAD, 
                               y: this.player.velocity.y * CONST.CAMERA_LEAD}
        this.currentOffset.x += (desiredOffset.x - this.currentOffset.x) * deltaTime * CONST.CAMERA_AGILITY
        this.currentOffset.y += (desiredOffset.y - this.currentOffset.y) * deltaTime * CONST.CAMERA_AGILITY

        this.pos.x = this.player.pos.x + this.currentOffset.x
        this.pos.y = this.player.pos.y + this.currentOffset.y
    }

    screenPointToWorld(screenPos: Point) {
        return {
            x: screenPos.x - CONST.SCREEN_WIDTH / 2 + this.pos.x,
            y: screenPos.y - CONST.SCREEN_HEIGHT / 2 + this.pos.y,
        }
    }
    
}