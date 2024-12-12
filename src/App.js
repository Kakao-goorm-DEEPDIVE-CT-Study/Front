
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import OptidayApp from './components/OptidayApp';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <OptidayApp/>
      </BrowserRouter>
    </div>
  );
}


export default App;


