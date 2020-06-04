declare module Express {
  interface Request {
    user?: { _id: string; email: string; password: string };
  }
}
