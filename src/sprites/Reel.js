import Phaser from 'phaser'

const REEL_SPEED = 125

export default class extends Phaser.Group {
    constructor (game, x, numCells) {
        super(game, game.world, 'Reel')

        this.numCells = numCells
        this.runReel = false
        this.game = game

        let y = 0
        for (let i = 0; i < this.numCells; i++) {
            let cell = this.game.add.sprite(x, y, 'image' + parseInt(Math.random() * (4 - 1) + 1))
            cell.height = this.game.height / this.numCells
            this.add(cell)
            y += cell.height
        }
    }

    spin () {
        let bounce = this.game.add.tween(this)
        bounce.to({ y: this.children[0].height + 60 }, REEL_SPEED, Phaser.Linear)
        bounce.onComplete.add(this.shift, this)
        bounce.start()
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
    }
}
