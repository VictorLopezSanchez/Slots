import Phaser from 'phaser'
import Play from '../sprites/Button'

export default class extends Phaser.State {
    init () {}
    preload () {}
    create () {
        this.createWorld()
    }

    createWorld () {
        let background = this.add.sprite(this.game.width * 0.5, this.game.height * 0.5, 'background', null)
        let play = new Play(this.game, this.game.width * 0.5, this.game.height * 0.5, 'Play Game!', () => {
            this.game.state.start('Game')
        })

        this.game.add.existing(play)
        background.anchor.set(0.5)
    }
}
