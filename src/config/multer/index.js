const path = require('path');
const crypto = require('crypto');
const multer = require('multer');

const StorageType = {
  local: multer.diskStorage({
    destination: (request, file, callback) => {
      callback(null, path.resolve(__dirname, '..', '..', '..', 'tmp', 'uploads'));
    },
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};

module.exports = {
  dest: path.resolve(__dirname, '..', '..', '..', 'tmp', 'uploads'),
  storage: StorageType[process.env.STORAGE_TYPE],
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedMines = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif'];

    if (allowedMines.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid type image'));
    }
  },
};
