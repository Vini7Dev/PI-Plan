declare namespace Express {
  export interface Request {
    user: {
      id: string;
      user_type: 'admin' | 'assembler';
    }
    file: Express.Multer.File;
  }
}
