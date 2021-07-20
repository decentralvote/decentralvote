import './App.css';

import Greeter from './Greeter';
import DecentralPoll from './DecentralPoll';

function App() {
  return (
    <div className="App">
      <section>
        <h1>Decentral.Vote</h1>
      </section>
      <DecentralPoll />
      <Greeter />
    </div>
  );
}

export default App;
