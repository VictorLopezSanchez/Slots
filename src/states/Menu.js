import Phaser from 'phaser'
import Play from '../sprites/Button'

/**
 * Class to load Main Menu
 */
export default class extends Phaser.State {
    create () {
        this.createWorld()
    }

    /**
    * Function to create world
    */
    createWorld () {
        let background = this.add.sprite(0, 0, 'background', null)
        let play = new Play(this.game, this.world.centerX, this.world.centerY, 'Play Game!', () => {
            this.game.state.start('Game')
        })

        this.game.add.existing(play)
        background.height = this.game.height
        background.width = this.game.width
    }
}
