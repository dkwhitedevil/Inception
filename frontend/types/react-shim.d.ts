declare module 'react' {
  export function useState<T>(initial?: T): [T, (v: T) => void];
  export default any;
  export type FC<P = {}> = any;
  export type ReactNode = any;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}
