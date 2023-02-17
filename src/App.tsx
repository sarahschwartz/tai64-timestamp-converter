import { useState } from 'react'
import './App.css';

function convertTime(num: string){
  return BigInt(num) - BigInt(Math.pow(2, 62)) - BigInt(10);
}

function App() {
  const [taiTime, setTaiTime] = useState<string>('');
  const [unixTime, setUnixTime] = useState<number>(0);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    let unix = convertTime(taiTime);
    setUnixTime(Number(unix));
  }

  function ShowDate(){
    let date = new Date(unixTime * 1000);
    return (
    <div>
      Date: {date.toDateString()} {date.toLocaleTimeString()}
    </div>
    )
  }

  return (
    <div className="App">
   <header>
    <h1>
      Tai64 Timestamp Converter
    </h1>
    <p>Convert Tai64 timestamps to a unix timestamp</p>
  </header>
  
  <main>
    <div>
      <h2>Convert to Unix Timestamp</h2>
      <form onSubmit={handleSubmit}>
        <label>Tai64 timestamp:</label>
        <input onChange={(e) => setTaiTime(e.target.value)} type="text"/>
        <button type="submit">Convert</button>
      </form>
      {unixTime > 0 &&
      <div>
        <div>Unix Timestamp: {unixTime}</div>
        <ShowDate/>
      </div>
      }
    </div>
  </main>

    </div>
  );
}

export default App;
