// the rendering system
class Renderer {

    static readonly COLOR_SKY: string = "#66ddff";
    static readonly COLOR_GROUND: string = "#88ddbb";

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;


    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.canvas.width = CONST.SCREEN_WIDTH
        this.canvas.height = CONST.SCREEN_HEIGHT
        this.ctx = canvas.getContext("2d")
    }


    update(deltaTime: number, state: State) {
        // background
        this.ctx.fillStyle = Renderer.COLOR_SKY
        this.ctx.fillRect(0, 0, CONST.SCREEN_WIDTH, CONST.SCREEN_HEIGHT)
        // ground
        let offset: Point = { x: CONST.SCREEN_WIDTH / 2 - state.camera.pos.x, y: CONST.SCREEN_HEIGHT / 2 - state.camera.pos.y }
        this.ctx.fillStyle = Renderer.COLOR_GROUND
        this.ctx.fillRect(0, offset.y, CONST.SCREEN_WIDTH, CONST.SCREEN_HEIGHT)

        // objects
        state.doWithAllEntities(r => {
            if (r.sprite && r.sprite.isLoaded) {
                this.ctx.save()
                this.ctx.translate( Math.round(r.pos.x + offset.x),
                                    Math.round(r.pos.y + offset.y) )
                
                if (r.sprite.rotation !== 0) { 
                    this.ctx.rotate(r.sprite.rotation)
                }
                
                if (r.sprite.flipped){
                    this.ctx.scale(-1, 1)
                }
                this.ctx.translate( -r.sprite.renderPivot.x, -r.sprite.renderPivot.y) 
                
                r.sprite.draw(this.ctx)
                this.ctx.restore()
                
                if (CONST.DEBUG_SHOW_COLLIDERS) {
                    this.ctx.strokeStyle = "#ff0000"
                    this.ctx.beginPath();
                    this.ctx.arc(r.pos.x + offset.x, r.pos.y + offset.y, Math.sqrt(r.collisionRadiusSqare), 0, Math.PI * 2);
                    this.ctx.stroke(); 
                }
            }
        })

    }
}