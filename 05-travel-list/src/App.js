const initialItems = [
  {id: 1, description: "Passports", quantity: 2, packed: false},
  {id:2, description: "Socks", quantity: 12, packed: false},
  {id:3, description: "Charger", quantity: 1, packed: false},
  {id:4, description: "Water", quantity: 1, packed: true}
]
const numItems = Array.from({length:20}, (_, i) => i+1)
export default function App() {
  return (
    <div className="app">
     <Logo/>
     <Form/>
     <PackingList/>
     <Stats/>
    </div>
  )
}

function Logo(){
  return (
    <h1>🌴 Far Away 🧳</h1>    
  )
}
function Form(){
  function handleSubmit(e){
    e.preventDefault()
    console.log(e)
  }
  return (
      <form className='add-form' onSubmit={handleSubmit} >
      <h3>What do you need for your 😍 trip?</h3> 
        <select>
          {numItems.map(item => <option key={item} value={item}>{item}</option>)}
        </select>
        <input type="text" placeholder="Enter your item" />
        <button type="submit">Add</button>
      </form>
  )
}

function PackingList(){
  return (
      <ul className="list">
        { initialItems.map(item => <Item item={item} key={item.id}/>) }
      </ul>
  )
}

function Item({item}){
  return (
    <li>
      <span style={item.packed ? {textDecoration: 'line-through'} : {}}>{item.quantity} {item.description}</span>
        <button>❌</button>
    </li>
  )
}

function Stats(){
  return (
    <footer className="stats">
      <em>🧳 You have X items on your list, and you already packed W (Z%)</em>
    </footer>
  )
}