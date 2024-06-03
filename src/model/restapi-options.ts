import type { ReportOptions } from "./report-options";
import type { ReadStream } from "node:fs";
/**
 * Can be converted to JSON
 */

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type Serializable = any;

export interface GetMethodOptions extends ReportOptions {
  url: string;

  headers?: { [key: string]: string };

  params?: { [key: string]: string | number | boolean };
}

export interface PostMethodOptions extends ReportOptions {
  url: string;

  headers?: { [key: string]: string };

  params?: { [key: string]: string | number | boolean };

  data?: string | Buffer | Serializable;

  form?: { [key: string]: string | number | boolean };

  multipart?: {
    [key: string]:
      | string
      | number
      | boolean
      | ReadStream
      | {
          /**
           * File name
           */
          name: string;

          /**
           * File type
           */
          mimeType: string;

          /**
           * File content
           */
          buffer: Buffer;
        };
  };
}

export interface DeleteMethodOptions extends ReportOptions {
  url: string;

  data?: string | Buffer | Serializable;

  form?: { [key: string]: string | number | boolean };

  headers?: { [key: string]: string };

  multipart?: {
    [key: string]:
      | string
      | number
      | boolean
      | ReadStream
      | {
          name: string;
          mimeType: string;
          buffer: Buffer;
        };
  };

  params?: { [key: string]: string | number | boolean };
}

export interface PutMethodOptions extends ReportOptions {
  url: string;

  headers?: { [key: string]: string };

  params?: { [key: string]: string | number | boolean };

  data?: string | Buffer | Serializable;

  form?: { [key: string]: string | number | boolean };

  multipart?: {
    [key: string]:
      | string
      | number
      | boolean
      | ReadStream
      | {
          /**
           * File name
           */
          name: string;

          /**
           * File type
           */
          mimeType: string;

          /**
           * File content
           */
          buffer: Buffer;
        };
  };
}
