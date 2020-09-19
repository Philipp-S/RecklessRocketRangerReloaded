// the main game-state class
class State {

    public camera: Camera 
    public entities: Entity[]
    public cursor: Cursor
    public player: Player


    constructor() {
        this.entities = Array()

        this.player = new Player()
        this.entities.push(this.player)
        this.camera = new Camera(this.player)
        this.entities.push(this.camera)
        this.cursor = new Cursor()
        this.entities.push(this.cursor)

        for(let i = 0; i < 10; i++) {
            this.entities.push(new Mob({
               x: Math.random() * 1024 - 512,
               y: Math.random() * -768 - 100
            }))
        }
    }

    removeEntity(entity: Entity) {
        let index = this.entities.indexOf(entity)
        if (index > -1) {
            this.entities.splice(index, 1)
        }
    }

    update(deltaTime: number) {
        this.entities.forEach(e => e.update(deltaTime, this))
    }

}