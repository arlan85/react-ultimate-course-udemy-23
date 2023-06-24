import { useEffect, useState } from "react";

export default function App() {
  const [advice, setAdvice] = useState("hello Word");
  const [counter, setCounter] = useState(0);
  
  async function getAdvice() {
    const response = await fetch("https://api.adviceslip.com/advice");
    const data = await response.json();
    setAdvice(data.slip.advice);
    setCounter((c) => c+1)
  }

  useEffect(() => {
    getAdvice()
  }, [])

  return (
    <div>
      <h1>{advice}</h1>
      <button onClick={getAdvice}>Give advice</button>
      <Message count={counter}/>
    </div>
  );
}

 function Message ({count}) {
   return (
    <p>you have read <strong>{count}</strong> pieces of advice</p>
   )
 }