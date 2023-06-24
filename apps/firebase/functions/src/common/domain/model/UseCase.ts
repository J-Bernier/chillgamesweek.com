type UseCase<Request, Response> =
  | (() => Promise<Response> | Response)
  | ((request: Request) => Promise<Response> | Response);

export type {UseCase};
