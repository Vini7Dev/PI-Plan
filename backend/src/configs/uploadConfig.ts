import path from 'path';
import multer from 'multer';

const tempFolder = path.resolve(__dirname, '..', '..', 'temp');

export default {
  tempFolder,
  storage: multer.diskStorage({
    destination: tempFolder,
    filename: (req, file, callback) => {
      const currentTime = (new Date()).getTime();

      const fileName = `${currentTime}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
