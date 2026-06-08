import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          {
            value: "all",
            label: "All",
          },
          {
            value: "no-discount",
            label: "No Discount",
          },
          {
            value: "with-discount",
            label: "With Discount",
          },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", label: "By name (A-Z)" },
          { value: "name-desc", label: "By name (Z-A)" },
          { value: "regularPrice-asc", label: "By price (low first)" },
          { value: "regularPrice-desc", label: "By price (high first)" },
          { value: "maxCapacity-asc", label: "By capacity (low first)" },
          { value: "maxCapacity-desc", label: "By capacity (high first)" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
