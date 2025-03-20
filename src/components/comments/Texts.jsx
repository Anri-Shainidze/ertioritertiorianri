import { useState } from "react";
import logo from "../../assets/Oval.png";
import logo1 from "../../assets/Oval1.png";
import logo2 from "../../assets/Oval2.png";
import logo3 from "../../assets/Oval3.png";
import { FaReply } from "react-icons/fa";

const Texts = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "amyrobson",
      avatar: logo,
      timeAgo: "1 month ago",
      content:
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      score: 0,
      isCurrentUser: false,
      replies: [],
    },
    {
      id: 2,
      user: "maxblagun",
      avatar: logo1,
      timeAgo: "2 weeks ago",
      content:
        "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me some tips?",
      score: 0,
      isCurrentUser: false,
      replies: [
        {
          id: 3,
          user: "ramsesmiron",
          avatar: logo2,
          timeAgo: "1 week ago",
          content:
            "@maxblagun If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React.",
          score: 0,
          isCurrentUser: false,
        },
        {
          id: 4,
          user: "juliusomo",
          avatar: logo3,
          timeAgo: "2 days ago",
          content:
            "@ramsesmiron I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
          score: 0,
          isCurrentUser: true,
        },
      ],
    },
  ]);

  const [newComment, setNewComment] = useState("");

  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState("");


  const handleVote = (commentId, replyId, increment) => {
    setComments((prevComments) => {
      return prevComments.map((comment) => {
        if (replyId === null && comment.id === commentId) {
          return { ...comment, score: comment.score + increment };
        }
        if (replyId !== null && comment.id === commentId) {
          const updatedReplies = comment.replies.map((reply) => {
            if (reply.id === replyId) {
              return { ...reply, score: reply.score + increment };
            }
            return reply;
          });
          return { ...comment, replies: updatedReplies };
        }

        return comment;
      });
    });
  };

  const addComment = () => {
    if (newComment.trim() === "") return;

    const newCommentObj = {
      id: Date.now(),
      user: "juliusomo",
      avatar: logo3,
      timeAgo: "Just now",
      content: newComment,
      score: 0,
      isCurrentUser: true,
      replies: [],
    };

    setComments((prevComments) => [...prevComments, newCommentObj]);
    setNewComment("");
  };

  const toggleReply = (commentId) => {
    if (replyingTo === commentId) {
      setReplyingTo(null);
    } else {
      setReplyingTo(commentId);
      setReplyContent("");
    }
  };


  const addReply = (commentId, replyToUser) => {
    if (replyContent.trim() === "") return;

    const newReply = {
      id: Date.now(),
      user: "juliusomo",
      avatar: logo3,
      timeAgo: "Just now",
      content: `@${replyToUser} ${replyContent}`,
      score: 0,
      isCurrentUser: true,
    };

    setComments((prevComments) => {
      return prevComments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [...comment.replies, newReply],
          };
        }
        return comment;
      });
    });

    setReplyingTo(null);
    setReplyContent("");
  };

  return (
    <div className="erti">
      {comments.map((comment) => (
        <div key={comment.id}>
          <div className="comments">
            <div className="img">
              <img src={comment.avatar} alt="" />
              <p className="users">{comment.user}</p>
              {comment.isCurrentUser && <button id="user">you</button>}
              <span>{comment.timeAgo}</span>
            </div>
            <div className="first-line">
              <p>{comment.content}</p>
            </div>
            <div className="forreply">
              <div className="button">
                <h5 onClick={() => handleVote(comment.id, null, 1)}>+</h5>
                <h6>{comment.score}</h6>
                <h5 onClick={() => handleVote(comment.id, null, -1)}>-</h5>
              </div>
              <div className="forreaplyy" onClick={() => toggleReply(comment.id)}>
                <FaReply />
                <h6>Reply</h6>
              </div>
            </div>
          </div>

          {/* Reply input field */}
          {replyingTo === comment.id && (
            <div className="input-line">
              <input
                type="text"
                placeholder={`Reply to @${comment.user}...`}
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
              />
              <div className="images-line">
                <img src={logo3} alt="" />
                <button
                  id="send"
                  onClick={() => addReply(comment.id, comment.user)}
                >
                  REPLY
                </button>
              </div>
            </div>
          )}

          {/* Render replies */}
          {comment.replies.length > 0 && (
            <div
              style={{
                marginLeft: "2rem",
                borderLeft: "2px solid rgba(233, 235, 240, 1)",
                paddingLeft: "1rem",
                marginTop:"1rem",
                marginBottom:"1rem"
              }}
            >
              {comment.replies.map((reply) => (
                <div key={reply.id} className="coment">
                  <div className="image">
                    <img src={reply.avatar} alt="" />
                    <p className="user">{reply.user}</p>
                    {reply.isCurrentUser && <button id="users">you</button>}
                    <span>{reply.timeAgo}</span>
                  </div>
                  <div className="text-line">
                    <p>{reply.content}</p>
                  </div>
                  <div className="reply">
                    <div className="button">
                      <h5 onClick={() => handleVote(comment.id, reply.id, 1)}>
                        +
                      </h5>
                      <h6>{reply.score}</h6>
                      <h5 onClick={() => handleVote(comment.id, reply.id, -1)}>
                        -
                      </h5>
                    </div>
                    <div
                      className="reply1"
                      onClick={() => toggleReply(reply.id)}
                    >
                      <FaReply id="baba"/>
                      <h6>Reply</h6>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* New comment input */}
      <div className="input-line">
        <input
          type="text"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <div className="images-line">
          <img src={logo3} alt="" />
          <button id="send" onClick={addComment}>
            SEND
          </button>
        </div>
      </div>
    </div>
  );
};

export default Texts;
