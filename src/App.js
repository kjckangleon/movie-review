import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import './App.css';

import { makeStyles } from '@material-ui/core/styles';
import { 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  Typography,
  CardActions,
  FormControl,
  FormHelperText,
  Input,
  InputLabel
 } from '@material-ui/core';
import MovieContent from './components/MovieContent';

 const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  movieContentContainer: {
    height: '300px',
    overflow: 'scroll',
    overflowY: 'hidden',
  }
});

function App() {
  const apiUrl = (queryName) => `http://localhost:3001/api/${queryName}`;
  const classes = useStyles();
  const intialState = {
    id: '',
    movie_name: '',
    movie_review: '',
  };
  const [ { id, movie_name, movie_review}, setState ] = useState(intialState);
  const [ movieList, setMovieList ] = useState([]);
  const [ updateFlag, setUpdateFlag ] = useState(false);

  const handleOnChange = ({target}) => {
    const { name, value } = target;
    setState((prevState) => ({ ...prevState, [name]: value}));
  };

  const getAllMovies = () => {
    Axios.get(apiUrl('getAllMovies')).then((response) => {
      setMovieList(response.data);
    });
  };

  const clearState = () => {
    setState({ ...intialState });
  };

  const submitReview = () => {
        if (!updateFlag) {
      Axios.post(apiUrl('insert'), {
        movieName: movie_name,
        movieReview: movie_review,
      }).then((res) => {
        getAllMovies();
        clearState();
      });
    } else {
      Axios.post(apiUrl('update'), {
        movieName: movie_name,
        movieReview: movie_review,
        id: id,
      }).then((res) => {
        setUpdateFlag(false);
        getAllMovies();
        clearState();
      });
    }
  }

  const handleDelete = (id) => {
    Axios.delete(apiUrl(`${`delete/` + id}`), {
      id: id,
    }).then((res) => {
      console.log(res);
      getAllMovies();
      clearState();
    });
  }

  const handleUpdate = (val) => {
    let arr = [];
    setUpdateFlag(true);
    arr.push(val);
    setState(val);
    setMovieList(arr);
  }

  useEffect(getAllMovies, []);
  
  return (
    <div className="App">
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
      <Grid container item xs={3}>
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Movie Reviews
            </Typography>
            <form className={classes.root}>
              <FormControl>
                <InputLabel htmlFor="movie-name">Movie Name</InputLabel>
                <Input id="movie-name" aria-describedby="movie-helper-text" name="movie_name" value={movie_name} onChange={handleOnChange} />
                <FormHelperText id="movie-helper-text">Enter the movie you want to review</FormHelperText>
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="movie-review">Movie Review</InputLabel>
                <Input id="movie-review" aria-describedby="movie-review-helper-text" name="movie_review" value={movie_review} onChange={handleOnChange}/>
                <FormHelperText id="movie-review-helper-text">Enter your review for that movie</FormHelperText>
              </FormControl>
            </form>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" variant="contained" onClick={submitReview}>Submit</Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid 
        container
        item
        direction="column"
        alignItems="center"
        justifyContent="center"
        className={classes.movieContentContainer}
      >
        {
        movieList.map((val) => {
          return(
            <MovieContent 
            data={val} 
            key={val.id} 
            updateFlag={updateFlag}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
            />
            // <div className="form" key={val.id}>
            //   <h1>Movie Name: {updateFlag ? movie_name : val.movie_name}</h1>
            //   <h1>Review: {updateFlag ? movie_review : val.movie_review}</h1>
            //   {
            //     updateFlag ? 
            //       ''
            //       : 
            //       <Grid 
            //         container
            //         direction="column"
            //         justifyContent="center"
            //         alignItems="center"
            //         spacing={1}
            //         >
            //           <Grid item>
            //             <Button color="secondary" variant="contained" onClick={() => handleDelete(val)}>Delete</Button>
            //           </Grid>
            //           <Grid item>
            //             <Button color="primary" variant="contained" onClick={() => handleUpdate(val)}>{ updateFlag ? 'Save' : ' Update'}</Button>
            //           </Grid>
            //       </Grid>
              // }
            // </div> 
          ); 
        })
       }
      </Grid>   
    </Grid> 
  </div>
  );
}

export default App;
