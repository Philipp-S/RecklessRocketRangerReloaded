// All kinds of magic numbers used by the game
// If you want to make some simple tweaks, then here might be the place to start.

const CONST = {
    SCREEN_WIDTH: 1024, 
    SCREEN_HEIGHT: 768,
    GRAVITY: 1000,  // Gravity in pixels per second²
    EXPLOSION_FORCE: 10000000, // impulse caused by rocket explosions
    EXPLOSION_MIN_RADIUS: 64, //radius in pixels from within the maximum explosion force is applied
    EXPLOSION_MAX_RADIUS: 640, //radius in pixels from without explosions are completely ignored
    PLAYER_GROUND_COLLISION: -32, //distance in pixels between player center of mass and feet
    PLAYER_ACCEL_GROUND: 2000, // player acceleration on ground
    PLAYER_FRICTION_GROUND: 0.999, // fraction of speed the player loses per second while grounded
    PLAYER_ACCEL_AIR: 1000, // player acceleration while airborne
    PLAYER_FRICTION_AIR: 0.7, // fraction of speed the player loses per second while airborne
    PLAYER_GROUND_BOUNCE: 0.75, // how much the player bounces when impacting the ground
    ROCKET_VELOCITY: 1000, // speed of rockets in pixels per second
    ROCKET_START_HEIGHT: 0, // hight at the player sprite where rockets are spawned
    ROCKET_SHOOTING_COOLDOWN: 1, // time in seconds between shooting rockets 
    MOB_BALLOON_RADIUS: 32 // radius of the collision hitcircle
}