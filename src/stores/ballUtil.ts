import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBallUtil = defineStore('ballUtil', () => {
  /**
   * The x position of the ball.
   */
  const xPos = ref(50)

  /**
   * The y position of the ball.
   */
  const yPos = ref(window.innerHeight * 1.2)

  /**
   * The previous x position of the ball
   * (used to calculate acceleration)
   */
  const previousX = ref(50)

  /**
   * The previous y position of the ball
   * (used to calculate acceleration)
   */
  const previousY = ref(50)

  /**
   * Acceleration of the ball in the x direction.
   */
  const xAcceleration = ref(0)

  /**
   * Acceleration of the ball in the y direction.
   */
  const yAcceleration = ref(-15)

  /**
   * Acceleration decay of the ball in the x direction
   */
  const xDecay = 0.992

  /**
   * Acceleration decay of the ball in the y direction
   */
  const yDecay = 0.993

  /**
   * The function to move the ball in the x-direction.
   *
   * Position is calculated by taking the current xPos and adding the x acceleration to it.
   *
   * If the new position will move the ball of the edge of the screen, the ball is moved to the edge of the screen,
   * and it's direction is changed.
   *
   * If the ball is moving very slowly (< 0.5px acceleration per cycle), stop it completely.
   *
   * If the ball has stopped moving in the y direction "bouncing" and is now only "rolling", extra decay is added
   * to simulate friction.
   */
  function moveBallX() {
    const potentialResult = xPos.value + xAcceleration.value
    if (potentialResult > window.innerWidth - 80) {
      xAcceleration.value *= -1
      xPos.value = window.innerWidth - 80
      return
    } else if (potentialResult < 0) {
      xAcceleration.value *= -1
      xPos.value = 0
      return
    }
    xPos.value += xAcceleration.value
    xAcceleration.value *= xDecay
    if (Math.abs(xAcceleration.value) < 0.5) {
      xAcceleration.value = 0
    } else if (yPos.value < 0.5) {
      xAcceleration.value *= xDecay * xDecay
    }
  }

  /**
   * The function to move the ball in the y direction.
   *
   * Position is calculated by taking the current yPos, adding the y acceleration to it.
   *
   * If the new position will move the ball of the edge of the screen, the ball is moved to the edge of the screen,
   * and it's direction is changed.
   *
   * Y acceleration has an added -1.5 added to it in order to simulate gravity.
   *
   * If the ball has almost no acceleration, and it is sitting on the ground, it's acceleration is stopped completely
   * in order to stop the ball from "vibrating".
   */
  function moveBallY() {
    const potentialResult = yPos.value + yAcceleration.value
    if (potentialResult > window.innerHeight - 80 || potentialResult < 0) {
      yAcceleration.value *= -1
      yPos.value = Math.max(Math.min(window.innerHeight - 81, potentialResult), 0.5)
    } else {
      if (yPos.value < 1 && Math.abs(yAcceleration.value) < 1) {
        yPos.value = 0
        yAcceleration.value = 0
      }
      if (yPos.value > 0) {
        yAcceleration.value -= 1.5
        yPos.value += yAcceleration.value
        yAcceleration.value *= yDecay
      }
    }
  }

  /**
   * Unit testing helper function used to test acceleration/movement.
   * @param newXAcceleration The new acceleration in the X direction.
   * @param newYAcceleration The new acceleration in the Y direction.
   */
  function simulateMovement(newXAcceleration: number, newYAcceleration: number) {
    xAcceleration.value = newXAcceleration
    yAcceleration.value = newYAcceleration
  }

  /**
   * Unit testing helper function used to put the ball in a specific position.
   */
  function setBallPosition(newXPos: number, newYPos: number) {
    xPos.value = newXPos
    yPos.value = newYPos
  }

  return {
    xPos,
    yPos,
    previousX,
    previousY,
    xAcceleration,
    yAcceleration,
    moveBallX,
    moveBallY,
    simulateMovement,
    setBallPosition
  }
})
