import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmDelete({
  resourceName,
  onConfirm,
  disabled,
  onCloseModal,
  action = "delete",
}) {
  const capitalizedAction = `${action.charAt(0).toUpperCase()}${action.slice(1)}`;
  return (
    <StyledConfirmDelete>
      <Heading as="h3">
        {capitalizedAction} {resourceName}
      </Heading>
      <p>
        Are you sure you want to {action} this {resourceName}? This action
        cannot be undone.
      </p>

      <div>
        <Button
          variation="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Close
        </Button>
        <Button variation="danger" disabled={disabled} onClick={onConfirm}>
          {`Confirm ${capitalizedAction}`}
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
