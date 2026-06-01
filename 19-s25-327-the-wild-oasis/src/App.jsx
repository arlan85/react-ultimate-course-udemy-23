import styled from "styled-components";

const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
  background-color: yellow;
`;

const Button = styled.button`
  font-size: 1.4rem;
  padding: 1.2rem 1.6rem;
  font-weight: 500;
  border:0;
  border-radius: 7px;
  background-color: purple;
  color: white;
  margin:  20px;
  cursor: pointer;
`;

const Input = styled.input`
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: .8rem 1.2rem;
`;

const StyledApp = styled.div` //for the root styled component od the app
  background-color: orange;
  padding: 20px;
`

function App() {
  return (
    <StyledApp>
      <H1>The wild Oasis</H1>
      <Button onClick={()=>alert("Alert On")}>Check in</Button>
      <Button onClick={()=>alert("Alert On")}>Check out</Button>
      <Input type="number" placeholder="number of guests"/>
    </StyledApp>
  );
}

export default App;
