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

  console.log(currentColourArrangement);




  return (
    <div className="app">
      <div className="game">
          {currentColourArrangement.map((candyColours, index) => (
            <img
                key={index}
                style={{backgroundColor: candyColours}}
            />
          ))}
      </div>
    </div>
  );
}

export default App;
