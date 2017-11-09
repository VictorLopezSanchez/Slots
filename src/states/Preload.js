import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
    init () {}

    preload () {
        this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
        this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
        centerGameObjects([this.loaderBg, this.loaderBar])
        this.load.setPreloadSprite(this.loaderBar)

        // load your assets
      this.load.image('image1', './assets/images/slot-icon-03.png')
      this.load.image('image2', './assets/images/slot-icon-04.png')
      this.load.image('image3', './assets/images/slot-icon-05.png')
        this.load.image('background', 'assets/images/background.jpg')
    }

    create () {
        this.state.start('Menu')
    }
}
