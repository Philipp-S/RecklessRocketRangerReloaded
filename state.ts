// the main game-state class
class State {

    public camera: Camera 
    private entities: Entity[]
    public cursor: Cursor
    public player: Player

    private lastChunkGenX = 0
    private entitySortRequired = false;

    constructor() {
        this.entities = Array()

        let rocketlauncher = new Rocketlauncher()
        this.addEntity(rocketlauncher)
        this.player = new Player(rocketlauncher)
        this.addEntity(this.player)
        this.camera = new Camera(this.player)
        this.addEntity(this.camera)
        this.cursor = new Cursor()
        this.addEntity(this.cursor)

        for (var i = 0; i < CONST.CHUNK_NUMBER * CONST.CHUNK_WIDTH; i+= CONST.CHUNK_WIDTH) {
            this.generateChunk(i)
            this.generateChunk(-i - CONST.CHUNK_WIDTH)
        }
        this.entitySortRequired = true;

    }

    removeEntity(entity: Entity) {
        let index = this.entities.indexOf(entity)
        if (index > -1) {
            this.entities.splice(index, 1)
        }
    }

    addEntity(entity: Entity) {
        this.entities.push(entity)
        this.entitySortRequired = true
    }

    doWithAllEntities(callbackfn: (value: Entity, index: number, array: Entity[]) => void, thisArg?: any) {
        this.entities.forEach(callbackfn)
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

        if (this.entitySortRequired){
            this.entities = this.entities.sort((a:Entity, b:Entity) => {
                if (a.sprite === undefined || b.sprite === undefined) return 0;
                return a.sprite.drawOrder - b.sprite.drawOrder
            });
            this.entitySortRequired = false;
        }
    }

    private generateChunk(start: number) {
        MOB_LAYERS.forEach(layer => {
            layer.spawn(this, start)
        })
    }


}