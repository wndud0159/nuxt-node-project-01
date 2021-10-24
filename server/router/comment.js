const express = require("express");
const router = express.Router();
const { Article, Comment, Board } = require("../mongoose/model");

// 댓글 생성하기
router.post("/comment/create", async (req, res) => {
    const { author, article, content } = req.body;
    const newComment = await Comment({
        author,
        article,
        content,
    }).save();

    res.send(newComment._id ? true : false);
});

// 댓글 수정하기
router.patch("/comment/update", async (req, res) => {
    const { id, author, content } = req.body;
    const updateComment = await Comment.findOneAndUpdate(
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
    res.send(updateComment);
});

// 댓글 삭제(HARD DELETE)
router.delete("/comment/delete/hard", async (req, res) => {
    const { id, author } = req.body;
    const deleteComment = await Comment.deleteOne({
        _id: id,
        author,
    });
    res.send(deleteComment);
});

// 댓글 삭제(SOFT DELETE : 일반 사용자는 보지 못하는 상태, 일정 기간이 지나면 삭제될 상태)
router.delete("/comment/delete/soft", async (req, res) => {
    const { id, author } = req.body;
    const deleteComment = await Reply.findOneAndUpdate(
        {
            _id: id,
            author,
        },
        {
            deleteTime: new Date().getTime() + 30 * 24 * 60 * 60 * 1000, // 30일 후의 시간에 삭제
        }
    );
    res.send(deleteComment);
});

module.exports = router;
