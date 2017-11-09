import Phaser from 'phaser'

const NUM_CELLS = 4
const REEL_SPEED = 125

export default class extends Phaser.Group {
    constructor (game, x, y) {
        super(game, game.world, 'Reel')

        this.runReel = false
        this.game = game

        for (let i = 0; i < NUM_CELLS; i++) {
            let cell = this.game.add.sprite(x, y, 'image' + parseInt(Math.random() * (4 - 1) + 1))
            this.add(cell)
            y += cell.height + 60
        }
    }

    spin () {
        this.createBounce(this.children[0].height + 60, REEL_SPEED, this.shift)
    }

    reset () {
        this.y = 0
    }

    start () {
        this.runReel = true
        this.spin()
    }

    stop () {
        this.runReel = false
    }

    shift () {
        this.reset()
        for (let i = NUM_CELLS - 1; i > 0; i--) {
            this.children[i].loadTexture(this.children[i - 1].key)
        }
        this.children[0].loadTexture('image' + parseInt(Math.random() * (4 - 1) + 1))
        if (this.runReel) this.spin()
        else {
            this.downUpEffect()
        }
    }

    downUpEffect () {
        this.createBounce(90, REEL_SPEED, () => {
            this.createBounce(0, REEL_SPEED)
        })
    }

    createBounce (y, speed, callback) {
        let bounce = this.game.add.tween(this)
        bounce.to({ y: y }, speed, Phaser.Linear)
        if (callback !== undefined) bounce.onComplete.add(callback, this)
        bounce.start()

        return bounce
    }
}
