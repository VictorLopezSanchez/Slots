/* globals __DEV__ */
import Phaser from 'phaser'
import Reel from '../sprites/Reel'
import Button from '../sprites/Button'

const NUM_REELS = 4

export default class extends Phaser.State {
    init () {
        // Parameters
        this.reels = []
        this.states = {
            stoppingReels: false,
            stopReelsProgressively: false
        }
        // Config to see FPS
        this.game.time.advancedTiming = true
    }

    create () {
        this.createWorld()
    }

    startReels () {
        if (this.states.stoppingReels) return
        for (let reel of this.reels) {
            if (!reel.runReel) reel.start()
        }
    }

    stopReels () {
        for (const reel of this.reels) {
            reel.stop()
        }
        this.states.stoppingReels = false
    }

    stopReelsProgressively () {
        let time = 0
        for (const [key, reel] of this.reels.entries()) {
            // For each reel, stop each seconds
            this.game.time.events.add(Phaser.Timer.SECOND * time, () => {
                // Check if button Stop is clicked two times
                if (!this.states.stopReelsProgressively) return
                reel.stop()
                // Check if is the last reel stopped
                if ((key + 1) === NUM_REELS) {
                    this.states.stoppingReels = false
                }
            })
            time += 0.5
        }
    }

    createWorld () {
        // Background
        let background = this.add.sprite(this.game.width * 0.5, this.game.height * 0.5, 'background', null)
        background.anchor.set(0.5)

        // Init Reels
        let x = 0
        let y = 0
        for (let i = 0; i < NUM_REELS; i++) {
            this.reels[i] = new Reel(this.game, x, y)
            x += this.reels[i].width + 20
        }

        // Draw rectangle to hide first cell of reels
        let graphics = this.game.add.graphics(0, 0)
        graphics.beginFill(0xFF3300)
        graphics.drawRect(0, 0, 960, 160)
        graphics.endFill()

        // Play Button
        let play = new Button(this.game, this.game.width * 0.3, this.game.height * 0.13, 'Start!', () => {
            this.startReels()
        })
        this.game.add.existing(play)

        // Stop Button
        let stop = new Button(this.game, this.game.width * 0.7, this.game.height * 0.13, 'Stop!', () => {
            if (this.states.stoppingReels) {
                // Second time clicked Stop button
                this.states.stopReelsProgressively = false
                this.stopReels()
            } else {
                // First time clicked Stop button
                this.states.stoppingReels = true
                this.states.stopReelsProgressively = true
                this.stopReelsProgressively()
            }
        })
        this.game.add.existing(stop)
    }

    render () {
        if (__DEV__) this.game.debug.text(this.game.time.fps || '--', 2, 14, '#00ff00')
    }
}