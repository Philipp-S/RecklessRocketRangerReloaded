// All kinds of magic numbers used by the game
// If you want to make some simple tweaks, then here might be the place to start.

const CONST = {
    GRAVITY: 1000,  // Gravity in pixels per second²
    SCREEN_WIDTH: 1024, 
    SCREEN_HEIGHT: 768,
    EXPLOSION_FORCE: 10000000,
    EXPLOSION_MIN_RADIUS: 50, //radius in pixels from within the maximum explosion force is applied
    EXPLOSION_MAX_RADIUS: 500, //radius in pixels from without explosions are completely ignored
    PLAYER_ACCEL_GROUND: 2000, // player acceleration on ground
    PLAYER_FRICTION_GROUND: 0.9, // fraction of speed the player loses per second while grounded
    PLAYER_FRICTION_AIR: 0.05, // fraction of speed the player loses per second while airborne
    PLAYER_ACCEL_AIR: 1000, // player acceleration while airborne
    PLAYER_GROUND_BOUNCE: 0.5 // how much the player bounces when impacting the ground
}