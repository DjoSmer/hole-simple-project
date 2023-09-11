import { Dictionary } from '~/types';

export interface Model {
  id: string;
  name: string;
}

export interface Collection {
  _id: string;
}

export interface SidModel extends Model {
  sid: string;
}

export interface FormatModal<V = string, FV = undefined> {
  value: V;
  format: Dictionary<FV>;
}

export interface FileModel {
  outsideId: string;
  hash?: string;
  title?: string;
  mimeType: string;
}

export type List<M> = M[];
