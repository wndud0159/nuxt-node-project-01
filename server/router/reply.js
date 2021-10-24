const express = require("express");
const router = express.Router();
const { Article, Comment, Board, Reply } = require("../mongoose/model");

// 대댓글 생성하기
router.post("/reply/create", async (req, res) => {
    const { author, comment, content } = req.body;
    const newReply = await Reply({
        author,
        comment,
        content,
    }).save();

    res.send(newReply._id ? true : false);
});

// 대댓글 수정하기
router.patch("/reply/update", async (req, res) => {
    const { id, author, content } = req.body;
    const updateReply = await Reply.findOneAndUpdate(
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
    res.send(updateReply);
});

// 대댓글 삭제(HARD DELETE : db에도 존재하지 않게)
router.delete("/reply/delete/hard", async (req, res) => {
    const { id, author } = req.body;
    const deleteReply = await Reply.deleteOne({
        _id: id,
        author,
    });
    res.send(deleteReply);
});

// 대댓글 삭제(SOFT DELETE : 일반 사용자는 보지 못하는 상태, 일정 기간이 지나면 삭제될 상태)
router.delete("/reply/delete/soft", async (req, res) => {
    const { id, author } = req.body;
    const deleteReply = await Reply.findOneAndUpdate(
        {
            _id: id,
            author,
        },
        {
            deleteTime: new Date().getTime() + 30 * 24 * 60 * 60 * 1000, // 30일 후의 시간에 삭제
        }
    );
    res.send(deleteReply);
});

module.exports = router;
