export * from './data';
export * from './response';
export * from './social';
export { routes } from './routes';

export type TFormErrors<T> = Partial<Record<keyof T, string>>;
