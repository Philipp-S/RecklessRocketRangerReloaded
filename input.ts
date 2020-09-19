let Input = {
    downKeys: {},
    pressedKeys: {},
    releasedKeys: {},
    

    // Mouse status
    mouse: {
        x:0,
        y:0,
        down: false,
        click: false,
        onscreen:false
    },

    setMouseState(event) {
        this.mouse.x = event.clientX;
        this.mouse.y = event.clientY;
        this.mouse.down = (event.buttons & 1);
        this.mouse.click = (event.buttons & 1);
    },
    
    // register the event listeners
    init(){
        let me = this;
        document.addEventListener('keydown', function(event) {
            if (!me.downKeys[event.code]) {
                me.pressedKeys[event.code] = true;
            }
            me.downKeys[event.code] = true;
            console.log("Keydown: " + event.code);
        });
        document.addEventListener('keyup', function(event) {
            me.downKeys[event.code] = false;    
            me.releasedKeys[event.code] = true;        
        });
        
                
        document.onmousemove = this.setMouseState.bind(this);
        document.onmousedown = this.setMouseState.bind(this);
        document.onmouseup = this.setMouseState.bind(this);
        document.onmouseleave = function() { me.mouseOnScreen = false; };
        document.onmouseenter = function() { me.mouseOnScreen = true; };
    },
    
    // returns true if the key is currently held down
    keyDown(key: string) {
        return this.downKeys[key] == true;
    },
    
    // returns true if the key was pressed this update
    keyPressed(key: string) {
        return this.pressedKeys[key] == true;
    },
    
    // returns true if the key was released this update
    keyReleased(key: string) {
        return this.releasedKeys[key] == true;
    },
    
    // called to signal that a new update tick begins
    update() {
        this.pressedKeys = {};
        this.releasedKeys = {};
        this.mouse.click = false;
    }
    
}