import { FETCH_POSTS, NEW_POST } from "./types";
import axios from "axios";
const back_end_api = "api/index";

export const fetchPosts = () => dispatch => {
  axios
    .get('http://localhost:8080/index')
    .then(res => {
      return dispatch({
        type: FETCH_POSTS,
        payload: res.data
      })
    })
    .catch(error => {
      // handle error
      console.log(error);
    });
};

export const createPost = user => dispatch => {
  axios
    .post(`/weather`, { user })
    .then(res =>
      dispatch({
        type: NEW_POST,
        payload: res.data
      })
    )
    .catch(error => {
      // handle error
      console.log(error, { err: error });
    });
};
