import { Outlet } from "react-router-dom";
import {Container} from 'react-bootstrap';
import Header from "./components/Header";
import Footer from "./components/Footer";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Header />
      <main className="p-5 position-relative">
        <Container fluid>
          <Outlet />
        </Container>
      </main>
      <Footer />
      <ToastContainer/>
    </>
  );
}

export default App;
