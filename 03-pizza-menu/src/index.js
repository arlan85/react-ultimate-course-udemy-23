import React from 'react';
import ReactDOM from 'react-dom/client';
import data from './data/data.js';
import './index.css';

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  // const styles = { color: 'red', fontSize: '48px', textTransform: 'uppercase'}
  const styles = {}
  return (
  <header className="header">
    <h1 style={styles}>Fast React Pizza Co.</h1>
  </header>
  )
}

function Menu() {
  return <main className='menu'>
    <h2>Our Menu</h2>
    <Pizza 
    name="Focaccia" 
    ingredients="Bread, olive oil, rosemary"
    photoName="pizzas/focaccia.jpg" 
    price={15}
    />
     <Pizza 
    name="Pizza Funghi" 
    ingredients="Tomato, mozarella, mushrooms, and onion"
    price={10}
    photoName="pizzas/funghi.jpg" 
    />
  </main>
}


function Pizza(props) {
  return (
    <div className="pizza">
      <img src={props.photoName} alt={props.name} />
      <div>
      <h3>{props.name}</h3>
      <p>{props.ingredients}</p>
      <span>{props.price +3}</span>
      </div>
    </div>
  );
}

const Footer = () => {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen =  openHour <= hour && hour <= closeHour;
  console.log(isOpen)
  // openHour <= hour && hour <= closeHour 
  // ? alert("We're currently open") 
  // : alert("We're currently CLOSED");

  return <footer className='footer'>
    <p>{new Date().toLocaleString()}  We're currently open</p>
    <span>©{new Date().getFullYear()} All rights reserved</span>
  </footer>
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode>< App /></React.StrictMode>);
