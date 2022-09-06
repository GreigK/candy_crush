import { getSuggestedQuery } from "@testing-library/react"
import React, { useEffect, useState } from "react"

const width = 8
const candyColours = [
  'blue',
  'green',
  'orange',
  'purple',
  'red',
  'yellow'
]

function App() {

  const [currentColourArrangement, setCurrentColourArrangement] = useState([])




  const checkForColumOfFour = () => {
    for (let i = 0; i < 39; i++) {  
      const columnOfFour = [i, i + width, i + width * 2, i + width * 3]  
      const decidedColour = currentColourArrangement[i]

      if ( columnOfFour.every(square => currentColourArrangement[square] === decidedColour)){ 
        columnOfFour.forEach(square => currentColourArrangement[square] = '')                      
      }
    }
  }

  const checkForRowOfFour = () => {
    for (let i = 0; i < 64; i++) {  
      const rowOfFour = [i, i + 1, i + 2, i + 3]  
      const decidedColour = currentColourArrangement[i]
      const notValid = [5, 6, 7, 13 , 14, 15, 21, 22, 23,  29, 30 ,31 ,37 ,38, 39, 45 ,46, 47, 53 ,54, 55, 62 ,63, 64]

      if ( notValid.includes(i)) continue // if these non valid numbers are present conintues with the if statement below

      if ( rowOfFour.every(square => currentColourArrangement[square] === decidedColour)){ 
        rowOfFour.forEach(square => currentColourArrangement[square] = '')                    
      } 
    }
  }




  
  const checkForColumOfThree = () => {
    for (let i = 0; i < 47; i++) {  //47 because the last set of three squares starts with index 47
      const columnOfThree = [i, i + width, i + width * 2]  //eg [0, 0 + width(8), width(8) * 2 = 16] this is grabbing the three squares each below eachother
      const decidedColour = currentColourArrangement[i]

      if ( columnOfThree.every(square => currentColourArrangement[square] === decidedColour)){ 
        columnOfThree.forEach(square => currentColourArrangement[square] = '')                      // when three are a match returns an empty string
      } 
    }
  }

  const checkForRowOfThree = () => {
    for (let i = 0; i < 64; i++) {  
      const rowOfThree = [i, i + 1, i + 2]  
      const decidedColour = currentColourArrangement[i]
      const notValid = [6, 7, 14, 15, 22, 23 ,30 ,31 ,38, 39, 46, 47, 54, 55, 63, 64]

      if ( notValid.includes(i)) continue // if these non valid numbers are present conintues with the if statement below

      if ( rowOfThree.every(square => currentColourArrangement[square] === decidedColour)){ 
        rowOfThree.forEach(square => currentColourArrangement[square] = '')                    
      } 
    }
  }




  const moveIntoSquareBelow = () => {
    for (let i = 0; i < 64 - width; i++){
      const firstRow = [0,1,2,3,4,5,6,7]
      const isFirstRow = firstRow.includes(i)

      if

      if ((currentColourArrangement[i + width]) === '') { //if the square below the square we are looping is nothing then get the colour and change it
          currentColourArrangement[i + width] = currentColourArrangement[i]
          currentColourArrangement[i] = ''
      }
    }
  }












  const createBoard = () => {
    const randomColourArrangement = []
    for (let i = 0; i < width * width; i++) {   // basically give random number 
      const randomColour = candyColours[Math.floor(Math.random() * candyColours.length)]  // go to colours and math.floor gives us a only full numbers and a random number based on the length of the array
      randomColourArrangement.push(randomColour)
    }
    setCurrentColourArrangement(randomColourArrangement) // using randomColourArragement to set setCurrent to an array of random colours
  }

  useEffect(() => {
    createBoard()
  }, [])

  useEffect(() => {                           // schedules new intervel every 100mil inside of the useEffect Hook
    const timer = setInterval(() => {
      checkForColumOfFour()                   //checkForFour above due to it checking for three then stopping. Could be a four also so check that first
      checkForRowOfFour()
      checkForColumOfThree()
      checkForRowOfThree()
      moveIntoSquareBelow()
      setCurrentColourArrangement([...currentColourArrangement])    // spread syntax
    }, 100) 
    return () => clearInterval(timer)

  }, [checkForColumOfFour, checkForRowOfFour, checkForColumOfThree, checkForRowOfThree, moveIntoSquareBelow, currentColourArrangement])
  

console.log(currentColourArrangement);


  return (
    <div className="app">
      <div className="game">
          {currentColourArrangement.map((candyColours, index) => (
            <img
                key={index}
                style={{backgroundColor: candyColours}}
                alt={candyColours}
            />
          ))}
      </div>
    </div>
  );
}

export default App;
