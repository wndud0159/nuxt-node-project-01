const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { article, user, company, board, comment, reply } = require("./router");
const app = express();
const PORT = 8080;
const SECRET = "@!FJADFK@###@FJKSDF";

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

// 상태 확인용
app.get("/", (req, res) => {
    res.send("Server in Running");
});

app.listen(PORT, "localhost", () => {
    console.log(`App listening at http://localhost:${PORT}`);
});
