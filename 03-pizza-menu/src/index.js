import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import pizzaData from "./data/data.js";

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
  const styles = {};
  return (
    <header className="header">
      <h1 style={styles}>Fast React Pizza Co.</h1>
    </header>
  );
}

function Menu() {
  const pizzas = pizzaData;

  return (
    <main className="menu">
      <h2>Our Menu</h2>

      {pizzas.length > 0 ? (
        <>
          <p>
            Authentic Italian cuisine. 6 creative dishes to choose from. All
            from our stone oven, all organic, all delicious.
          </p>

          <ul className="pizzas">
            {pizzaData.map((pizza, index) => {
              return <Pizza key={index} pizzaData={pizza} />;
            })}
          </ul>
        </>
      ) : (
        <p>We're still working on our menu. Please com back later :)</p>
      )}
      {/*
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
      */}
    </main>
  );
}

function Pizza({ pizzaData }) {
  if (pizzaData.soldOut) return null;
  return (
    <li className="pizza">
      <img src={pizzaData.photoName} alt={pizzaData.name} />
      <div>
        <h3>{pizzaData.name}</h3>
        <p>{pizzaData.ingredients}</p>
        <span>{pizzaData.price + 3}</span>
      </div>
    </li>
  );
}

const Footer = () => {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = openHour <= hour && hour < closeHour;
  console.log(isOpen);
  // openHour <= hour && hour <= closeHour
  // ? alert("We're currently open")
  // : alert("We're currently CLOSED");

  // if (!isOpen) {
  //   return (<p>We're happy to welcome you between {openHour}:00 and  {closeHour}:00.</p>)
  // }

  return (
    <footer className="footer">
      {/* <span>{new Date().toLocaleString()} </span> */}
      {isOpen ? (
        <Order closeHour={closeHour} openHour={openHour} />
      ) : (
        <p>
          We're happy to welcome you between {openHour}:00 and {closeHour}:00.
        </p>
      )}
      {/* <p>{new Date().toLocaleString()}  We're currently open</p> */}
      <br />
      <p style={{ textAlign: "center" }}>
        ©{new Date().getFullYear()} All rights reserved
      </p>
    </footer>
  );
};

function Order({ closeHour, openHour }) {
  return (
    <div className="order">
      <p>
        We're open from {openHour}:00 until {closeHour}:00. Come visit us or
        order online!{" "}
      </p>
      <button className="btn">Order</button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
