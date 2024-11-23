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
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList></FriendList>
        <FormAddFriend></FormAddFriend>
      </div>
      <FormSplitBill></FormSplitBill>
    </div>
  );
}

function FriendList() {
  return (
    <ul>
      {initialFriends.map((friend) => (
        <Friend key={friend.id} friend={friend}></Friend>
      ))}
    </ul>
  );
}
function Friend({ friend }) {
  const { name, image, balance } = friend;
  return (
    <li>
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
      <button className="button">Select</button>
    </li>
  );
}

function FormAddFriend() {
  return <div className="form-add-friend">TODO</div>;
}

function FormSplitBill() {
  return <div className="form-split-bill">TODO</div>;
}
