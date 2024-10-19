import { ListGroup } from "react-bootstrap";

function StatesList({
  states,
  setRegion,
  setShowStateDropdown,
  userState,
  setUserState,
}) {
  return (
    <ListGroup className="states-dropdown">
        {states
          .filter((s) => {
            return s.name.toLowerCase().includes(userState.toLowerCase());
          })
          .map((state) => {
            const { id, name } = state;
            return (
              <ListGroup.Item
                action
                key={id}
                onClick={() => {
                  setRegion(state);
                  setShowStateDropdown(false);
                  setUserState(name);
                }}
              >
                {name}
              </ListGroup.Item>
            );
          })}
    </ListGroup>
  );
}

export default StatesList;