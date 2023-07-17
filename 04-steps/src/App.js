
const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];  

function App() {
  const currentStep = 1;
  
  function handlePrevious() {
    alert('previous');
  }

  function handleNext() {
    alert('next')
  }

  return (
    <div className="steps">
      <div className="numbers">
        {
          messages.map((_message, index) => ( 
            <div className={`${currentStep>=index+1 ? 'active' : ''}`} index={index}>{index+1}</div>
        
          ))
        }
      </div>
      <p className="message">Step {currentStep}: {messages[currentStep - 1]}</p>
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
  );
}

export default App;
