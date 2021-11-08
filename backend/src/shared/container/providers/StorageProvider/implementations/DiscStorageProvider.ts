import fs from 'fs';
import path from 'path';

import uploadConfig from '../../../../../configs/uploadConfig';
import IStorageProvider from '../models/IStorageProvider';

class DiscStorageProvider implements IStorageProvider {
  // Salvando um arquivo
  public async saveFile(file: string): Promise<string> {
    const { tempFolder, uploadsFolder } = uploadConfig;

    await fs.promises.rename(
      path.resolve(tempFolder, file),
      path.resolve(uploadsFolder, file),
    );

    return file;
  }

  // Apagando um arquivo
  public async deleteFile(file: string): Promise<void> {
    const { uploadsFolder } = uploadConfig;

    const fileDir = path.resolve(uploadsFolder, file);

    try {
      await fs.promises.stat(fileDir);
    } catch {
      return;
    }

    await fs.promises.unlink(fileDir);
  }
}

export default DiscStorageProvider;
