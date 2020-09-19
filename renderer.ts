// the rendering system
class Renderer {

    static readonly COLOR_SKY: string = "#66ddff";
    static readonly COLOR_GROUND: string = "#88ddbb";

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;


    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
    }


    update(state: State) {
        // background
        this.ctx.fillStyle = Renderer.COLOR_SKY;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        // ground
        let offset: Point = { x: this.canvas.width / 2 - state.camera.pos.x, y: this.canvas.height / 2 - state.camera.pos.y };
        this.ctx.fillStyle = Renderer.COLOR_GROUND;
        this.ctx.fillRect(0, offset.y, this.canvas.width, this.canvas.height);

        // objects
        state.entities.forEach(r => {
            if (r.sprite) {
                this.ctx.drawImage(r.sprite, r.pos.x + offset.x - r.renderPivot.x, r.pos.y + offset.y - r.renderPivot.y );
            }
        })

    }
}