import { useState } from "react";
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
    setSelectedFriend(null);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleFriendSelection(friend) {
    setSelectedFriend((selected) =>
      selected?.id === friend.id ? null : friend
    );
    setShowAddFriend(false);
  }

  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
    setSelectedFriend(null);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          onSelection={handleFriendSelection}
          selectedFriend={selectedFriend}
        ></FriendList>

        {showAddFriend && (
          <FormAddFriend onAddFriend={handleAddFriend}></FormAddFriend>
        )}

        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>

      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={handleSplitBill}
        ></FormSplitBill>
      )}
    </div>
  );
}

function FriendList({ friends, onSelection, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          key={friend.id}
          friend={friend}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        ></Friend>
      ))}
    </ul>
  );
}
function Friend({ friend, onSelection, selectedFriend }) {
  const { name, image, balance } = friend;
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={image} alt={name} />
      <h3>{name}</h3>
      {balance < 0 && (
        <p className="red">
          You owe {name} {Math.abs(balance)}$
        </p>
      )}
      {balance > 0 && (
        <p className="green">
          {name} owes you {Math.abs(balance)}$
        </p>
      )}
      {balance === 0 && <p>You and {name} are even</p>}
      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleAddFriend(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    onAddFriend(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleAddFriend}>
      <label>👫 👬 Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>📸Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

function Button({ onClick, children }) {
  return (
    <button onClick={onClick} className="button">
      {children}
    </button>
  );
}

function FormSplitBill({ selectedFriend, onSplitBill }) {
  const { name } = selectedFriend;
  const [bill, setBill] = useState(0);
  const [paidByUser, setPaidByUser] = useState(0);
  const paidByFriend = bill - paidByUser;
  const [howIsPaying, setWhoIsPaying] = useState("user");

  function handlePaidByUser(e) {
    const value = Number(e.target.value);
    setPaidByUser(value > bill ? paidByUser : value);
  }

  function handleSplitBill(e) {
    e.preventDefault();

    if (!bill || !paidByUser) return;

    onSplitBill(howIsPaying === "user" ? paidByFriend : -paidByUser);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSplitBill}>
      <h2>Split a bill with {name}</h2>
      <label htmlFor="bill">💰 Bill value</label>
      <input
        id="bill"
        type="number"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      ></input>
      <label htmlFor="your_expense">🧍‍♂️ Your expense</label>
      <input
        id="your_expense"
        type="number"
        value={paidByUser}
        onChange={handlePaidByUser}
      ></input>
      <label htmlFor="friend_expense">👫 {name}'s expense</label>
      <input
        id="friend_expense"
        type="number"
        disabled
        value={paidByFriend}
      ></input>
      <label htmlFor="how_pay">🤑 Who is paying the bill?</label>
      <select
        id="how_pay"
        value={howIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{name}</option>
      </select>
      <Button>Split bill</Button>
    </form>
  );
}
