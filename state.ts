// the main game-state class
class State {

    public camera: Camera 
    public entities: Entity[]

    private player: Player


    constructor() {
        this.entities = Array()

        this.player = new Player()
        this.entities.push(this.player)
        this.camera = new Camera(this.player)
        this.entities.push(this.camera)

        for(let i = 0; i < 10; i++) {
            this.entities.push(new Mob({
               x: Math.random() * 1024 - 512,
               y: Math.random() * -768 - 100
            }))
        }
    }

    update(deltaTime: number) {
        this.entities.forEach(e => e.update(deltaTime, this))
    }

}