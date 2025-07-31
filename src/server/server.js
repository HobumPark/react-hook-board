const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const db = require('./config/db_local');

const fs = require('fs');
var path = require('path');
var mime = require('mime-types');

const multer = require('multer');
const upload = require('./fileUploadAction');//업로드 기능을 가져옴

app.use(express.urlencoded({extended: true}));
app.use(express.json()) // To parse the incoming requests with JSON payloads

app.get('/api/get/board', (req, res) => {
    console.log('/api/get/board')
    db.query("SELECT * FROM board order by no desc limit 0,10", (err, data) => {
        console.log(data)
        if(!err) res.send({ board_res : data });
        else res.send(err);
    })
})

app.get('/api/count/board', (req, res) => {
    console.log('/api/count/board')
    db.query("SELECT count(*) as cnt FROM board", (err, data) => {
        console.log(data)
        if(!err) res.send({ board_res : data });
        else res.send(err);
    })
})

app.get('/api/get/page/:page', (req, res) => {
    console.log('/api/get/page/:page')
    console.log(req.params.page)
    const {page}=req.params
    const start=(page-1)*10
    const end=10
    db.query(`SELECT * FROM board limit ${start},${end}`, (err, data) => {
        if(!err) res.send({ board_res : data });
        else res.send(err);
    })
})

app.get('/api/get/post/:no', (req, res) => {
    console.log('/api/get/post/:no')
    console.log(req.params.no)
    const {no}=req.params
    db.query(`SELECT * FROM board where no=${no}`, (err, data) => {
        if(!err) res.send({ board_res : data });
        else res.send(err);
    })
})

app.post('/api/write/post', (req, res) => {
    console.log('/api/write/post')
    console.log(req.body)
    const title=req.body.title
    const contents=req.body.contents
    const author=req.body.author
    const regDate=req.body.regDate
    const attach=req.body.attach
    const hits=req.body.hits
    const originalFileName=req.body.originalFileName  
    const saveFileName=req.body.saveFileName  

    console.log('title:',title)
    console.log('contents:',contents)
    console.log('author:',author)
    console.log('regDate:',regDate)
    console.log('attach:',attach)
    console.log('hits:',hits)
    console.log('originalFileName:',originalFileName)
    console.log('saveFileName:',saveFileName)

    //insert into board(title,contents,author,regDate,attach,hits) values()
    //복구쿼리 (삭제) : delete from board where no=23
    db.query(`insert into board(title,contents,author,reg_date,attach,original_file_name,stored_file_name, hits)`+
     `values('${title}','${contents}','${author}','${regDate}','${attach}', '${originalFileName}','${saveFileName}',${hits})`, (err, data) => {
        if(!err) res.send({ board_res : data });
        else res.send(err);
    })
})

app.delete('/api/delete/post:no', (req, res) => {
    console.log('/api/delete/post:no')
    console.log(req.params)
   const no=req.params.no
   console.log(no)
   console.log(req.body)

   db.query(`delete from board where no=${no}`, (err, data) => {
    if(!err) res.send({ board_res : data });
    else res.send(err);
   })

   if(req.body.hasOwnProperty('file')===false){
        console.log('파일정보 없음')
   }else{
        const fileName=req.body.file.fileName
        const filePath=__dirname+`\\uploads_temp\\${fileName}`
        fs.unlink(filePath, (err) => err ?  
        console.log(err) : console.log(`${filePath} 를 정상적으로 삭제했습니다`));
   }
   
})


app.patch('/api/update/post:no', (req, res) => {
    console.log('/api/update/post:no')
    console.log(req.params)
    console.log(req.body)
    const no=req.params.no
    const title=req.body.title
    const contents=req.body.contents

    db.query(`update board set title='${title}',contents='${contents}' where no=${no}`, (err, data) => {
        if(!err) res.send({ board_res : data });
        else res.send(err);
    })
})

app.get('/api/get/prevAndNext:no', (req, res) => {
    console.log('/api/get/prevAndNext:no')
    console.log('no',req.params.no)
    const no=req.params.no

    db.query(`SELECT no,title FROM board WHERE no IN (
    (SELECT no FROM board WHERE no < ${no} ORDER BY no DESC LIMIT 1),
    (SELECT no FROM board WHERE no > ${no} ORDER BY no LIMIT 1) )`, (err, data) => {
        console.log(data)
        if(!err) res.send({ board_res : data });
        else res.send(err);
    })
})

app.get('/api/get/search', (req, res) => {
    console.log('/api/get/search')
    const {query,page}=req.query
    const startIndex=(page-1)*10
    db.query(`SELECT * from board where title like '%${query}%' limit ${startIndex},10`, (err, data) => {
            console.log(data)
            if(!err) res.send({ board_res : data });
            else res.send(err);
    })
})

app.put('/api/put/view/increase:no', (req, res) => {
    console.log('/api/put/view/increase:no')
    const no=req.params.no
    var hits=0
    db.query(`select hits from board where no=${no}`, (err, data) => {
        if(!err){
            console.log('data',data)
            console.log('data.hits',data[0].hits)
            hits=data[0].hits

            db.query(`update board set hits=${hits+1} where no=${no}`, (err, data) => {
                if(!err){
                    console.log(data)
                } 
                else {
                    res.send(err);
                }
            })
        } 
        else {
            res.send(err);
        }
    })
})

app.post('/api/upload', (req, res, next) => {
    console.log('/api/upload');
    console.log(req);
    console.log(req.file);
    console.log(req.addtime);
    
    upload(req, res, function(err) {
        if (err instanceof multer.MulterError) {
          return next(err);
        } else if (err) {
          return next(err);
        }
        console.log('원본파일명 : ' + req.file.originalname)
        console.log('등록시간 : ' + req.addtime)
        console.log('저장파일명 : ' + req.file.filename)
        console.log('크기 : ' + req.file.size)
        return res.json({success:1,savefile:req.file.filename});
      });
})

  app.get('/download/:fileName', function(req, res){
    console.log('/download/:fileName')
    console.log(req.params.fileName)
    const fileName=req.params.fileName
    
    const file = `${__dirname}\\uploads\\${fileName}`;
    console.log(file)

    var mimetype = mime.lookup(file);
    console.log(mimetype)

    res.setHeader('Content-Disposition', 'attachment; filename=' + fileName);
    res.setHeader('Content-Type', mimetype);

    res.download(file); // Set disposition and send it.
  });
  
app.get('/delete/:fileName', (req, res) => {
    console.log('/delete/:fileName')
    console.log(req.params.fileName)
    const fileName=req.params.fileName
})

app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})

