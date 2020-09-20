class UI {

    private airborneSpan: HTMLSpanElement
    private altitudeSpan: HTMLSpanElement
    private recordDiv: HTMLElement
    private recordTypeSpan: HTMLSpanElement
    private recordValueSpan: HTMLElement

    private bestHeight = -CONST.PLAYER_START_ALTITUDE
    private bestFall = CONST.PLAYER_START_ALTITUDE

    private timeLeft = 0

    constructor() {
        this.airborneSpan = document.getElementById("ui_airborne")
        this.altitudeSpan = document.getElementById("ui_altitude")
        this.recordDiv = document.getElementById("ui_records")
        this.recordTypeSpan = document.getElementById("ui_records_type")
        this.recordValueSpan = document.getElementById("ui_records_value")
    }

    update(deltaTime: number, player: Player) {
        this.altitudeSpan.textContent = Math.floor(player.pos.y / -CONST.METER).toString()
        this.airborneSpan.textContent = player.airtime.toFixed(1)


        this.timeLeft -= deltaTime
        if(this.timeLeft < 0) {
            this.recordDiv.style.display = "none"
        } else {
            this.recordDiv.style.display = "block"
        }

        if (player.pos.y < this.bestHeight) {
            this.bestHeight = player.pos.y
            this.postRecord("New Altitude Record",  Math.floor(player.pos.y / -CONST.METER).toString() + " meters")
        }

        if (player.isGrounded) {
            if (player.falldist > this.bestFall) {
                this.bestFall = player.falldist
                this.postRecord("New longest fall",  Math.floor(player.falldist / CONST.METER).toString() + " meters")
            }
        }
    }

    postRecord(type: string, value: string) {
        this.timeLeft = CONST.RECORD_SHOW_DURATION
        this.recordTypeSpan.textContent = type
        this.recordValueSpan.textContent = value
    }
}