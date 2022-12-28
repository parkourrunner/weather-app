import { useEffect, useState } from "react";
import {
  Container,
  Navbar,
  NavbarBrand,
  Row,
  Jumbotron,
  InputGroup,
  InputGroupAddon,
  Button,
  FormGroup,
  Input,
  Col,
} from "reactstrap";

import Weather from "./Components/Weather";

function App() {
  const [weather, setWeather] = useState(null);
  const [cityList, setCityList] = useState([]);
  const [newCityName, setNewCityName] = useState("");
  const getCityList = async () => {
    await fetch("/api/cities")
      .then((res) => res.json())
      .then((res) => {
        setCityList(res.map((r) => r.city_name));
      });
  };

  const handleInputChange = (e) => {
    setNewCityName(e.target.value);
  };

  const handleAddCity = () => {
    fetch("/api/cities", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ city: newCityName }),
    })
      .then((res) => res.json())
      .then((res) => {
        getCityList();
        setNewCityName("");
      });
  };

  const getWeather = (city) => {
    fetch(`/api/weather/${city}`)
      .then((res) => res.json())
      .then((weather) => {
        console.log(weather);
        if (!weather.error) setWeather(weather);
      });
  };

  const handleChangeCity = (e) => {
    getWeather(e.target.value);
  };

  useEffect(() => {
    getCityList();
  }, []);

  return (
    <Container fluid className="centered">
      <Navbar dark color="dark">
        <NavbarBrand href="/">MyWeather</NavbarBrand>
      </Navbar>
      <Row>
        <Col>
          <div>
            <h1 className="display-3">MyWeather</h1>
            <p className="lead">
              The current weather for your favorite cities!
            </p>
            <InputGroup>
              <Input
                placeholder="New city name..."
                value={newCityName}
                onChange={handleInputChange}
              />
              <div>
                <Button color="primary" onClick={handleAddCity}>
                  Add City
                </Button>
              </div>
            </InputGroup>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <h1 className="display-5">Current Weather</h1>
          <FormGroup>
            <Input type="select" onChange={handleChangeCity}>
              {cityList.length === 0 && <option>No cities added yet.</option>}
              {cityList.length > 0 && <option>Select a city.</option>}
              {cityList.map((city, i) => (
                <option key={i}>{city}</option>
              ))}
            </Input>
          </FormGroup>
        </Col>
      </Row>
      <Weather data={weather} />
    </Container>
  );
}

export default App;
