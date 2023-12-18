import { useState } from 'react'

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const MostVoted = ({points, anecdotes}) => {
  let highestVotedAnecdote = () => {
    let maxNum = 0;
    let maxIdx = null;

    for(let i = 0; i < anecdotes.length; i += 1) {
      if (points[i] > maxNum) {
        maxNum = points[i]
        maxIdx = i;
      }
    }

    if (maxNum === 0) {
      return ({noVotes: true})
    } else {
      return ({content: anecdotes[maxIdx], 
      idx: maxIdx,
      votes: points[maxIdx]})
    }
  }

  let winner = highestVotedAnecdote()


  if (winner.noVotes === true) {
    return (
      <div>
        <h1>Anecdote with most votes</h1>
        <p>No votes cast yet</p>
      </div>
    )
  } else {
    return (
      <div>
        <h1>Anecdote with most votes</h1>
        <p>{winner.content}</p>
        <p>{winner.votes} votes</p>
      </div>
    )
  }
}

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(10).fill(0))

  let randomizeSelected = () => {
    setSelected(getRandomInt(0, anecdotes.length -1));
  }

  let incrementVote = (idx) => {
    let pointsCopy = Array.from(points)
    pointsCopy[idx] += 1
    return () => { setPoints(pointsCopy) }
  }



  console.log(points)
  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <p>{anecdotes[selected]}</p>
      <button onClick={incrementVote(selected)}>
        Vote
      </button>
      <button onClick={randomizeSelected}>
        Next anecdote
      </button>
      <MostVoted points={points} selected={selected} anecdotes={anecdotes}/>
    </div>
  )
}

export default App