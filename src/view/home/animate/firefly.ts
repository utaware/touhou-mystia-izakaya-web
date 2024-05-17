import { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/all'

gsap.registerPlugin(MotionPathPlugin)

// 启发：https://www.hereitis.cn/soundCodeView/
export class Firefly {

  total = 60
  time = 60
  // w: 480 h: 276
  width = window.innerWidth
  height = window.innerHeight - 200

  particles = document.querySelector('.particles')!
  firefly = document.querySelector('.firefly')!

  active = true

  minScale = 0.25
  maxScale = 3

  gsapStacks = Array<gsap.core.Timeline>()
  cloneNodes = Array<Node>()

  constructor () {
    this.domInit()
    this.gsapInit()
  }

  play () {
    this.gsapStacks.forEach((item) => item.play())
    this.active = true
  }

  pause () {
    this.gsapStacks.forEach((item) => item.pause())
    this.active = false
  }

  clear () {
    this.gsapStacks.forEach((item) => item.clear())
  }

  toggle () {
    this.active ? this.pause() : this.play()
  }

  random (fixRatio: number, rangeRatio: number, base: number, pad: number = 0) {
    return Number((fixRatio * base + rangeRatio * base * Math.random()).toFixed(2)) - pad
  }

  domInit () {
    const { firefly, particles, total } = this
    const fragement = document.createDocumentFragment()
    this.cloneNodes = Array.from({ length: total }, () => {
      const node = firefly.cloneNode(false)
      fragement.appendChild(node)
      return node
    })
    particles.appendChild(fragement)
  }

  gsapInit () {
    const { time, total, minScale, maxScale, width, height, random } = this

    gsap.set(".firefly", { scale: 0 })

    this.gsapStacks = this.cloneNodes.map((node, index) => {

      const tl = gsap.timeline()

      tl.fromTo(node, {
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
      })
      .progress(index / total)
      .to(node,
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
