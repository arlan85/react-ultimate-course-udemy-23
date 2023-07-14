import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import "./styles.css";

function App() {
  return (
    <div className="card">
      <Avatar />
      <div className="data">
        <Intro />
        {/* Should contain one Skill component
        for each web dev skill that you have,
        customized with props */}
        <SkillList />
      </div>
    </div>
  );
}

function Avatar() {
  return <img className="avatar" src="profile.jpeg" alt="profile" />;
}

function Intro() {
  const props = {
    heading: "Test Text",
    bio:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
  };
  return (
    <div>
      <h1>{props.heading}</h1>
      <p>{props.bio}</p>
    </div>
  );
}

function SkillList() {
  const array = [
    {
      color: "blue",
      skill: "Developer",
      emogi: "👶"
    },
    {
      color: "orange",
      skill: "React",
      emogi: "👶"
    },
    {
      color: "yellow",
      skill: "HTML+CSS",
      emogi: "👶"
    },
    {
      color: "green",
      skill: "JavaScript",
      emogi: "👶"
    }
  ];
  return (
    <div className="skill-list">
      {array.map((item, index) => (
        <Skill key={index} {...item} />
      ))}
    </div>
  );
}

function Skill(props) {
  return (
    <div className="skill" style={{ backgroundColor: props.color }}>
      <span>{props.skill}</span>
      <span>{props.emogi}</span>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

