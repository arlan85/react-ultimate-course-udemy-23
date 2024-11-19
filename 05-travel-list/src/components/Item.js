
export default function Item({ item, onDeleteItem, onhandlePacked }) {

  return (
    <li>
      <input type="checkbox" value={item.packed} onChange={() => onhandlePacked(item.id)} />
      <span style={item.packed ? { textDecoration: 'line-through' } : {}}>{item.quantity} {item.description}</span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
