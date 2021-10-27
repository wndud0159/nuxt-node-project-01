const AWS = require("aws-sdk");
const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const { article, user, company, board, comment, reply } = require("./router");
const app = express();
const PORT = 8080;
const SECRET = "@!FJADFK@###@FJKSDF";

AWS.config.update({
    accessKeyId: "null",
    secretAccessKey: "null",
});

const s3 = new AWS.S3();

const morganFormat = process.env.NODE_ENV !== "production" ? "dev" : "combined";

app.use(morgan({ format: morganFormat }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extends: true }));

// JWT 시크릿 설정
app.set("jwt-secret", SECRET);

// 기능별 라우트 추가
app.use(article);
app.use(board);
app.use(comment);
app.use(company);
app.use(reply);
app.use(user);

app.use(formidable());

// 상태 확인용
app.get("/", (req, res) => {
    res.send("Server in Running");
});

// 파일 업로드
app.post("/upload", (req, res) => {
    if (!req.files) {
        return res.send(false);
    }
    const raw = req.files.file;
    const buffer = fs.readFileSync(raw.path);
    const fileName = new Date().getTime() + raw.name;
    const params = {
        Body: buffer,
        Bucket: "s3bucketname",
        Key: fileName,
        ACL: "public-read",
    };
    s3.putObject(params, (err, data) => {
        if (err) {
            return res.send({ error: true, data: null, msg: "S3 에러" });
        }
        console.log(data);
        res.send({
            error: false,
            key: fileName,
            msg: "성공",
        });
    });
});

app.listen(PORT, "localhost", () => {
    console.log(`App listening at http://localhost:${PORT}`);
});
