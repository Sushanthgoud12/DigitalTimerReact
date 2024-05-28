// Write your code here
import {Component} from 'react'

import './index.css'

const initialState= {
  isTimerRunning: false,
  timerElapsedInSec: 0,
  timerLimitInMinutes: 0,
}

class DigitalTimer extends Component {
    state=initialState

    componentWillUnmount(){
        this.clearTimerInterval()
    }

    clearTimerInterval=() =>clearInterval(this.intervalId)
    
    onDecreaseTimerLimitMinutes = () => {
        const {timerLimitInMinutes}=this.state 

    if(timerLimitInMinutes>1) {
        this.setState(prevState =>({
            timerLimitInMinutes:prevState.timerLimitInMinutes-1
        }))
    }
  }

  onIncreaseTimerLimitMinutes = () => {
    this.setState(prevState =>({
      timerLimitInMinutes:prevState.timerLimitInMinutes+1
    }))

    renderTimerLimitController = () => {
      const {timerLimitInMinutes,timerElapsedInSec} = this.state
      const isButtonDisabled = timerElapsedInSec >0

    return (
      <div className="timer-limit-controller-btn">
      <p className="limit-label">Set Timer Limit</p>
      <div className="timer-limit-controller">
      <button 
        className="limit-controller-button"
        disabled={isButtonDisabled}
        onClick={this.onDecreaseTimerLimitMinutes}
        type="button"
        >
        -
        </button>
        <div className="limit-label-and-value-container">
        <p className="limit-value">{timerLimitInMinutes}</p>
        </div>
        <button 
          className='limit-controller-button'
          disabled={isButtonDisabled}
          onClick={this.onIncreaseTimerLimitMinutes}
          type="button"
          >
        +
        </button>
       </div>
    </div>
    )
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  incrementTimeElapsedInSec=()=> {
    const {timerLimitInMinutes,timerElapsedInSec}=this.state
    const isTimerCompleted = timerElapsedInSec === timerElapsedInMinutes*60

    if (isTimerCompleted){
      this.clearTimerInterval()
      this.setState({isTimerRunning:false})
    }else{
        this.setState(prevState => ({
        timerElapsedInSec:prevState.timerElapsedInSec+1.
        }))
    }
 }

  onStartOrPauseTimer = () => {
    const {
      isTimerRunning,
      timerElapsedInSec,
      timerLimitInMinutes
    } = this.state
    const isTimerCompleted=timerElapsedInSec===timerLimitInMinutes*60

    if (isTimerCompleted){
        this.setState({timerElapsedInSec:0})
    }
    if (isTimerRunning){
        this.clearTimerInterval()
    }else{
     this.intervalId=setInterval(this.incrementTimeElapsedInSec,1000)
    }
    this.setState(prevState => ({isTimerRunning:!prevState.isTimerRunning}))
  }

 renderTimerController = () => {
  const {isTimerRunning} = this.state
  const startOrPauseImageUrl = isTimerRunning
  ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
  : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
  const startOrPauseAltText = isTimerRunning ?'pause icon':'play icon'

  return (
    <div className="timer-controller-container">
      <button 
        className="timer-controller-btn"
        onClick={this.onStartOrPauseTimer}
        type="button"
    >
    <img 
    alt={startOrPauseAltText}
    className="timer-controller-icon"
    src={startOrPauseImageUrl}
    />
    <p className="timer-controller-label">
        {isTimerRunning? 'pause':'start'}
    </p>
    </button>
    <button
        className="timer-controller-btn"
        onClick={this.onResetTimer}
        type="button"
        >
        <img 
          alt="reset icon"
          className="timer-controller-icon"
          src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
        />
        <p className="timer-controller-label">Reset</p>
        </button>
        </div>
        )
    }

  getElapsedSecondsInTimeFormat = () => {
  const {timerLimitInMinutes,timerElapsedInSec}= this.state
  const totalRemainingSeconds =
  timerLimitInMinutes * 60-timerElapsedInSec
  const minutes=Math.floor(totalRemainingSeconds/60)
  const seconds=Math.floor(totalRemainingSeconds%60)
  const stringifiedMinutes=minutes>9?minutes:`0${minutes}`
  const stringifiedSeconds=seconds>9?seconds:`0${seconds}`

  return `${stringifiedMinutes}:${stringifiedSeconds}`
 }

  render(){
    const {isTimerRunning} = this.state
    const labelText = isTimerRunning?'Running':'Paused'

    return (
    <div className="app-container">
      <h1 className="heading">Digital Timer</h1>
        <div className="digital-timer-container">
            <div className="timer-display-container">
                <div className="elapsed-time-container">
                  <h1 className="elapsed-time">
                    {this.getElapsedSecondsInTimeFormat()}
                  </h1>
                  <p className="timer-state">{labelText}</p>
                </div>
            </div>
          <div className="controls-container">
            {this.renderTimerController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
    </div>
   )
  }
}

export default digitalTimer 