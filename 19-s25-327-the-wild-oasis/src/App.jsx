import styled from "styled-components";
import GlobalStyles from "./styles/GlobalStyles";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Heading from "./ui/Heading";

const StyledApp = styled.div` //for the root styled component od the app
  background-color: orange;
  padding: 20px;
`

function App() {
  return (<>
  <GlobalStyles/>
    <StyledApp>
      <Heading as='h1'>The wild Oasis</Heading>
      <Heading as='h2'>The wild Oasis</Heading>
      <Button onClick={()=>alert("Alert On")}>Check in</Button>
      <Button onClick={()=>alert("Alert On")}>Check out</Button>
      <Heading as='h3'>The wild Oasis</Heading>
      <Input type="number" placeholder="number of guests"/>
      <Input type="number" placeholder="number of guests"/>
    </StyledApp></>
  );
}

export default App;
