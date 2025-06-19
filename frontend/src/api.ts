import axios from 'axios';

export const api = axios.create({ baseURL: '/api' });

export interface Paginated<T> {
  total: number;
  items: T[];
}

export type Range = 'today' | '7d' | '30d' | 'all';
export type Satisfaction = 'positive' | 'negative' | 'neutral';
export type SatisfactionResponse = {
  positive: number;
  neutral: number;
  negative: number;
};

export interface LiveCall {
  id: string;
  createdAt: string;
  entityType: string;
}

export interface Task {
  id: string;
  createdAt: string;
  entityType: string;
}

export interface Like {
  id: string;
  createdAt: string;
  entityType: string;
}

export interface Communication {
  id: string;
  createdAt: string;
  entityType: string;
  type: string;
}

export interface Patient {
  id: string;
  name: string;
  lastCommunicationDate: string;
  satisfaction: Satisfaction;
}

export interface Employee {
  id: string;
  name: string;
  lastCommunicationDate: string;
  satisfaction: Satisfaction;
}

export async function fetchPage<T>(
  url: string,
  page = 1,
  limit = 10,
  extra: Record<string, string | number | boolean | undefined> = {},
) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    ...Object.fromEntries(
      Object.entries(extra).filter(([_, v]) => v !== undefined),
    ),
  });

  const { data } = await api.get<Paginated<T>>(`${url}?${params.toString()}`);
  return data;
}
