export default async function Page() {
  const resp = await fetch("https://jsonplaceholder.typicode.com/users");
  const result = await resp.json();
  console.log(result);
  return (
    <div>
      <h2>Cabins Page</h2>

      <ul>
        {result.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
