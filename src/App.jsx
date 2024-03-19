import { useEffect, useState } from 'react'
import Card from './components/card'
import './App.css'



function App() {
  const [index, setIndex] = useState(0)
  const [revealAnswer, setRevealAnswer] = useState(false)
  const toggleReveal = () => {setRevealAnswer(!revealAnswer)}
  const prompts = [
    {question: "Start", answer: "Press the button to start the flashcards"},
    {question: "What is the capital city of Australia?", answer: "Canberra"},
    {question: "What planet is known as the red planet", answer: "Mars"},
    {question: "Who wrote 'Romeo and Juliet?'", answer: "William Shakespeare"},
    {question: "What is the largest mammal in the world?", answer: "Blue Whale"},
    {question: "In which country would you find the Great Barrier Reef?", answer: "Australia"},
    {question: "What is the tallest mountain in the world?", answer: "Mount Everest"},
    {question: "Who painted the Mona Lisa?", answer: "Leonardo da Vinci"},
    {question: "What is the chemical symbol for gold?", answer: "Au"},
    {question: "Which animal is known as the 'ship of the desert'?", answer: "Camel"},
    {question: "What is the largest ocean on Earth?", answer: "Pacific Ocean"}
  ]
  const [lastIndex, setlastIndex] = useState(0);
  const [revealGuess, setRevealGuess] = useState(false);
  const [formData, setFormData] = useState({
    userGuess: '',
  });
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const generateRandomIndex = () => {setlastIndex(index); setRevealGuess(false); setIndex(Math.floor(Math.random() * (prompts.length - 1)) + 1)};
  const selectPreviousIndex = () => {setRevealGuess(false); setIndex(lastIndex)}
  const handleInputChange = (e) => {
    setRevealGuess(false);
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Handling submit');
    const isCorrect = formData.userGuess.toLowerCase() === prompts[index].answer.toLowerCase();
    setStreak(isCorrect ? streak + 1 : 0);
    setLongestStreak(prevLongestStreak => Math.max(prevLongestStreak, isCorrect ? streak + 1 : 0));
    setRevealGuess(true);
  }
  

  useEffect(()=>{
    setRevealAnswer(false);
    setFormData({...formData, userGuess: ''});
  }, [index])
  return (
    <>
      <div className='body'>
        <h1>Test Your Knowledge!</h1>
        <h3>"Test your knowledge with this set of flashcards covering a variety of topics! From geography to literature, these flashcards will challenge your memory and help you learn new facts.</h3>
        <p>Number of cards: {prompts.length - 1}</p>
        <p>Current Streak: {streak} | Longest Streak: {longestStreak}</p>
        <Card answer = {prompts[index].answer} question={prompts[index].question} revealAnswer={revealAnswer} handleReveal={toggleReveal}/>
      </div>
      <button onClick={selectPreviousIndex}>&#8592;</button>
      <button onClick={generateRandomIndex}>&#8594;</button>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="userGuess">Your Guess: </label>
        <input type="text" name="userGuess" id="userGuess" onChange={handleInputChange} value={formData.userGuess}/>
        <button type="submit">Submit Guess</button>
      </form>
      {
        revealGuess && index != 0 &&
        <div className={`guessDiv + ${formData.userGuess.toLowerCase() === prompts[index].answer.toLowerCase() ? ' correct' : ' incorrect'}`}>
          {formData.userGuess.toLowerCase() === prompts[index].answer.toLowerCase() ? <h3>Correct</h3> : <h3>Incorrect</h3>}
        </div>
      }
      
    </>
  )
}

export default App
