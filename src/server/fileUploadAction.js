const multer = require('multer');
const moment = require('moment');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads');  
    // 파일이 저장되는 경로입니다.
  },
  filename: function(req, file, cb) {
    const originalName = Buffer.from(file.originalname, 'latin1').toString('utf8');
    const safeName = moment().format('YYYYMMDDHHmmss') + "_" + originalName;
    cb(null, safeName);
  }
});

const upload = multer({ storage: storage }).single("file");   
// single : 하나의 파일업로드 할때

module.exports = upload;