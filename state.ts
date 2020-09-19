// the main game-state class
class State {

    public camera: Camera 
    public entities: Entity[]
    public cursor: Cursor
    public player: Player

    private lastChunkGenX = 0

    constructor() {
        this.entities = Array()

        this.player = new Player()
        this.entities.push(this.player)
        this.camera = new Camera(this.player)
        this.entities.push(this.camera)
        this.cursor = new Cursor()
        this.entities.push(this.cursor)

        for (var i = 0; i < CONST.CHUNK_NUMBER * CONST.CHUNK_WIDTH; i+= CONST.CHUNK_WIDTH) {
            this.generateChunk(i)
            this.generateChunk(-i - CONST.CHUNK_WIDTH)
        }

    }

    removeEntity(entity: Entity) {
        let index = this.entities.indexOf(entity)
        if (index > -1) {
            this.entities.splice(index, 1)
        }
    }

    update(deltaTime: number) {

        // check for chunk regeneration
        let cleanupRequired = false    
        while (this.player.pos.x >= this.lastChunkGenX + CONST.CHUNK_WIDTH) {
            let start = this.lastChunkGenX + CONST.CHUNK_WIDTH * CONST.CHUNK_NUMBER
            this.generateChunk(start)
            this.lastChunkGenX += CONST.CHUNK_WIDTH
            cleanupRequired = true
        }
        while (this.player.pos.x <= this.lastChunkGenX - CONST.CHUNK_WIDTH){
            let start = this.lastChunkGenX - CONST.CHUNK_WIDTH * (CONST.CHUNK_NUMBER + 1)
            this.generateChunk(start)
            this.lastChunkGenX -= CONST.CHUNK_WIDTH
            cleanupRequired = true
        }
        if (cleanupRequired) {
            this.entities = this.entities.filter(e => {
                return (e.pos.x > this.lastChunkGenX - CONST.CHUNK_WIDTH * CONST.CHUNK_NUMBER) &&
                       (e.pos.x < this.lastChunkGenX + CONST.CHUNK_WIDTH * CONST.CHUNK_NUMBER)
            })
        }

        this.entities.forEach(e => e.update(deltaTime, this))
    }

    private generateChunk(start: number) {
        MOB_LAYERS.forEach(layer => {
            layer.spawn(this, start)
        })
    }

}