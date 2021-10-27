const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { Article, Comment, Board } = require("../mongoose/model");

// 메인에서 여러 게시판 글을 모아서 보여주는 라우트
router.get("/main", async (req, res) => {
    const board = await Board.find();
    if (!Array.isArray(board)) {
        return res.send({
            error: true,
            msg: "게시글을 발견할 수 없습니다",
        });
    }

    let mainContent = [];
    Promise.all(
        board.map(async (b) => {
            const recentArticles = await Article.find({ board: b._id });
            if (!Array.isArray(recentArticles)) {
                return false;
            }
            mainContent.push({
                ...b._doc,
                content: recentArticles,
            });
            // mainContent[b.slug] = recentArticles;
            return;
        })
    )
        .then((response) => {
            // const content = Object.keys(mainContent).map((v) => {
            //     return {
            //         slug: v,
            //         content: mainContent[v],
            //     };
            // });
            res.send({
                // content: mainContent,
                content: mainContent,
                error: false,
                msg: "성공",
            });
        })
        .catch((error) => {
            console.error(error);
            return res.send({
                content: null,
                error: true,
                msg: "서버에러",
            });
        });
});

// 게시판 목록을 불러온다
router.get("/board/list", async (req, res) => {
    const board = await Board.find();
    res.send(board);
});

// 게시판별 게시글 가져오는 라우트
router.get("/board/:slug", async (req, res) => {
    const { slug } = req.params;
    const { lastIndex } = req.query; // 무한 스크롤 구현시 사용할 부분

    const board = await Board.findOne({
        slug,
    });
    console.log("board check : ", board);
    if (!board._id) {
        return res.send({
            article: [],
            error: true,
            msg: "존재하지 않는 게시판",
        });
    }

    const article = await Article.find({
        board: board._id,
    });

    res.send({
        article,
        error: false,
        msg: "성공",
    });
});

// 관리자: 게시판 추가
router.post("/board/create", async (req, res) => {
    const { title, slug } = req.body;
    const newBoard = await Board({
        title,
        slug,
    }).save();

    res.send(newBoard._id ? true : false);
});

module.exports = router;
