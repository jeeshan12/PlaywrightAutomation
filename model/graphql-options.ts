import { ReportOptions } from "./report-options";

export interface GraphQLOptions extends ReportOptions{
  url: string;
  query: string;
  queryVariables?: { [key: string]: string | number | boolean };
  headers?: { [key: string]: string };
}