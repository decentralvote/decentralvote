import { Optional } from 'utility-types';

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
  fetchPoll?: any
}

export type pollSubmitProps = {
  w3r: any,
  instance: instanceType,
  selectedVote: number | null,
  onBack(): void,
  onNext(): void,
}

export type proposalListProps = Optional<{
  proposals: any,
  setProposals: any,
}, 'setProposals'>;

export type voteCountsProps = {
  instance: instanceType,
}

export type walletProps = {
  connector: any,
  w3r: any,
}

export type createPollEndDateProps = {
  date: any,
  setDate: any,
}

export type deleteDialogProps = {
  handleClose(): void,
  open: boolean,

}

export type instanceType = {
  address: string,
  pollName: string | null,
  proposals: any[],
  startTime: string,
  endTime: string,
  hasPollStarted: boolean,
  hasPollEnded: boolean,
  canVote: boolean,
  voterCounts: number[],
}
