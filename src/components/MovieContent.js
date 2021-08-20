import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card, 
  CardContent, 
  CardActions,
  CardHeader,
  Button,
  Typography,
  Grid,
  Avatar,
   } from '@material-ui/core';
import MovieIcon from '@material-ui/icons/Movie';

const useStyles = makeStyles({
  root: {
    margin: '10px',
    width: '250px',
    height: '250px'
  },
});


const MovieContent = (props) => {
  const { id, movie_name, movie_review, updated_at, } = props.data;
  const { handleDelete, handleUpdate } = props;
  const classes = useStyles();
  var date = new Date(updated_at);
  return (
    <Card className={classes.root}>
      <CardContent>
      <CardHeader
       avatar={
        <Avatar aria-label="recipe" className={classes.avatar}>
          <MovieIcon color="primary"/>
        </Avatar>
      }
        title={movie_name}
        subheader={date.toGMTString()}
      />
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <Typography variant='body2' component='p' gutterBottom>Movie Review: {movie_review}</Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
      <Button size="small" color="primary" variant="contained" onClick={()=>handleUpdate(props.data)}>Update</Button>
      <Button size="small" color="secondary" variant="contained" onClick={()=>handleDelete(id)} >Delete</Button>
      </CardActions>
    </Card>
  );
}

export default MovieContent;