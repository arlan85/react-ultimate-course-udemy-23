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
  return (
    <>
    <div className='add-form'>
      <h3>What do you need for your 😍 trip?</h3> 
      <div className="form">
      <form>
        <input type="text" placeholder="Enter your item" />
        <button type="submit">Add</button>
      </form>
    </div>
    </div>

    </>
  )
}

function PackingList(){
  return (
    <div className="list">
      <p>The list</p>
      {/* <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul> */}
    </div>
  )
}

function Stats(){
  return (
    <footer className="stats">
      <em>🧳 You have X items on your list, and you already packed W (Z%)</em>
    </footer>
  )
}