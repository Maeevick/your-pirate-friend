export enum EventType {
  AWARENESS = 'AWARENESS',
  ACQUISITION = 'ACQUISITION',
  ACTIVATION = 'ACTIVATION',
  RETENTION = 'RETENTION',
  REVENUE = 'REVENUE',
  REFERRAL = 'REFERRAL',
}

export type Event = {
  type: EventType;
  timestamp: Date;
  source: string;
  name: string;
  projectId: string;
};

export interface IEventRepository {
  save(event: Event): void;
}
