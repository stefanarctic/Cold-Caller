import { useEffect, useRef } from 'react';
import Contacts from './components/Contacts';
import CreateContact from './components/CreateContact';
import './css/index.css';

export let AppRef = null;

const App = () => {

  const AR = useRef(null);

  useEffect(() => {
    AppRef = AR.current;
  });

  return (
    <div className="App" ref={AR}>
      <h1>Cold Caller</h1>
      <Contacts />
      <CreateContact />
    </div>
  )
};

export default App;