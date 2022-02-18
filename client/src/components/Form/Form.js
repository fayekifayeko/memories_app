import React from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';

import useStyles from './styles';

const Form = () => { 
    const classes = useStyles();
    
  return (
 <Paper className={classes.paper}>
 <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
   <Typography variant="h6">{currentId ? `Editing "${post.title}"` : 'Creating a Memory'}</Typography>
   <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
 </form>
</Paper>
  );
};

export default Form;
