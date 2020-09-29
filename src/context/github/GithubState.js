import React, { useReducer } from 'react';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
} from '../types';

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  const searchUsers = async (text) => {
    setLoading();
    const response = await fetch(
      `https://api.github.com/search/users?q=${text}`
    );
    const data = await response.json();

    dispatch({
      type: SEARCH_USERS,
      payload: data.items,
    });
  };

  const getUser = async (username) => {
    setLoading();
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();

    dispatch({
      type: GET_USER,
      payload: data,
    });
  };

  const getUserRepos = async (username) => {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`
    );
    const data = await response.json();

    dispatch({
      type: GET_REPOS,
      payload: data,
    });
  };

  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
