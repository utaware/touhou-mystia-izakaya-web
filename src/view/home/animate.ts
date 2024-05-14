import { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/all'

gsap.registerPlugin(MotionPathPlugin)

export function animate () {

  const total = 60
  const time = 60

  const width = window.innerWidth
  const height = window.innerHeight - 200

  const particles = document.querySelector(".particles")
  const cloneEl = document.querySelector('#firefly')

  const [minScale, maxScale] = [1, 2]

  // w: 480 h: 276
  function h (y: number) {
    return y / 280 * height
  }

  function w (x: number) {
    return x / 480 * width
  }

  for (var i = 0; i <= total; i++) {

    if (i === 0) {
      gsap.set("#firefly", { scale: 0 })
    } else {
      const firefly = cloneEl!.cloneNode(false)
      particles!.appendChild(firefly);
      gsap.fromTo(firefly, {
        y: h(120) + h(110) * Math.random(),
        x: w(200) + w(250) * Math.random(),
        scale: 3 * Math.random(),
      }, {
        duration: time,
        motionPath: {
          type: "thru",
          path: [
            {
              x: w(50) + w(100) * Math.random(),
              y: h(100) + h(60) * Math.random(),
              scale: minScale + Math.random(),
              alpha: 1
            },
            {
              x: w(200) + w(160) * Math.random(),
              y: h(40) + h(80) * Math.random(),
              scale: maxScale - Math.random(),
              alpha: 0.25
            },
            {
              x: w(390) + w(50) * Math.random(),
              y: h(60) + h(60) * Math.random(),
              scale: minScale * Math.random(),
              alpha: 0.7 + 0.3 * Math.random()
            },
          ],
        },
        onComplete: loop,
        onCompleteParams: [firefly],
        ease: 'sine.inOut',
      }).progress(i / total);

    }

  }

  function loop (target: Node) {
    gsap.timeline({ yoyo: true, repeat: -1 }).to(target,
      {
        ease: 'sine.inOut',
        duration: time,
        motionPath: {
          type: "thru",
          path: [
            {
              x: w(100) + w(60) * Math.random(),
              y: h(190) + h(30) * Math.random(),
              scale: maxScale - Math.random()
            },
            {
              x: w(150) + w(100) * Math.random(),
              y: h(190) + h(50) * Math.random(),
              scale: minScale + Math.random(),
              alpha: 1
            },
            {
              x: w(200) + w(160) * Math.random(),
              y: h(190) - h(60) * Math.random(),
              scale: maxScale - Math.random(),
              alpha: 0.25
            },
            {
              y: h(200) - h(70) * Math.random(),
              x: w(390) + w(50) * Math.random(),
              scale: maxScale * Math.random(),
              alpha: 1
            }
          ]
        }
      }
    )
  }
}