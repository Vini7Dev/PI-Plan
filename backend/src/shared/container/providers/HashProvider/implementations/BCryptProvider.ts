import { hash, compare } from 'bcrypt';

import IHashProvider from '../models/IHashProvider';

class BCryptProvider implements IHashProvider {
  // Gerar uma criptografia a partir de uma string
  public async generate(toHash: string): Promise<string> {
    const hashed = await hash(toHash, 8);

    return hashed;
  }

  // Comparar se uma string não criptografada é igual a sua respectiva criptografia
  public async compare(noHash: string, hashed: string): Promise<boolean> {
    const stringMatch = await compare(noHash, hashed);

    return stringMatch;
  }
}

export default BCryptProvider;
