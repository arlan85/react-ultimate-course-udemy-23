import { useState } from 'react'
import Form from './Form'
import Logo from './Logo'
import PackingList from './PackingList'
import Stats from './Stats'

// const initialItems = [
//   {id: 1, description: "Passports", quantity: 2, packed: false},
//   {id:2, description: "Socks", quantity: 12, packed: false},
//   {id:3, description: "Charger", quantity: 1, packed: false},
//   {id:4, description: "Water", quantity: 1, packed: true}
// ]

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

  function clearList(){
    const confirmed = window.confirm('Are you sure you want to delete all items?')
    if(!confirmed) return
    setItems([])
  }

  return (
    <div className="app">
     <Logo/>
     <Form onAddItems={handleAddItem}/>
     <PackingList items={items} onDeleteItem={handleDeleteItem} onhandlePacked={handlePackedItem} onClearList={clearList}/>
     <Stats items={items}/>
    </div>
  )
}

