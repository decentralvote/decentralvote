
export type pollDisplayProps = {
  instance: instanceType,
  selectVote(value: any): () => any,
  selectedVote: string,
  onNext(): () => void,
}

export type proposalListProps = {
  proposals: any,
}

type instanceType = {
  pollName: string,
  proposals: any[],
  startTime: string,
  endTime: string,
  hasPollStarted: boolean,
  hasPollEnded: boolean,
  canVote: boolean,
  voterCounts: number[],
}
