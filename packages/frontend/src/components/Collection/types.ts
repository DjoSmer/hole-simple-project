import { Collection as CollectionModel, FileModel } from '~/types';

export interface CollectionControl {
  open: () => void;
  close: () => void;
}

export interface Collection extends CollectionModel {
  files?: FileModel[];
}
