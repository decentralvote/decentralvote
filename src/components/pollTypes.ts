
export type pollDisplayProps = {
  instance: instanceType,
  selectVote(value: any): any,
  selectedVote: number | null,
  onNext(): void,
}
export type pollLookupProps = {
  w3r: any,
  onLookup(value: object): void,
  onNext(): void,
}

export type pollSubmitProps = {
  w3r: any,
  instance: instanceType,
  selectedVote: number | null,
  onBack(): void,
  onNext(): void,
}

export type proposalListProps = {
  proposals: any,
}

export type voteCountsProps = {
  instance: instanceType,
}

export type walletProps = {
  connector: any,
  w3r: any,
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
