import { Button, TextField, Typography } from "@material-ui/core";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import { postComment } from "../../actions/posts";

const CommentsSection = ({ post }) => {
  const classes = useStyles();
  const [comments, setComments] = useState(post.comments);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const commentsRef = useRef();

  const handleClick = async () => {
    const name = user?.profile?.name;
    const newComments = await dispatch(
      postComment(`${name}: ${comment}`, post._id)
    ); // could be done by fetchPost{id} or fetchPosts in the upper components
    setComments(newComments);
    setComment("");
    // @ts-ignore
    commentsRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ display: "flex" }}>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {comments?.map((c, i) => (
            <Typography key={i} gutterBottom variant="subtitle1">
              <strong>{c.split(": ")[0]}</strong>
              {c.split(":")[1]}
            </Typography>
          ))}
          <div ref={commentsRef} />
        </div>
      </div>
      {user?.profile && (
        <div style={{ width: "70%" }}>
          <Typography gutterBottom variant="h6">
            Write a comment
          </Typography>
          <TextField
            multiline
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            fullWidth
            label="Comment"
            variant="outlined"
          />
          <Button
            style={{ marginTop: "10px" }}
            color="primary"
            fullWidth
            disabled={!comment}
            onClick={handleClick}
            variant="contained"
          >
            Comment
          </Button>
        </div>
      )}
    </div>
  );
};

export default CommentsSection;
