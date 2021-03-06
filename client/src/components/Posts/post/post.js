import React, { useState } from "react";
import useStyles from "./styles.js";
import {
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Typography,
  ButtonBase,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import { useHistory } from "react-router-dom";

const Post = ({ post, setCurrentPostId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem("profile"));
  const [likes, setLikes] = useState(post?.likes); // improve like&unlike performance instead of waiting for api resp
  const userId = user?.profile?.googleId || user?.profile?._id;

  const hasUserLiked = post.likes.find((item) => item === userId);
  const handleLike = () => {
    dispatch(likePost(post._id));
    if (hasUserLiked) {
      setLikes(post.likes.filter((item) => item !== userId));
    } else {
      setLikes([...likes, user.profile._id]);
    }
  };
  const Likes = () => {
    if (likes?.length > 0) {
      return hasUserLiked ? (
        <>
          <ThumbUpAltIcon fontSize="small" /> &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  const openPostDetails = () => {
    history.push(`/posts/${post._id}`);
  };

  return (
    <Card className={classes.card} elevation={6}>
      <ButtonBase onClick={openPostDetails} className={classes.cardActions}>
        <CardMedia
          className={classes.media}
          image={post.selectedFile}
          title={post.title}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        {post.creator === (user?.profile?._id || user?.profile?.googleId) && (
          <div className={classes.overlay2}>
            <Button
              style={{ color: "white" }}
              size="small"
              onClick={() => {
                setCurrentPostId(post._id);
              }}
            >
              <MoreHorizIcon fontSize="default" />
            </Button>
          </div>
        )}
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography
          className={classes.title}
          gutterBottom
          variant="h5"
          component="h2"
        >
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.message}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button
          disabled={!user?.profile}
          size="small"
          color="primary"
          /*  onClick={() => {
            dispatch(likePost(post._id));
          }} */

          onClick={handleLike}
        >
          <Likes />
        </Button>
        {post.creator === (user?.profile?._id || user?.profile?.googleId) && (
          <Button
            size="small"
            color="primary"
            onClick={() => dispatch(deletePost(post._id))}
          >
            <DeleteIcon fontSize="small" /> Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
