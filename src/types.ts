export type LabelType = 'pants-fire' | 'false' | 'barely-true' | 'half-true' | 'mostly-true' | 'true';

export interface DatasetStatement {
  id: string;
  statement: string;
  label: LabelType;
  speaker: string;
  speakerJob: string;
  party: string;
  context: string;
  year: number;
  subject: string;
}

export type ModuleId =
  | 'research-question'
  | 'dataset-card'
  | 'modeling'
  | 'evaluation'
  | 'error-bias'
  | 'demo'
  | 'ethics'
  | 'sources';

export interface ModuleMeta {
  id: ModuleId;
  number: string;
  title: string;
  subtitle: string;
  iconName: string;
  accent: 'blue' | 'teal' | 'amber';
  badge: string;
}

export interface UserSession {
  email: string;
  name: string;
  role: string;
  organization: string;
  authenticatedAt: string;
}

export interface ConfusionMatrixData {
  labels: LabelType[];
  matrix: number[][];
  samplePerCell: Record<string, { statement: string; speaker: string; explanation: string }>;
}
