import { ReactNode } from 'react';

export enum SlideType {
  TITLE = 'TITLE',
  CONTENT_LIST = 'CONTENT_LIST',
  CONTENT_COLUMNS = 'CONTENT_COLUMNS',
  TABLE = 'TABLE',
  CHART = 'CHART',
  QUOTE = 'QUOTE',
  DIAGRAM = 'DIAGRAM',
  IMAGE_GRID = 'IMAGE_GRID'
}

export interface SlideData {
  id: number;
  type: SlideType;
  title: string;
  subtitle?: string;
  content?: string[];
  tableHeaders?: string[];
  tableRows?: string[][];
  chartData?: any[]; // For Recharts
  extraContent?: ReactNode;
  backgroundImage?: string;
  themeColor?: string; // Hex or tailwind class suffix
  images?: { url: string; caption?: string }[];
}