import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [code, setCode] = useState(""); // State to store the input value
  const [bingoCard, setBingoCard] = useState(null)
  const [winner, setWinner] = useState(null)
  const [background, setBackground] = useState('white')

  const handleGetCard = () => {
    axios.get(`http://www.hyeumine.com/getcard.php?bcode=${code}`)
    .then(response => {
        if (!response || !response.data) {
            throw new Error("Empty or invalid response received");
        }

        const data = response.data;

        console.log(data);
        setBingoCard(data);

        if (data === 0) {
            alert("Bingo Code does not exist!");
        }
    })
    .catch(error => {
        console.error(error);
    });
};




const handleInputChange = (e) => {
  // Update the 'code' state when input value changes
  setCode(e.target.value);
  e.target.value="";
};


  return (
    <>
      <input
                id="code"
                name="code"
                type="text"
                placeholder="Enter your Code"
                value={code} // Bind input value to the 'code' state
                onChange={handleInputChange} // Handle input changes
                />
      <button onClick={handleGetCard}>Get card</button>
    </>
  );
}

export default App;
