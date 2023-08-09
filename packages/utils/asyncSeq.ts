type FnArray<T> = (() => Promise<T>)[];

export default async function asyncSeq<T>(fnArray: FnArray<T>) {
  for (const fn of fnArray) {
    await fn();
  }
}
