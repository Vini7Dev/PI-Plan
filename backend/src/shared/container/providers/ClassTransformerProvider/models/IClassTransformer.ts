import { ObjectLiteral } from 'typeorm';

interface IClassTransformer {
  // eslint-disable-next-line @typescript-eslint/ban-types
  deleteProps<T extends ObjectLiteral>(object: T, props: string[]): T;
}

export default IClassTransformer;
