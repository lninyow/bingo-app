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
          setBingoCard(null);
            alert("Bingo Code does not exist!");
            setCode("");
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
  <><div style={{ display: 'flex', alignItems: 'center', width: '100%', height: '1000', justifyContent: 'center' }}>
    {bingoCard === null ? (
      <div style={{marginTop:50}}>
        <h1 style={{textAlign:'center'}}>Welcome to Bingo!</h1>
        <input
        style={{width:150,height:50,borderRadius:10,marginRight:10}}
          id="code"
          name="code"
          type="text"
          placeholder="Enter your Code"
          value={code}
          onChange={(e) => setCode(e.target.value)} />
        <button onClick={getCard}
        style={{padding:20,background:'lightgrey',fontWeight:'bolder',transition:'background 0.3s',cursor:'pointer',borderRadius:10}}
        onMouseOver={(e) => {
          e.target.style.background = 'lightblue';
          e.target.style.color = 'white';
        }}
        onMouseOut={(e) => {
          e.target.style.background = 'lightgrey';
          e.target.style.color = 'black';
        }} 
        >
          GET CARD</button>
      </div>
    ) : (
      <>
        {Object.keys(bingoCard.card).map((key, i) => {
          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '1px',gap:3 }}>
              <h1>{key}</h1>
              {bingoCard.card[key].map((col, j) => {
                return (
                  <div key={j} style={{ color:'white',fontSize:32,display: 'flex', flexDirection: 'column', border: '2px solid black', width: '100px', height: '100px', alignItems: 'center', justifyContent: 'center', background: 'purple'}}>
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
  {bingoCard === null ? <> </> :  
  <div style={{width:'100%',textAlign:'center'}}>
  <button 
  onClick={checkWin}
  style={{
    width:300,
    padding: 20,
    marginTop: 10,
    background: 'white',
    fontWeight: 'bold',
    transition: 'background 0.3s',
    cursor: 'pointer', 
  }}
  onMouseOver={(e) => e.target.style.background = 'lightblue'} 
  onMouseOut={(e) => e.target.style.background = 'white'} 
>
  CHECK WIN
</button>

    </div>
    }
    </>
);

// ... (remaining code)

  
  }
export default App;
