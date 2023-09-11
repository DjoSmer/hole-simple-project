const storage = localStorage;

const clear = (key: string): void => {
    if (storage && storage.getItem(key)) {
        storage.removeItem(key);
    }
};

const get = (key: string): string | null => {
    if (storage && storage.getItem(key)) {
        return storage.getItem(key) || null;
    }
    return null;
};

const set = (key: string, value: string): void => {
    if (storage && value) {
        storage.setItem(key, value);
    }
};

export const storageService = {
    clear,
    get,
    set,
};

export default storageService;
