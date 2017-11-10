import Phaser from 'phaser'

export default class extends Phaser.Text {
    constructor (game, x, y, label, callback) {
        let style = {font: '32px Arial', fill: '#ffff00', align: 'center'}
        super(game, x, y, label, style)

        this.anchor.set(0.5)
        this.inputEnabled = true
        this.events.onInputDown.add(callback, this)
    }
}
