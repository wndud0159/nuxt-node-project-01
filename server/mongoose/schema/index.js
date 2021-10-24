// 사용자가 작성한 게시글
const Article = require("./article");
// 각각의 게시판
const Board = require("./board");
// 게시글 안에 있는 댓글
const Comment = require("./comment");
// 회사 정보
const Company = require("./Company");
// 게시글 안에 있는 댓글의 댓글
const Reply = require("./reply");
// 사용자 정보
const User = require("./user");

module.exports = {
    Article,
    Board,
    Comment,
    Company,
    Reply,
    User,
};
