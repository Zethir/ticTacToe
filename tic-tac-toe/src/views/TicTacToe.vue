<template>
  <div class="main-container">
    <div class="game-grid">
      <div class="tic-tac-toe-grid">
        <div
          v-for="(grid, index) in ticTacToeGrid"
          :key="index"
          @click="inputFigure(index)"
          class="grid-square"
        >
          <span
            v-show="grid.figure"
            :class="grid.figure === 'o' ? 'color-one' : 'color-two'"
            >{{ grid.figure }}</span
          >
        </div>
      </div>
      <div class="players-score">
        <div class="score-box">
          <div>SCORE</div>
          <div>
            <span class="color-one">
              {{ gameCounter.playerOne }}
            </span>
            -
            <span class="color-two">
              {{ gameCounter.playerTwo }}
            </span>
          </div>
          <button @click.prevent="resetScore">reset score</button>
        </div>
        <div class="player-turn">
          <span>Turn:</span>
          <div
            :class="currentPlayer === 1 ? 'player-turn-two' : 'player-turn-one'"
          ></div>
        </div>
        <div v-if="noOneHasWon">
          <span>No one has won !</span>
        </div>
        <div v-if="gameState" class="win-grid">
          <span
            >Player
            <span :class="currentPlayer === 1 ? 'color-one' : 'color-two'">{{
              currentPlayer
            }}</span>
            has won</span
          >
          <button @click.prevent="resetGame">reset game</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import _ from 'lodash'

@Options({})
export default class TicTacToe extends Vue {
  private ticTacToeGrid = _.map(_.range(0, 9), (index: number) => {
    return { index, figure: '' }
  })

  private gameState = false

  private currentPlayer = 1

  private playerTurn = true

  private noOneHasWon = false

  private gameCounter = { playerOne: 0, playerTwo: 0 }

  private winCombinations = [
    '012',
    '036',
    '345',
    '147',
    '258',
    '678',
    '048',
    '246'
  ]

  public inputFigure(index: number) {
    const { figure } = this.ticTacToeGrid[index]

    if (this.gameState || figure) {
      return
    }

    this.ticTacToeGrid[index].figure = this.playerTurn ? 'o' : 'x'
    const currentPlayer = this.ticTacToeGrid[index].figure
    this.currentPlayer = currentPlayer === 'o' ? 1 : 2

    const moves = this.ticTacToeGrid.reduce((result: any, value: any) => {
      if (value.figure === currentPlayer) {
        result.push(value.index)
      }
      return result
    }, [])

    const hasWon = this.winCombinations.find((win: string) => {
      const combination = win.split('').map(n => parseInt(n))
      return _.difference(combination, moves).length === 0
    })

    if (hasWon?.length) {
      this.gameState = true
      this.gameCounter[
        this.currentPlayer === 1 ? 'playerOne' : 'playerTwo'
      ] += 1
    } else {
      const isOver = this.ticTacToeGrid.find((elem: any) => {
        return elem.figure.length === 0
      })

      if (!isOver) {
        this.noOneHasWon = true
        this.resetGame()
      } else {
        this.noOneHasWon = false
      }
    }

    this.playerTurn = !this.playerTurn
  }

  public resetGame() {
    this.ticTacToeGrid = _.map(_.range(0, 9), (index: number) => {
      return { index, figure: '' }
    })
    this.gameState = false
  }

  public resetScore() {
    this.gameCounter = { playerOne: 0, playerTwo: 0 }
  }
}
</script>

<style>
.main-container {
  display: grid;
  height: 100vh;
  width: 100vw;
  place-items: center;
}

.game-grid {
  display: grid;
  gap: 2em;
  padding: 1em 1em;
  grid-template-rows: repeat(2, auto);
}

.tic-tac-toe-grid {
  display: grid;
  cursor: pointer;
  grid-template-columns: repeat(3, 5em);
}

.grid-square {
  display: grid;
  min-height: 5em;
  height: 100%;
  width: 100%;
  place-items: center;
  transition: 0.2s all ease-in-out;
}

.grid-square:hover {
  background-color: rgb(241, 237, 237);
}

.grid-square:nth-child(1),
.grid-square:nth-child(2),
.grid-square:nth-child(3),
.grid-square:nth-child(4),
.grid-square:nth-child(5),
.grid-square:nth-child(6) {
  border-bottom: 0.1em solid rgb(51, 49, 49);
}

.grid-square:nth-child(1),
.grid-square:nth-child(2),
.grid-square:nth-child(4),
.grid-square:nth-child(5),
.grid-square:nth-child(7),
.grid-square:nth-child(8) {
  border-right: 0.1em solid rgb(51, 49, 49);
}

.grid-square span {
  font-size: 3em;
}

.color-one {
  color: rgb(224, 30, 30);
}

.color-two {
  color: rgb(30, 91, 224);
}

.win-grid {
  display: grid;
  grid-auto-flow: row;
  row-gap: 1em;
  justify-items: center;
}

button {
  padding: 0.3em 1em;
  border-radius: 1.5em;
  cursor: pointer;
  text-decoration: none;
  border: none;
  background-color: rgb(46, 43, 43);
  color: white;
  transition: 0.3s all ease-in-out;
  font-size: 0.8em;
}

button:hover {
  background-color: rgb(36, 34, 34);
}

.players-score {
  display: grid;
  grid-auto-flow: row;
  align-items: center;
  row-gap: 1.5em;
  justify-items: center;
}

.score-box {
  display: grid;
  grid-auto-flow: row;
  row-gap: 1em;
  border: 0.1em solid rgb(46, 43, 43);
  padding: 0.5em 1em;
  border-radius: 0.3em;
}

.player-turn {
  display: grid;
  grid-auto-flow: row;
  justify-items: center;
  row-gap: 1em;
}

.player-turn-one {
  background-color: rgb(224, 30, 30);
}

.player-turn-two {
  background-color: rgb(30, 91, 224);
}

.player-turn-one,
.player-turn-two {
  width: 1em;
  height: 1em;
  border-radius: 50%;
}

@media (min-width: 700px) {
  .game-grid {
    grid-template-columns: repeat(2, auto);
  }
}
</style>
