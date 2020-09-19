class Game {
    
    public state: State; 
    public renderer: Renderer; 

    private lastUpdate: number;

    constructor() {
        Input.init();
        this.state = new State();
        this.renderer = new Renderer(document.getElementById("canvas_main") as HTMLCanvasElement);
        this.lastUpdate = NaN;
    }

    mainLoop(time: DOMHighResTimeStamp) {
        let deltaTime = (time - this.lastUpdate) / 1000;
        this.lastUpdate = time;

        if (!isNaN(deltaTime)) {
            this.state.update(deltaTime);
            this.renderer.update(this.state);
            Input.update();
        }
        window.requestAnimationFrame(this.mainLoop.bind(this));
    }

    
}

window.onload = () => {

    let game = new Game();

    window.requestAnimationFrame(game.mainLoop.bind(game));
}
