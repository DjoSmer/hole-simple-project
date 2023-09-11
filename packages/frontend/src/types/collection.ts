export type CollectionRequiredField<Type> = {
    [Key in keyof Type]?: Type[Key] extends any[]
        ? CollectionRequiredField<Type[Key][0]>
        : Type[Key] extends {[k: string]: any} | undefined
        ? CollectionRequiredField<Type[Key]>
        : boolean;
} & {_r?: boolean};
