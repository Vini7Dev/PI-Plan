import { ObjectLiteral } from 'typeorm';

import IClassTransformer from '../models/IClassTransformer';

class ClassTransformer implements IClassTransformer {
  public deleteProps<T extends ObjectLiteral>(object: T, props: string[]): T {
    const newObject = object;

    props.forEach((prop) => {
      delete newObject[prop];
    });

    return newObject;
  }
}

export default ClassTransformer;
