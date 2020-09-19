class UI {

    private airborne_span: HTMLSpanElement;
    private altitude_span: HTMLSpanElement;

    constructor() {
        this.airborne_span = document.getElementById("ui_airborne")
        this.altitude_span = document.getElementById("ui_altitude")
    }

    update(player: Player) {
        this.altitude_span.textContent = Math.floor(player.pos.y / -40).toString()
        this.airborne_span.textContent = player.airtime.toFixed(1)
    }
}