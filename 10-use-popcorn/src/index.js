import React from 'react';
import ReactDOM from 'react-dom/client';
import StartRating from './components/StartRating';
// import './index.css';
// import App from './App';

function Test (){
  const [rating, setRating] = React.useState(0)

  return (
    <div>
      <StartRating maxRate={10}  color='blue' size={30} defaultRating={rating} 
      onSetRating={setRating}/>
      <p>This movie was rated {rating} stars</p>
    </div>
  )

  }
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StartRating messages={
      ["Terrible", "Bad", "OK", "Good", "Amazing"]
    }/>
    <StartRating size={20} color='red' className="test" defaultRating={3}/>
    <Test></Test>
  </React.StrictMode>
);

