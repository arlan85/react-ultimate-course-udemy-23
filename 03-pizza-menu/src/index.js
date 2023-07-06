import React from 'react';
import ReactDOM from 'react-dom/client';
import data from './data/data.js';
function App() {
  return (
    <>
      <Header />
      <Menu />
      <Footer />
    </>
  );
}

function Header() {
  return <h1>Fast Resact Pizza Co.</h1>
}

function Menu() {
  return <>
    <h2>Our Menu</h2>
    <Pizza />
    <Pizza />
    <Pizza />
  </>
}

const Footer = () => {
  return <footer>
    <p>{new Date().toLocaleString()}  We're currently open</p>
    <span>©{new Date().getFullYear()} All rights reserved</span>
  </footer>
}

function Pizza() {
  return (
    <>
      <img src='pizzas/focaccia.jpg' alt="pizza" />
      <h2>Focaccia</h2>
      <p>Bread with italian olive oil and rosemary</p>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<React.StrictMode>< App /></React.StrictMode>);
