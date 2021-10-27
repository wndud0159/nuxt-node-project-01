const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { Article, Comment } = require("../mongoose/model");

// 개별 게시글 가져오는 라우트
router.get("/article/:id", async (req, res) => {
    const { id } = req.params;
    const article = await Article.findById(id);
    const comment = await Comment.find({ article: id });
    res.send({ article, comment });
});

// 게시글 추가
router.post("/article/create", async (req, res) => {
    const { title, content, board, image } = req.body;
    const { authorization } = req.headers;

    if (!authorization) {
        return res.send({
            error: true,
            msg: "토큰이 존재하지 않음",
        });
    }
    const token = authorization.split(" ")[1];
    const secret = req.app.get("jwt-secret");

    jwt.verify(token, secret, async (err, data) => {
        if (err) {
            return res.send(err);
        }
        const payload = { author: data.id, title, content, board, articleImgAddress: image };
        const newArticle = await Article(payload).save();

        res.send(newArticle);
    });
});

// 댓글 수정하기
router.patch("/article/update", async (req, res) => {
    const { id, author, content } = req.body;
    const updateArticle = await Article.findOneAndUpdate(
        {
            _id: id,
            author,
        },
        {
            content,
        },
        {
            new: true,
        }
    );
    res.send(updateArticle);
});

// 게시글 삭제(HARD DELETE : db에도 존재하지 않게)
router.delete("/article/delete/hard", async (req, res) => {
    const { id, author } = req.body;
    const deleteArticle = await Article.deleteOne({
        _id: id,
        author,
    });
    res.send(deleteArticle);
});

// 게시글 삭제(SOFT DELETE : 일반 사용자는 보지 못하는 상태, 일정 기간이 지나면 삭제될 상태)
router.delete("/article/delete/soft", async (req, res) => {
    const { id, author } = req.body;
    const deleteArticle = await Article.findOneAndUpdate(
        {
            _id: id,
            author,
        },
        {
            deleteTime: new Date().getTime() + 30 * 24 * 60 * 60 * 1000, // 30일 후의 시간에 삭제
        }
    );
    res.send(deleteArticle);
});

module.exports = router;
