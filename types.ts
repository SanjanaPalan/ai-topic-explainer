
export interface ExplanationData {
  topic: string;
  simpleExplanation: string;
  realLifeExample: string;
  importance: string;
}

export enum AppStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
