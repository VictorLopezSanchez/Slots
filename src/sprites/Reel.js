import Phaser from 'phaser'

const REEL_SPEED = 125
const BOUNCE = 90

export default class extends Phaser.Group {
    constructor (game, x, numCells) {
        super(game, game.world, 'Reel')

        this.numCells = numCells
        this.runReel = false
        this.game = game

        let y = 0
        for (let i = 0; i < this.numCells; i++) {
            // Random initial images
            let cell = this.game.add.sprite(x, y, 'image' + parseInt(Math.random() * (4 - 1) + 1))
            // Size image square
            cell.height = this.game.height / this.numCells
            cell.width = this.game.height / this.numCells
            cell.tint = '0xffffff'
            this.add(cell)
            y += cell.height
        }
    }

    spin () {
        this.createBounce(this.children[0].height + (this.children[0].height / 2), REEL_SPEED, this.shift)
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
        for (let i = this.numCells - 1; i > 0; i--) {
            this.children[i].loadTexture(this.children[i - 1].key)
        }
        this.children[0].loadTexture('image' + parseInt(Math.random() * (4 - 1) + 1))
        if (this.runReel) this.spin()
        else {
            this.downUpEffect()
        }
    }

    downUpEffect () {
        this.createBounce(BOUNCE, REEL_SPEED, () => {
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
