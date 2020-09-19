class Player extends Entity {
    pos: Point;
    sprite: CanvasImageSource;
    renderPivot: Point = {x:32, y:64};

    private isGrounded = false;

    private velocity: Point = {x: 0, y:0};

    constructor() {
        super( { x: 0, y: -500} );
        let image = new Image();
        Resources.setImage(this, ImageResource.PLAYER);
    }

    update(deltaTime: number, state: State) : void {
        // apply gravity
        this.velocity.y += CONST.GRAVITY * deltaTime;

        if(Input.mouse.click) {
            this.explosion({x: 0, y: 10});
        }

        // apply velocity
        this.pos.x += this.velocity.x * deltaTime;
        this.pos.y += this.velocity.y * deltaTime;

        // ground collision checking
        if (this.pos.y > 0) {
            this.pos.y = 0;
            this.velocity = {x: 0, y: 0}
            this.isGrounded = true;
        }


    }

    explosion(point: Point) {
        console.log("Explosion");
        let distx = this.pos.x - point.x;
        let disty = this.pos.y - point.y;
        let dist = Math.sqrt(distx * distx + disty * disty);

        let force = CONST.EXPLOSION_FORCE / ( dist * dist + CONST.EXPLOSION_MIN_RADIUS )
        let normalized: Point = { x: distx / dist, y: disty / dist };

        // it would be more physically correct to add the explosion force, but
        // stopping the player actually feels more right
        this.velocity.x = normalized.x * force;
        this.velocity.y = normalized.y * force;

    }
}