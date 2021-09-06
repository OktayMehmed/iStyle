import { Container } from 'react-bootstrap'
import Header from './components/header'
import Footer from './components/footer'


const App = () => {
  return (
    <>
      <Header />
      <main>
        <Container>
          <h1>iStyle</h1>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
