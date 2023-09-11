export type MakePartialString<Type> = {
    [Key in keyof Type]?: Type[Key] extends {[k: string]: any} | undefined
        ? MakePartialString<Type[Key]>
        : string;
};

export interface Response<T> {
    action: 'get' | 'getList' | 'post' | 'put' | 'patch' | 'delete' | 'getFields';
    success: boolean;
    errors?: MakePartialString<T>;
}

export interface ResponseEntryId<T, TE = T> extends Response<TE> {
    action: 'post' | 'delete';
    entryId: string;
}

export interface ResponseEntry<T, TE = T> extends Response<TE> {
    action: 'get' | 'put' | 'patch';
    entryId?: string;
    entry: T;
}

export type ResponseList<T, ET = {}> = Response<T> & {
    action: 'getList';
    list: T;
} & ET;

export interface ResponseFields<T> extends Response<T> {
    action: 'getFields';
    fields: T[];
    groups: [];
}
