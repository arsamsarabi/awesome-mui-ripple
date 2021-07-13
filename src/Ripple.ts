import type { MouseEvent } from 'react'

type DefaultColors = 'dark' | 'light'
type RippleColor = DefaultColors | string

const defaultColors: { [key in DefaultColors]: string } = {
  light: 'rgba(255,255,255, 0.3)',
  dark: 'rgba(0,0,0, 0.2)',
}

class Ripple {
  private x: number
  private y: number
  private z: number

  public constructor() {
    this.x = 0
    this.y = 0
    this.z = 0
  }

  private findFurthestPoint(
    clickPointX: number,
    elementWidth: number,
    offsetX: number,
    clickPointY: number,
    elementHeight: number,
    offsetY: number,
  ): void {
    this.x = clickPointX - offsetX > elementWidth / 2 ? 0 : elementWidth
    this.y = clickPointY - offsetY > elementHeight / 2 ? 0 : elementHeight
    this.z = Math.hypot(
      this.x - (clickPointX - offsetX),
      this.y - (clickPointY - offsetY),
    )
  }

  private applyStyles(
    element: HTMLElement,
    rippleColor: RippleColor,
    rect: DOMRect,
    radius: number,
    event: MouseEvent<HTMLButtonElement>,
  ): void {
    const isDefaultColor = rippleColor === 'light' || rippleColor === 'dark'

    if (isDefaultColor)
      element.style.backgroundColor = defaultColors[rippleColor]
    if (!isDefaultColor) element.style.backgroundColor = rippleColor

    element.style.borderRadius = '50%'
    element.style.pointerEvents = 'none'
    element.style.position = 'absolute'
    element.style.left = event.clientX - rect.left - radius + 'px'
    element.style.top = event.clientY - rect.top - radius + 'px'
    element.style.width = element.style.height = radius * 2 + 'px'
  }

  private applyAnimation(element: HTMLElement): void {
    element.animate(
      [
        {
          transform: 'scale(0)',
          opacity: 1,
        },
        {
          transform: 'scale(1.5)',
          opacity: 0,
        },
      ],
      {
        duration: 500,
        easing: 'linear',
      },
    )
  }

  public ripple(
    event: MouseEvent<HTMLButtonElement>,
    rippleColor: RippleColor,
  ): void {
    const element = event.currentTarget as HTMLElement
    if (element === null) return

    element.style.position = 'relative'
    element.style.overflow = 'hidden'

    const rect = element.getBoundingClientRect()

    this.findFurthestPoint(
      event.clientX,
      element.offsetWidth,
      rect.left,
      event.clientY,
      element.offsetHeight,
      rect.top,
    )

    const circle = document.createElement('span')

    this.applyStyles(circle, rippleColor, rect, this.z, event)
    this.applyAnimation(circle)
    element.appendChild(circle)
    setTimeout(() => circle.remove(), 500)
  }
}

export default Ripple
