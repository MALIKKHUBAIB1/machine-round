import { data } from "autoprefixer";
import React, { useEffect, useState } from "react";

function ListComment({ comments, replyHandler, onDeleteHnadler }) {
  return (
    <div className="mx-5 text-yellow-500 space-y-3">
      {comments &&
        comments.map((comment, index) => (
          <div
            key={comment.id}
            className="ml-5 p-3 border-b border-gray-600 rounded-lg bg-gray-800/50"
          >
            <div className="">
              <h2 className="text-lg font-semibold">{comment.value}</h2>
              <button
                className="border border-white p-2 w-24 rounded-md"
                onClick={() => replyHandler(comment.id)}
              >
                reply
              </button>
              <button
                className="border border-white p-2 w-24 rounded-md"
                onClick={() => onDeleteHnadler(comment.id)}
              >
                Delete
              </button>
            </div>
            <div className="ml-5 mt-2 pl-3 border-l-2 border-gray-600 bg-gray-900/50 rounded-lg">
              {comment.repley && comment.repley.length > 0 && (
                <ListComment
                  comments={comment.repley}
                  replyHandler={replyHandler}
                  onDeleteHnadler={onDeleteHnadler}
                />
              )}
            </div>
          </div>
        ))}
    </div>
  );
}

const comment = [
  {
    id: 1,
    value: "hello",
    user: "max",
    repley: [
      {
        id: 2,
        value: "my ",
        user: "jhon",
        repley: [
          {
            id: Math.ceil(Date.now() * Math.random()),
            value: " name ",
            user: "jhon",
            repley: [],
          },
          {
            id: Date.now(),
            value: "scwarmullad maual ",
            user: "jhon",
            repley: [],
          },
        ],
      },
      { id: 3, value: "jjsnd klsadlk", user: "Doe", repley: [] },
      { id: 4, value: "jjsnd klslk", user: "Doe", repley: [] },
    ],
  },
  { id: 5, value: "jjsnd asdn jjjj ", user: "Max", repley: [] },
  { id: 6, value: "jjsnd klsadlk mmm", user: "kaha ", repley: [] },
];

function CommentSection() {
  const [inputValue, setInputValue] = useState("");
  const [comments, setSeComments] = useState(comment);

  useEffect(() => {
    document.body.style.background = "black";
  }, []);
  function onDeleteHnadler(id) {
    function deleteComment(comments) {
      return comments
        .filter((comment) => comment.id !== id)
        .map((comment) => ({
          ...comment,
          repley: comment.repley ? deleteComment(comment.repley) : [],
        }));
    }
    const data = deleteComment(comments);
    console.log(data);
    setSeComments(data);
  }
  function replyHandler(id) {
    function addCommentHandler(comments) {
      const data = comments.map((comment) => {
        if (comment.id === id) {
          return {
            ...comment,
            repley: [
              ...comment.repley,
              {
                id: Date.now(),
                value: "something is working fine",
                user: "max millian ",
                repley: [],
              },
            ],
          };
        } else if (comment.repley && comment.repley.length > 0) {
          return { ...comment, repley: addCommentHandler(comment.repley) };
        }
        return comment;
      });
      return data;
    }
    const data = addCommentHandler(comments);
    setSeComments(data);
  }
  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <ListComment
        comments={comments}
        replyHandler={replyHandler}
        onDeleteHnadler={onDeleteHnadler}
      />
    </div>
  );
}

export default CommentSection;
