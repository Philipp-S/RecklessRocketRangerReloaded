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


    update(state: State) {
        // background
        this.ctx.fillStyle = Renderer.COLOR_SKY
        this.ctx.fillRect(0, 0, CONST.SCREEN_WIDTH, CONST.SCREEN_HEIGHT)
        // ground
        let offset: Point = { x: CONST.SCREEN_WIDTH / 2 - state.camera.pos.x, y: CONST.SCREEN_HEIGHT / 2 - state.camera.pos.y }
        this.ctx.fillStyle = Renderer.COLOR_GROUND
        this.ctx.fillRect(0, offset.y, CONST.SCREEN_WIDTH, CONST.SCREEN_HEIGHT)

        // objects
        state.entities.forEach(r => {
            if (r.sprite) {
                let x = Math.round(r.pos.x + offset.x - r.renderPivot.x)
                let y = Math.round(r.pos.y + offset.y - r.renderPivot.y)
                this.ctx.drawImage(r.sprite,x ,y )
            }
        })

    }
}