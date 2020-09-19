// handler for resources
enum ImageResource {
    PLAYER = "img/player.png",
    BALLOON = "img/balloon.png",
    BIRD = "img/bird.png",
    UFO = "img/ufo.png",
    CURSOR = "img/cursor.png",
    ROCKET = "img/rocket.png",
    EXPLOSION = "img/explosion.png"
}

class Preloader {
    
    private finishedFunc: () => void = () => {}
    private finished = false
    private numLoading = 0
    private numFinished = 0

    private resources = Array();

    private preloadDiv: HTMLElement;
    private preloadBarDiv: HTMLElement;
    private gameDiv: HTMLElement;

    startLoading() {
        console.log("Preloading")
        this.preloadDiv = document.getElementById("preloader");
        this.preloadBarDiv = document.getElementById("preloader_bar");
        this.gameDiv = document.getElementById("game");

        for(let resource in ImageResource) {
            let resourceUrl = ImageResource[resource];
            console.log("Loading " + resourceUrl)
            this.numLoading++
            let image = new Image()
            image.src = resourceUrl
            image.onload = this.resourceFinished.bind(this)
            image.onerror = this.resourceFinished.bind(this)
            this.resources.push(image)
        }
    }

    private resourceFinished() {
        this.numFinished++
        this.preloadBarDiv.style.width = (this.numFinished / this.numLoading * 100).toString() + "%"
        if (this.numFinished === this.numLoading) {
            this.preloadDiv.style.display = "none"
            this.gameDiv.style.display = "block"
            this.finished = true;
            if (this.finishedFunc) {
                this.finishedFunc()
                this.finishedFunc = null
            }
        }
    }

    onFinish(func: () => void) {
        if (this.finished) {
            func()
        } else {
            this.finishedFunc = func;
        }
    }
}