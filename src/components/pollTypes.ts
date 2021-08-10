
export type pollDisplayProps = {
  instance: instanceType,
  selectVote(value: any): () => any,
  selectedVote: number,
  onNext(): () => void,
}

export type proposalListProps = {
  proposals: any,
}

export type pollLookupProps = {
  w3r: any,
  onLookup(value: object):() => instanceType,
  fetchPoll(value: string): () => instanceType,
  onNext(): () => void,
}

export type pollSubmitProps = {
  w3r: any,
  instance: instanceType,
  selectedVote: number,
  onBack(): () => void,
  onNext(): () => void,
}


type instanceType = {
  address: string,
  pollName: string,
  proposals: any[],
  startTime: string,
  endTime: string,
  hasPollStarted: boolean,
  hasPollEnded: boolean,
  canVote: boolean,
  voterCounts: number[],
}
