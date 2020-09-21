interface RecordEntry {
    pos: Point
    kills: number
}

class UI {

    private airborneSpan: HTMLSpanElement
    private altitudeSpan: HTMLSpanElement
    private recordDiv: HTMLElement
    private recordTypeSpan: HTMLSpanElement
    private recordValueSpan: HTMLElement

    private recordHeight: RecordCategory
    private recordFall: RecordCategory
    private recordKills: RecordCategory
    private recordDistance: RecordCategory
    private recordAirtime: RecordCategory
    private recordTutorial: RecordCategory
    private lastPlayerAirtime = 0

    private recordShowTimeLeft = 0

    private totalTime = 0
    private timeRecorded = 0

    private record: RecordEntry[] = Array()

    private tutorialUnderstood = false

    constructor() {
        this.airborneSpan = document.getElementById("ui_airborne")
        this.altitudeSpan = document.getElementById("ui_altitude")
        this.recordDiv = document.getElementById("ui_records")
        this.recordTypeSpan = document.getElementById("ui_records_type")
        this.recordValueSpan = document.getElementById("ui_records_value")

        this.recordHeight = new RecordCategory(
            "Altitude Record",  
            (value) => Math.floor(value / CONST.METER).toString() + " meters",
            CONST.PLAYER_START_ALTITUDE )
        this.recordFall = new RecordCategory(
            "Highest Fall",  
            (value) => Math.floor(value / CONST.METER).toString() + " meters",
            CONST.PLAYER_START_ALTITUDE )
        this.recordAirtime = new RecordCategory(
            "Airtime record",  
            (value) => value.toFixed(1) + " seconds",
            4)
        this.recordDistance = new RecordCategory(
            "Horizontal Distance per Minute record",  
            (value) => Math.floor(value / CONST.METER).toString() + " meters",
            200)
        this.recordKills = new RecordCategory(
            "Kill per Minute record",   
            (value) => value.toString(),
            0)

    }

    update(deltaTime: number, player: Player) {
        // basic display
        this.altitudeSpan.textContent = Math.floor(player.pos.y / -CONST.METER).toString()
        this.airborneSpan.textContent = player.airtime.toFixed(1)

        if(this.recordShowTimeLeft < 0) {
            this.recordDiv.style.display = "none"
        } else {
            this.recordDiv.style.display = "block"
        }

        // update every-frame records
        if (player.isGrounded) {
            this.recordFall.checkRecord(player.falldist, this)
            this.recordAirtime.checkRecord(this.lastPlayerAirtime, this)
        }
        this.lastPlayerAirtime = player.airtime
        this.recordHeight.checkRecord(-player.pos.y, this)

        // update time-based records
        while(this.timeRecorded < this.totalTime) {
            this.record.push({
                pos: { x: player.pos.x, y: player.pos.y },
                kills: player.kills
            })
            if (this.record.length > 60) {
                let begin = this.record.shift()
                let end = this.record[59]                
                this.recordKills.checkRecord(end.kills - begin.kills, this)
                this.recordDistance.checkRecord(Math.abs(end.pos.x - begin.pos.x), this)
            }
            this.timeRecorded += 1
        }

/*

        if (player.pos.y < -200 && player.velocity.y < 0) {
            this.tutorialUnderstood = true
        }
        if(this.tutorialUnderstood === false ) {
            this.postRecord("Aim&Shoot with mouse",  "A&D or left&right for moving while airborne")
        }
        */

        this.totalTime += deltaTime
        this.recordShowTimeLeft -= deltaTime
    }

    postRecord(type: string, value: string) {
        this.recordShowTimeLeft = CONST.RECORD_SHOW_DURATION
        this.recordTypeSpan.textContent = type
        this.recordValueSpan.textContent = value
    }
}

class RecordCategory{
    headline: string
    toStringFunc:  (value:number) => string

    private best: number

    constructor(headline:string, toString: (value:number) => string, best: number) {
        this.headline = headline
        this.toStringFunc = toString
        this.best = best
    }

    checkRecord(current: number, ui: UI) {
        if (current > this.best) {
            this.best = current
            ui.postRecord(this.headline, this.toStringFunc(this.best))
        }
    }

}