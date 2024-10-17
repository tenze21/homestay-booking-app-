import { Outlet } from "react-router-dom";
import {Container} from 'react-bootstrap';
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <main className="p-5">
        <Container fluid>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
