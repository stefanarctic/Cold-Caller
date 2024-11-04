import Contacts from './components/Contacts';
import CreateContact from './components/CreateContact';
import './css/index.css';

const App = () => {
  return (
    <div className="App">
      <h1>Cold Caller</h1>
      <Contacts />
      <CreateContact />
    </div>
  )
};

export default App;