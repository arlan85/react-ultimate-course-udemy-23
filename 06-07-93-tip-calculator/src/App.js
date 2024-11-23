import { useState } from "react";

const satisfactionValues = [
  {
    id: 0,
    text: "Dissatisfied",
    value: 0,
  },
  {
    id: 5,
    text: "It was okay",
    value: 5,
  },
  {
    id: 10,
    text: "It was good",
    value: 10,
  },
  {
    id: 20,
    text: "Absolutely amazing!",
    value: 20,
  },
];

export default function App() {
  return (
    <div className="app">
      <TipCalculator />
    </div>
  );
}
function TipCalculator() {
  const [amount, setAmount] = useState("");
  const [satisfaction, setSatisfaction] = useState(0);
  const [friendSatisfaction, setFriendSatisfaction] = useState(0);

  function handleReset() {
    setAmount(null);
    setSatisfaction(0);
    setFriendSatisfaction(0);
  }

  const tip = ((amount * (satisfaction + friendSatisfaction)) / 200).toFixed(2);

  return (
    <>
      <Bill amount={amount} setAmount={setAmount}>
        <span>How much was the bill? </span>
      </Bill>
      <DropDownQuestion
        dropdownValues={satisfactionValues}
        satisfaction={satisfaction}
        setSatisfaction={setSatisfaction}
      >
        How did you like the service?
      </DropDownQuestion>
      <DropDownQuestion
        dropdownValues={satisfactionValues}
        satisfaction={friendSatisfaction}
        setSatisfaction={setFriendSatisfaction}
      >
        How did your friend like the service?
      </DropDownQuestion>

      <Payment bill={amount} tip={tip}></Payment>
      <Reset handleReset={handleReset}></Reset>
    </>
  );
}

function Bill({ amount, setAmount, children }) {
  function handleAmountChange(e) {
    setAmount(Number(e.target.value || 0));
  }
  return (
    <div className="bill">
      {children}
      <input
        type="text"
        value={amount}
        onChange={handleAmountChange}
        placeholder="Bill value"
      />
    </div>
  );
}

function DropDownQuestion({
  dropdownValues,
  satisfaction,
  setSatisfaction,
  children,
}) {
  function handleChange(e) {
    setSatisfaction(Number(e.target.value));
  }
  return (
    <div className="dropdown">
      <span>{children}</span>
      <select value={satisfaction} onChange={handleChange}>
        {dropdownValues &&
          dropdownValues.map((value) => (
            <option
              key={value.id}
              value={value.value}
            >{`${value.text} (${value.value}%)`}</option>
          ))}
      </select>
    </div>
  );
}

function Payment({ bill, tip }) {
  const total = (Number(bill) + Number(tip)).toFixed(2);
  return (
    <h3 className="payment">
      <span>
        You pay ${total} (${bill.toFixed(2)} + ${tip} tip)
      </span>
    </h3>
  );
}

function Reset({ handleReset }) {
  return (
    <h3 className="reset">
      <button onClick={handleReset}>Reset</button>
    </h3>
  );
}
