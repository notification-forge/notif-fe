export interface TemplateItem {
  id: number;
  template: string;
  deliveryChannel: string;
  app: string;
  lastEdited: Date;
}

export type DeliveryChannel = 'EMAIL' | 'TEAMS';
