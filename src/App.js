import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import axios from 'axios';
import { hover } from '@testing-library/user-event/dist/hover';

function App() {
  const [code, setCode] = useState(""); 
  const [bingoCard, setBingoCard] = useState(null)
  const [winner, setWinner] = useState(null)

  const getCard = () => {
    axios.get(`http://www.hyeumine.com/getcard.php?bcode=${code}`)
    .then(response => {
      if (!(response.status===200 && response.statusText==="OK")) {
        throw new Error('Network response was not ok');
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

const checkWin = () => {
  axios.get(`http://www.hyeumine.com/checkwin.php?playcard_token=${bingoCard.playcard_token}`)
  .then(response => {
    if (!(response.status===200 && response.statusText==="OK")) {
      throw new Error('Network response was not ok');
  }

    const data = response.data;
    setWinner(data)
    console.log(bingoCard.playcard_token)

    if(data === 0){
      alert("You have not won yet!")
    }else{
      alert("You have won!")
    }
})
.catch(error => {
  console.error(error);
});

};


return (
  <><div style={{ display: 'flex', alignItems: 'center', width: '100%', height: 'auto', justifyContent: 'center' }}>
    {bingoCard === null ? (
      <>
        <input
          id="code"
          name="code"
          type="text"
          placeholder="Enter your Code"
          value={code}
          onChange={(e) => setCode(e.target.value)} />
        <button onClick={getCard}>Get card</button>
      </>
    ) : (
      <>
        {Object.keys(bingoCard.card).map((key, i) => {
          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '1px' }}>
              <h1>{key}</h1>
              {bingoCard.card[key].map((col, j) => {
                return (
                  <div key={j} style={{ display: 'flex', flexDirection: 'column', border: '1px solid black', width: '100px', height: '100px', alignItems: 'center', justifyContent: 'center', background: ' white' }}>
                    <p>{col}</p>
                  </div>
                );
              })}
            </div>
          );
        })}


      </>
    )}
  </div>
  {bingoCard === null ? <> </> : <> 
  <div style={{width:'100%',textAlign:'center'}}>
  <button 
  onClick={checkWin}
  style={{
    padding: 20,
    marginTop: 10,
    background: 'white',
    fontWeight: 'bold',
    transition: 'background 0.3s', // Add transition for smooth effect
    cursor: 'pointer', // Change cursor on hover
  }}
  onMouseOver={(e) => e.target.style.background = 'lightblue'} // Change color on hover
  onMouseOut={(e) => e.target.style.background = 'white'} // Restore color on mouse out
>
  CHECK WIN
</button>

    </div>
    </>}
    </>
);

// ... (remaining code)

  
  }
export default App;
