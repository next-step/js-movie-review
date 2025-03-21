export class CustomFetchError extends Error {
  status: number;

  constructor(errorMessage: string, status: number) {
    super(errorMessage);
    this.status = status;
  }
}

export type FetchApiOptions = {
  url: string;
  headers?: HeadersInit;
};

export type FetchApiWithPaginationOptions<T> = {
  options?: {
    defaultPage: number;
    fn: (args: FetchApiOptions) => Promise<T>;
  };
} & FetchApiOptions;
