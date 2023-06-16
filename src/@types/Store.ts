export interface Store {
  set<T = unknown>(key: string, value: T): Promise<void>
  get<T = unknown>(key: string): Promise<T>
  remove(key: string): Promise<void>
}
