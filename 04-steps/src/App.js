import { useState } from "react";
const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];  

function App() {
  // const currentStep = 1;
  const [currentStep, setCurrentStep] = useState(1);
  // const [test, setTest] = useState({name: 'Jonas'});
  const [isOpen, setIsOpen] = useState(true);

  function handlePrevious() {
    currentStep > 1 && setCurrentStep((s)=>s-1)
  }

  function handleNext() {
    currentStep < messages.length &&  setCurrentStep((s)=>s+ 1)
    // setTest({name: 'Fred'})
  }

  return (
    <>
      <button className="close" onClick={() => setIsOpen((is)=>!is )}>&times;</button>
      {isOpen &&
    <div className="steps">
      <div className="numbers">

        {
          messages.map((_message, index) => ( 
            <div className={`${currentStep>=index+1 ? 'active' : ''}`} key={index}>{index+1}</div>
        
          ))
        }
      </div>
      <p className="message">Step {currentStep}: {messages[currentStep - 1]} {/*test.name*/}</p>
      <div className="buttons">
        <button style= {{backgroundColor: '#7950F2', color: '#fff'}} 
        onClick={handlePrevious}
        // onMouseEnter={()=>{alert('TEST')}}
        >Previous</button>
        <button style= {{backgroundColor: '#7950F2', color: '#fff'}} 
        onClick={handleNext}
        >Next</button>
      </div>
    </div>
    }
    </>
  );
}

export default App;
