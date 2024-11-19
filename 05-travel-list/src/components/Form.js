import { useState } from "react";
export const numItems = Array.from({length:20}, (_, i) => i+1)


 function Form({ onAddItems }) {
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };

    onAddItems(newItem);
    setDescription('');
    setQuantity(1);

  }

  return (
    <form className='add-form' onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
        {numItems.map(item => <option key={item} value={item}>{item}</option>)}
      </select>
      <input type="text" placeholder="Enter your item" value={description} onChange={(e) => setDescription(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  );
}

export default Form;