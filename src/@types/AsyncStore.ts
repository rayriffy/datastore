export interface AsyncStore {
  key(index: number): Promise<string | null>
  setItem<T = unknown>(key: string, value: T): Promise<void>
  getItem<T = unknown>(key: string): Promise<T | null>
  removeItem(key: string): Promise<void>
  clear(): Promise<void>
}
