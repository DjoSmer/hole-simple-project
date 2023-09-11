export type DictionaryType = string;
export type DateString = string;

export type DictionaryValue<V = undefined> = V extends undefined
  ? {
      value?: V;
    }
  : {
      value: V;
    };

export type Dictionary<V = undefined> = {
  code: string;
  name: string;
} & DictionaryValue<V>;
