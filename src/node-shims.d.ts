declare module "node:http" {
  export function createServer(handler: (req: unknown, res: {
    writeHead: (statusCode: number, headers?: Record<string, string>) => void;
    end: (body?: string) => void;
  }) => void): {
    listen: (port: number, cb?: () => void) => void;
  };
}

declare module "node:readline/promises" {
  export function createInterface(options: { input: unknown; output: unknown }): {
    question: (query: string) => Promise<string>;
    close: () => void;
  };
}

declare module "node:process" {
  export const stdin: unknown;
  export const stdout: unknown;
}

declare const require: {
  main: unknown;
};

declare const module: unknown;

declare const process: {
  exitCode: number;
};

declare const console: {
  log: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
};
