import { useEffect } from "react";
import { getCabins } from "../services/apiCabins";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Cabins() {
  useEffect(function () {
    getCabins().then((data) => console.log("cabins", data));
  }, []);
  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <img src="http://127.0.0.1:54341/storage/v1/object/public/cabin-images/cabin-001.jpg" />
      <p>TEST</p>
    </Row>
  );
}

export default Cabins;
