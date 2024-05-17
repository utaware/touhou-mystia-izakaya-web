import { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/all'

gsap.registerPlugin(MotionPathPlugin)

export class Firefly {

  total = 60
  time = 60
  // w: 480 h: 276
  width = window.innerWidth
  height = window.innerHeight - 200

  particles = document.querySelector(".particles")!
  firefly = document.querySelector('#firefly')!

  active = true

  minScale = 0.25
  maxScale = 3

  stacks = Array<gsap.core.Timeline>()

  constructor () {
    this.init()
  }

  play () {
    this.stacks.forEach((item) => item.play())
    this.active = true
  }

  pause () {
    this.stacks.forEach((item) => item.pause())
    this.active = false
  }

  toggle () {
    this.active ? this.pause() : this.play()
  }

  random (fixRatio: number, rangeRatio: number, base: number, pad: number = 0) {
    return Number((fixRatio * base + rangeRatio * base * Math.random()).toFixed(2)) - pad
  }

  init () {
    const {
      time, total,
      minScale, maxScale,
      particles, firefly,
      width, height, random
    } = this
    gsap.set(".firefly", { scale: 0 })
    this.stacks = Array.from({ length: total }, (_, index) => {
      const target = firefly.cloneNode(false) as HTMLElement
      target.id = 'firefly_' + index
      particles!.appendChild(target);
      const tl = gsap.timeline()
      tl.fromTo(target, {
        x: random(0.42, 0.52, width),
        y: random(0.43, 0.4, height),
        scale: random(minScale, maxScale - minScale, 1),
      }, {
        duration: time,
        motionPath: {
          type: "thru",
          path: [
            {
              x: random(0.1, 0.2, width),
              y: random(0.36, 0.22, height),
              scale: random(1, 1, 1),
              alpha: 1
            },
            {
              x: random(0.42, 0.33, width),
              y: random(0.15, 0.3, height),
              scale: random(maxScale, -1, 1),
              alpha: random(0.5, 0.25, 1)
            },
            {
              x: random(0.8, 0.1, width),
              y: random(0.22, 0.22, height),
              scale: random(minScale, 1 - minScale, 1),
              alpha: random(0.7, 0.3, 1)
            },
          ],
        },
        ease: 'sine.inOut',
      }).progress(index / total).to(target,
        {
          ease: 'sine.inOut',
          duration: time,
          repeat: -1,
          yoyo: true,
          motionPath: {
            type: "thru",
            path: [
              {
                x: random(0.21, 0.125, width),
                y: random(0.7, 0.1, height),
                scale: random(minScale, maxScale - minScale, 1)
              },
              {
                x: random(0.3, 0.2, width),
                y: random(0.7, 0.18, height),
                scale: random(1, 1, 1),
                alpha: 1
              },
              {
                x: random(0.42, 0.33, width),
                y: random(0.7, -0.22, height),
                scale: random(maxScale, -1, 1),
                alpha: random(0.5, 0.25, 1)
              },
              {
                x: random(0.8, 0.1, width),
                y: random(0.72, 0.25, height),
                scale: random(minScale, maxScale - minScale, 1),
                alpha: 1
              }
            ]
          }
        }
      )
      return tl
    })
  }

}
