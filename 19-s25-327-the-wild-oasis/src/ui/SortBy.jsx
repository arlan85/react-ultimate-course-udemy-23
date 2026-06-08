import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams(); //all this could be added to a custom hook
  const sortBy = searchParams.get("sortBy") || "";

  function hadleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <Select
      options={options}
      type="white"
      onChange={hadleChange}
      value={sortBy}
    />
  );
}

export default SortBy;
