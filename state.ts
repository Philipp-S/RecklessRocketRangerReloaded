// the main game-state class
class State {

    public cameraFocus: Point ;
    public entities: Entity[];

    private player: Player;


    constructor() {
        this.cameraFocus = {x:0, y: -200};
        this.entities = Array();

        this.player = new Player();
        this.entities.push(this.player);

    }

    update(deltaTime: number) {
        this.entities.forEach(e => e.update(deltaTime, this));
    }

}