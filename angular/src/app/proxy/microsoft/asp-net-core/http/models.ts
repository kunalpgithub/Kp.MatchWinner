
export interface IFormFile {
  contentType: string;
  contentDisposition: string;
  headers: Record<string, string[]>;
  length: number;
  name: string;
  fileName: string;
}
