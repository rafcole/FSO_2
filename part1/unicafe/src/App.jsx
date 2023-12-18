import { useState } from 'react'

const FeedbackBar = ({incrementGood, incrementNeutral, incrementBad}) => {
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={incrementGood}>
        good
      </button>
      <button onClick={incrementNeutral}>
        neutral
      </button>
      <button onClick={incrementBad}>
        bad
      </button>
    </div>
  )
}

const StatisticsLine = ({text, value}) => {
  return(
    <tr> 
      <td>
        {text}
      </td> 
      <td>
        {value}
      </td>
    </tr>
    
  )
}

const Statistics = ({good, neutral, bad}) => {
  let total = good + neutral + bad;
  let average = total > 0 ? (good - bad) / total: 0;
  let positive = total > 0 ? good / total: 'NA'

  
  if (total === 0) {
    return (
      <div>
        <h1>statistics</h1>
          <p>No feedback given</p>
      </div>
    )} else {
    return(
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticsLine text="good" value={good} />
            <StatisticsLine text="neutral" value={neutral} />
            <StatisticsLine text="bad" value={bad} />
            <StatisticsLine text="total" value={total} />
            <StatisticsLine text="average" value={average} />
            <StatisticsLine text="positive" value={String(positive) + '%'} />
          </tbody>
        </table>
      </div>
    )
  }
}

const FeedbackButton = ({title, callback}) => {
  return (
    <button onClick={callback}>
      {title}
    </button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let feedbackIncreaser = (feedback, setterFunc) => {
    return () => {
      console.log(feedback)
      setterFunc(feedback + 1);
    }
  }

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <FeedbackButton title='good' callback={feedbackIncreaser(good, setGood)}/>
        <FeedbackButton title='neutral' callback={feedbackIncreaser(neutral, setNeutral)}/>
        <FeedbackButton title='bad' callback={feedbackIncreaser(bad, setNeutral)}/>
      </div>
        <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App


      // <FeedbackBar handleGood={incrementGood} handleNeutral={incrementNeutral} handleBad={incrementBad} />