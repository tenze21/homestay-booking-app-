import { ListGroup } from "react-bootstrap";

function CountriesList({
  countries,
  setCountry,
  setShowCountryDropdown,
  userCountry,
  setUserCountry,
}) {
  return (
    <ListGroup flush className="countries-dropdown">
        {countries
          .filter((c) => {
            return c.name.toLowerCase().includes(userCountry.toLowerCase());
          })
          .map((country) => {
            const { id, name } = country;
            return (
              <ListGroup.Item
                className="dropdown"
                action
                key={id}
                onClick={() => {
                  setCountry(country);
                  setShowCountryDropdown(false);
                  setUserCountry(name);
                }}
              >
                {name}
              </ListGroup.Item>
            );
          })}
    </ListGroup>
  );
}

export default CountriesList;