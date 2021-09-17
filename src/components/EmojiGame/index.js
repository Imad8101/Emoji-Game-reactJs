/* 
Quick Tip 

- Use the below function in the EmojiGame Component to shuffle the emojisList every time when an emoji is clicked.

const shuffledEmojisList = () => {
  const {emojisList} = this.props
  return emojisList.sort(() => Math.random() - 0.5)
}

*/
import {Component} from 'react'
import NavBar from '../NavBar'
import EmojiCard from '../EmojiCard'
import WinOrLoseCard from '../WinOrLoseCard'

import './index.css'

class EmojiGame extends Component {
  state = {
    clickedEmojiList: [],
    isGameInProgress: true,
    topScore: 0,
  }

  resetGame = () => {
    this.setState({clickedEmojiList: [], isGameInProgress: true})
  }

  finishGameAndSetTopScore = curretScore => {
    const {topScore} = this.state
    let newTopScore = topScore

    if (curretScore > topScore) {
      newTopScore = curretScore
    }

    this.setState({topScore: newTopScore, isGameInProgress: false})
  }

  clickEmoji = id => {
    const {clickedEmojiList} = this.state
    const {emojisList} = this.props

    const isEmojiPresent = clickedEmojiList.includes(id)
    const clickedEmojisLength = clickedEmojiList.length

    if (isEmojiPresent) {
      this.finishGameAndSetTopScore(clickedEmojisLength)
    } else {
      if (emojisList.length - 1 === clickedEmojisLength) {
        this.finishGameAndSetTopScore(emojisList.length)
      }

      this.setState(prevState => ({
        clickedEmojiList: [...prevState.clickedEmojiList, id],
      }))
    }
  }

  renderScoreCard = () => {
    const {clickedEmojiList} = this.state
    const {emojisList} = this.props
    const isWon = clickedEmojiList.length === emojisList.length

    return (
      <WinOrLoseCard
        isWon={isWon}
        onClickPlayAgain={this.resetGame}
        score={clickedEmojiList.length}
      />
    )
  }

  getShuffledEmojisList = () => {
    const {emojisList} = this.props
    return emojisList.sort(() => Math.random() - 0.5)
  }

  renderEmojisList = () => {
    const shuffledEmojiList = this.getShuffledEmojisList()

    return (
      <ul className="emojis-list-container">
        {shuffledEmojiList.map(emojiObject => (
          <EmojiCard
            key={emojiObject.id}
            emojiDetails={emojiObject}
            clickEmoji={this.clickEmoji}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {clickedEmojiList, isGameInProgress, topScore} = this.state
    return (
      <div className="app-container">
        <NavBar
          topScore={topScore}
          currentScore={clickedEmojiList.length}
          isGameInProgress={isGameInProgress}
        />
        <div className="emoji-game-body">
          {isGameInProgress ? this.renderEmojisList() : this.renderScoreCard()}
        </div>
      </div>
    )
  }
}

export default EmojiGame
