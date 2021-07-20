import { useState } from 'react';
import { ethers } from 'ethers';
import DecentralPollContract from './artifacts/contracts/DecentralPoll.sol/DecentralPoll.json';

function DecentralPoll() {
  // store greeting in local state
  const [
    pollInstance,
    setPollInstance,
  ] = useState({
    pollName: "",
    proposals: [],
    startTime: "",
    endTime: "",
    hasPollStarted: false,
    hasPollEnded: false,
    canVote: false,
    voterCounts: []
  });

  const [
    pollAddress,
    setPollAddress,
  ] = useState("");

  const [
    selectedVote,
    setSelectedVote,
  ] = useState(null);
  

  async function fetchPoll() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      console.log("the signer", signer);
      const pollContract = new ethers.Contract(pollAddress, DecentralPollContract.abi, provider);
      try {
        let pollName = ethers.utils.parseBytes32String(await pollContract.getName());
        let props = await pollContract.getProposals();
        let startTime = new Date((await pollContract.getStartTime()).toNumber()*1000);
        let endTime = new Date((await pollContract.getEndTime()).toNumber()*1000);
        let hasPollStarted = await pollContract.hasPollStarted();
        let hasPollEnded = await pollContract.hasPollEnded();
        let voterCounts = await pollContract.getVoterCounts();
        let canVote = true; //await pollContract.canVote();
        let instanceData = {
          pollName: pollName,
          proposals: props,
          startTime: startTime,
          endTime: endTime,
          hasPollStarted: hasPollStarted,
          hasPollEnded: hasPollEnded,
          canVote: canVote,
          voterCounts: voterCounts
        };
        setPollInstance(instanceData);
        console.log('instance: ', instanceData);
      } catch (err) {
        console.log("Error: ", err);
      }
    }    
  }

  // request access to the user's MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  // call the smart contract, send a vote
  async function sendVote() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const pollContract = new ethers.Contract(pollAddress, DecentralPollContract.abi, signer);
      try {
        const transaction = await pollContract.vote(selectedVote);
        await transaction.wait();
        fetchPoll();
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }
  
  function ProposalList(props) {
    const proposals = props.proposals;
    return proposals.map((proposal, index) =>
      <label style={{display: 'block'}}>
        <input 
          name="proposal" 
          type="radio" 
          value={index}
          checked={index == selectedVote} 
          onChange={e => setSelectedVote(e.target.value)} />
          {ethers.utils.parseBytes32String(proposal)}
        </label>
    );
  }

  function VoteList(props) {
    let counts = props.counts;
    let proposals = props.proposals;
    return counts.map((count, index) =>
    <p>{ethers.utils.parseBytes32String(proposals[index])} - {count.toString()}</p>
    );
  }

  return (
    <div className="DecentralPoll" style={{border: '1px solid black'}}>
      <h2>Demo Poll</h2>
      <label htmlFor="contact-address">Poll Address:</label>
      <input id="contact-address" size="50" value={pollAddress} onChange={e => setPollAddress(e.target.value)} placeholder="Set Poll Address" />
      <br />
      <button onClick={fetchPoll}>Fetch Poll</button>
      <h3>Poll Name: {pollInstance.pollName}</h3>
      <h3>Poll Proposals:</h3>
      <ProposalList proposals={pollInstance.proposals} />
      <h3>You chose: {selectedVote}</h3>
      <button onClick={sendVote}>Vote!</button>
      <h3>Start Time: {pollInstance.startTime.toString()}</h3>
      <h3>End Time: {pollInstance.endTime.toString()}</h3>
      <h3>Now: {new Date().toString()}</h3>
      <h3>
        Has Started? 
        {pollInstance.hasPollStarted ? " Yes" : " No"}
      </h3>
      <h3>
        Has Ended? 
        {pollInstance.hasPollEnded ? " Yes" : " No"}
      </h3>
      <h3>Can Vote: {pollInstance.canVote ? " Yes" : " No"}</h3>
      <VoteList counts={pollInstance.voterCounts} proposals={pollInstance.proposals} />
    </div>
  );
}

export default DecentralPoll;
