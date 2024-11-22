import { useState } from "react";
const messages = [
  { id: 1, message: "Learn React ⚛️" },
  { id: 2, message: "Apply for jobs 💼" },
  { id: 3, message: "Invest your new income 🤑" },
];
function App() {
  return (
    <div>
      <Steps />
      {/* <Steps /> */}
      <StepMessage step={1}>
        <p>Pass it content 😒</p>
      </StepMessage>
    </div>
  );
}

function Steps() {
  // const currentStep = 1;
  const [currentStep, setCurrentStep] = useState(1);
  // const [test, setTest] = useState({name: 'Jonas'});
  const [isOpen, setIsOpen] = useState(true);

  function handlePrevious() {
    currentStep > 1 && setCurrentStep((s) => s - 1);
  }

  function handleNext() {
    currentStep < messages.length && setCurrentStep((s) => s + 1);
    // setTest({name: 'Fred'})
  }

  return (
    <div>
      <button className="close" onClick={() => setIsOpen((is) => !is)}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            {messages.map(({ id, message }, index) => (
              <div
                className={`${currentStep >= index + 1 ? "active" : ""}`}
                key={id}
              >
                {index + 1}
              </div>
            ))}
          </div>

          <StepMessage step={currentStep}>
            <p> {messages[currentStep - 1].message}{" "}</p>
            <div className="buttons">
              <Button className="button"
              onClick={()=> alert(`learn how to ${messages[currentStep - 1].message}`)}>
                👍 learn how
              </Button>
              </div>
          </StepMessage>
        
          <div className="buttons">
            <Button onClick={handlePrevious} textColor={"#fff"} bgColor={ "#7950F2"}><span>👈</span>Previous</Button>
            <Button onClick={handleNext} textColor={"#fff"} bgColor={ "#7950F2"}>Next<span>👉</span></Button>
          </div>
        </div>
      )}
    </div>
  );


}

function Button({textColor, bgColor, onClick, children}){
  return <button
  style={{ backgroundColor:bgColor, color: textColor }}
  onClick={onClick}
>{children}</button>
}

function StepMessage({step, children}){
 return  <div className="message">
  <h3> Step {step}</h3> 
  {children}
  </div>
}

export default App;
