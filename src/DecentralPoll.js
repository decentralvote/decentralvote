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
    hasPollEnded: false
  });

  const [
    pollAddress,
    setPollAddress,
  ] = useState("");
  

  async function fetchPoll() {
    if (typeof window.ethereum !== 'undefined') {
      const provider3 = new ethers.providers.Web3Provider(window.ethereum);
      const pollContract = new ethers.Contract(pollAddress, DecentralPollContract.abi, provider3);
      try {
        let pollName = ethers.utils.parseBytes32String(await pollContract.getName());
        let props = await pollContract.getProposals();
        let startTime = new Date((await pollContract.getStartTime()).toNumber());
        let endTime = new Date((await pollContract.getEndTime()).toNumber());
        let hasPollEnded = await pollContract.hasPollEnded();
        let instanceData = {
          pollName: pollName,
          proposals: props,
          startTime: startTime,
          endTime: endTime,
          hasPollEnded: hasPollEnded
        };
        setPollInstance(instanceData);
        console.log('instance: ', instanceData);
      } catch (err) {
        console.log("Error: ", err);
      }
    }    
  }

  function ListItem(props) {
    // Correct! There is no need to specify the key here:
    return <li>{props.value}</li>;
  }
  
  function ProposalList(props) {
    const proposals = props.proposals;
    const listItems = proposals.map((proposal) =>
      // Correct! Key should be specified inside the array.
      <ListItem key={proposal} value={ethers.utils.parseBytes32String(proposal)} />
    );
    return (
      <ul>
        {listItems}
      </ul>
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
      <h3>Start Time: {pollInstance.startTime.toString()}</h3>
      <h3>End Time: {pollInstance.endTime.toString()}</h3>
      <h3>
        Has Ended? 
        {pollInstance.hasPollEnded ? " Yes" : " No"}
      </h3>

    </div>
  );
}

export default DecentralPoll;
