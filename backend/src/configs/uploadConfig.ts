import path from 'path';
import multer from 'multer';

// Pasta temporária para upload de arquivos
const tempFolder = path.resolve(__dirname, '..', '..', 'temp');

// Pasta para armazém local de arquivos (desenvolvimento)
const uploadsFolder = path.resolve(__dirname, '..', '..', 'temp', 'uploads');

// Configurações de upload
export default {
  tempFolder,
  uploadsFolder,
  storage: multer.diskStorage({
    destination: tempFolder,
    filename: (req, file, callback) => {
      const currentTime = (new Date()).getTime();

      const fileName = `${currentTime}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
