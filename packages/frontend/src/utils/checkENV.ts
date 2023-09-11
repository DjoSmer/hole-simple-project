/**
 * Check ENV in constant.ts file
 * @param key
 */
export const checkENV = (key: string): string => {
  if (!process.env[key]) {
    throw new Error('ENV: not found ' + key);
  }

  return process.env[key] || '';
};
