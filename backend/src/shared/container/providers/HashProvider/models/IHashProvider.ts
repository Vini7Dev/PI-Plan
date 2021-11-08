interface IHashProvider {
  generate(toHash: string): Promise<string>;
  compare(noHashed: string, hashed: string): Promise<boolean>;
}

export default IHashProvider;
