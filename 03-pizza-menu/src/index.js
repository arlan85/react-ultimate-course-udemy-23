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
    <Pizza />
    <Pizza />
    <Pizza />
  </main>
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

function Pizza() {
  return (
    <>
      <img src='pizzas/focaccia.jpg' alt="pizza" />
      <h3>Focaccia</h3>
      <p>Bread with italian olive oil and rosemary</p>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode>< App /></React.StrictMode>);
