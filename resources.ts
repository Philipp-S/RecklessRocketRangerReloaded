// handler for resources
enum ImageResource {
    PLAYER = "img/player.png",
    ROCKETLAUNCHER = "img/rocketlauncher.png",
    BALLOON = "img/balloon.png",
    BIRD = "img/bird.png",
    UFO = "img/ufo.png",
    CURSOR = "img/cursor.png",
    ROCKET = "img/rocket.png",
    EXPLOSION = "img/explosion.png",
    SPARK = "img/spark.png",
    PUFF = "img/puff.png"
}

enum AudioResource {
    BGM = "audio/heavy-trailer-2-by-sascha-ende-from-filmmusic-io.mp3",
    SHOOT = "audio/shoot.ogg",
    EXPLOSION = "audio/explosion.ogg",
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

        for(let resource in AudioResource) {
            let resourceUrl = AudioResource[resource];
            console.log("Loading " + resourceUrl)
            this.numLoading++
            let audio = new Audio(resourceUrl)
            audio.oncanplaythrough = this.resourceFinished.bind(this)
            audio.onerror =  this.resourceFinished.bind(this)
        }
    }

    private resourceFinished() {
        this.numFinished++
        this.preloadBarDiv.style.width = (this.numFinished / this.numLoading * 100).toString() + "%"
        if (this.numFinished === this.numLoading) {
            
            let headline = document.getElementById("preloader_headline") as HTMLSpanElement
            headline.textContent = "Click to start"
            document.onclick = () => {
                document.onclick = () => {}
                this.preloadDiv.style.display = "none"
                this.gameDiv.style.display = "block"
                this.finished = true;
                if (this.finishedFunc) {
                    this.finishedFunc()
                    this.finishedFunc = null
                }
            }
            
        }
    }

    onFinish(func: () => void) {      
        this.finishedFunc = func;
    }
}