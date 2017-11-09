import Phaser from 'phaser'
import WebFont from 'webfontloader'

export default class extends Phaser.State {
    init () {
        this.stage.backgroundColor = '#EDEEC9'
        this.fontsReady = false
        this.fontsLoaded = this.fontsLoaded.bind(this)
    }

    preload () {
        WebFont.load({
            google: {
                families: ['Bangers']
            },
            active: this.fontsLoaded
        })

        let text = this.add.text(this.world.centerX, this.world.centerY, 'loading fonts', {
            font: '16px Arial',
            fill: '#dddddd',
            align: 'center'
        })
        text.anchor.setTo(0.5, 0.5)

        this.load.image('loaderBg', './assets/images/loader-bg.png')
        this.load.image('loaderBar', './assets/images/loader-bar.png')
        this.load.image('image1', './assets/images/slot-icon-03.png')
        this.load.image('image2', './assets/images/slot-icon-04.png')
        this.load.image('image3', './assets/images/slot-icon-05.png')
    }

    render () {
        if (this.fontsReady) {
            this.state.start('Preload')
        }
    }

    fontsLoaded () {
        this.fontsReady = true
    }
}