import { useState } from 'react';
import { ethers } from 'ethers';
import GreeterAbi from './artifacts/contracts/Greeter.sol/Greeter.json';

// Update with the contract address logged out to the CLI when it was deployed 
const greeterAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

function Greeter() {
  // store greeting in local state
  const [greeting, setGreetingValue] = useState();

  // request access to the user's MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  // call the smart contract, read the current greeting value
  async function fetchGreeting() {
    if (typeof window.ethereum !== 'undefined') {
      const provider1 = new ethers.providers.Web3Provider(window.ethereum);
      const contract1 = new ethers.Contract(greeterAddress, GreeterAbi.abi, provider1);
      try {
        const data = await contract1.greet();
        console.log('data: ', data);
      } catch (err) {
        console.log("Error: ", err);
      }
    }    
  }

  // call the smart contract, send an update
  async function setGreeting() {
    if (!greeting) return;
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider2 = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider2.getSigner();
      const contract2 = new ethers.Contract(greeterAddress, Greeter.abi, signer);
      const transaction = await contract2.setGreeting(greeting);
      await transaction.wait();
      fetchGreeting();
    }
  }

  return (
    <div className="Greeter">
      <h2>Greeter</h2>
      <header className="Greeter-header">
        <button onClick={fetchGreeting}>Fetch Greeting</button>
        <button onClick={setGreeting}>Set Greeting</button>
        <input onChange={e => setGreetingValue(e.target.value)} placeholder="Set Greeting" />
      </header>
    </div>
  );
}

export default Greeter;
