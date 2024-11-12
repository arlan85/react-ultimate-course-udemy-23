import { useState } from 'react'

// const initialItems = [
//   {id: 1, description: "Passports", quantity: 2, packed: false},
//   {id:2, description: "Socks", quantity: 12, packed: false},
//   {id:3, description: "Charger", quantity: 1, packed: false},
//   {id:4, description: "Water", quantity: 1, packed: true}
// ]

const numItems = Array.from({length:20}, (_, i) => i+1)
export default function App() {
  const [items, setItems] = useState([])

  function handleAddItem(item){
    setItems(items => [...items, item])
  }
  function handleDeleteItem(id){
    setItems(items => items.filter(item => item.id !== id))
  }

  function handlePackedItem(id){
    setItems(items => items.map(item => item.id ===id ? {...item, packed: !item.packed} : item))
  }

  return (
    <div className="app">
     <Logo/>
     <Form onAddItems={handleAddItem}/>
     <PackingList items={items} onDeleteItem={handleDeleteItem} onhandlePacked={handlePackedItem}/>
     <Stats items={items}/>
    </div>
  )
}

function Logo(){
  return (
    <h1>🌴 Far Away 🧳</h1>    
  )
}
function Form({onAddItems}){
  const [quantity, setQuantity] = useState(1)
  const [description, setDescription] = useState("")
 
  function handleSubmit(e){
    e.preventDefault()
    if(!description) return
    const newItem = {description, quantity, packed: false, id: Date.now()}
    
    onAddItems(newItem)
    setDescription('')
    setQuantity(1)

  }

  return (
      <form className='add-form' onSubmit={handleSubmit} >
      <h3>What do you need for your 😍 trip?</h3> 
        <select value={quantity} onChange={(e) =>
          setQuantity(Number(e.target.value))
        }>
          {numItems.map(item => <option key={item} value={item}>{item}</option>)}
        </select>
        <input type="text" placeholder="Enter your item" value={description} onChange={(e)=> setDescription(e.target.value)} />
        <button type="submit">Add</button>
      </form>
  )
}

function PackingList({items, onDeleteItem, onhandlePacked}){
  return (
      <ul className="list">
        { items.map(item => <Item item={item} key={item.id} onDeleteItem={onDeleteItem} onhandlePacked={onhandlePacked}/>) }
      </ul>
  )
}

function Item({item, onDeleteItem, onhandlePacked}){
   
  return (
    <li>
      <input type="checkbox" value={item.packed} onChange={()=> onhandlePacked(item.id)}/>
      <span style={item.packed ? {textDecoration: 'line-through'} : {}}>{item.quantity} {item.description}</span>
        <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  )
}

function Stats({items}){
  if(!items.length) 
  return ( 
    <p className="stats">
      <em>Start adding some items to your packing list 🚀</em>
    </p>
  )
  const numItems = items.length
  const packedItems = items.filter(item => item.packed).length
  const percentage = Math.round((packedItems / numItems) * 100) 
  
  return (
    <footer className="stats">
       {percentage === 100 ?
       <em >You got everything ready to go ✈️!</em>
      :<em>
        🧳 You have {numItems} items on your list, and you already packed {packedItems} ({percentage}%)</em>
}
    </footer>
  )
}