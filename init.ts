class Game {
    
    public state: State
    public renderer: Renderer
    private ui: UI

    private lastUpdate: number

    constructor() {
        Input.init();
        this.state = new State()
        this.renderer = new Renderer(document.getElementById("canvas_main") as HTMLCanvasElement)
        this.ui = new UI()
        this.lastUpdate = NaN
    }

    mainLoop(time: DOMHighResTimeStamp) {
        let deltaTime = (time - this.lastUpdate) / 1000
        this.lastUpdate = time

        if (!isNaN(deltaTime)) {
            this.state.update(deltaTime)
            this.renderer.update(deltaTime, this.state)
            this.ui.update(deltaTime, this.state.player)
            Input.update()
        }
        window.requestAnimationFrame(this.mainLoop.bind(this))
    }

    
}

window.onload = () => {

    let preloader = new Preloader();

    preloader.onFinish( () => {
        let game = new Game()
        window.requestAnimationFrame(game.mainLoop.bind(game))
    })
    preloader.startLoading();

    
}

