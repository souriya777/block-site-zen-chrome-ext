export declare namespace chrome.storage {
  interface LocalStorageArea {
    get(key: string | string[] | null): Promise<any>;
    set(items: { [key: string]: any }): Promise<void>;
    remove(keys: string | string[]): Promise<void>;
  }

  const local: LocalStorageArea;
}
