declare module 'gray-matter' {
  export interface GrayMatterFile<T> {
    data: T;
    content: string;
    excerpt?: string;
    orig: Buffer | string;
  }

  export interface GrayMatterOption<T> {
    excerpt?: boolean | ((file: GrayMatterFile<T>, options: GrayMatterOption<T>) => string);
    excerpt_separator?: string;
    engines?: {
      [index: string]: any;
    };
    language?: string;
    delimiters?: string | [string, string];
    sections?: boolean;
  }

  export default function matter<T = any>(
    input: string | Buffer,
    options?: GrayMatterOption<T>
  ): GrayMatterFile<T>;
}
