import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import { setSearch } from '../store/slices/cards.slice';
import useDebouncedValue from '../helpers/useDebouncedValue';

const useStyles = makeStyles({
  appbar: {
    backgroundColor: 'rgba(69, 69, 69, 0.35)',
    padding: '0 15px',
  },
  search: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: '2px 5px 2px 5px',
    borderRadius: 5,
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,0.1)',
    }
  },
  searchIcon: {
    paddingTop: 4,
    marginRight: 5,
  },
  searchInput: {
    color: '#ffffff',
  }
});

const MtTopBar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [text, setText] = useState('');
  const debouncedText = useDebouncedValue(text, 200);

  useEffect(() => {
    dispatch(setSearch(debouncedText));
  }, [dispatch, debouncedText]);

  const handleChange = (evt) => {
    setText(evt.target.value.toLowerCase().trim());
  };

  return (
    <AppBar position="fixed" className={classes.appbar}>
      <Toolbar variant="dense" style={{padding: 0}}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <Input
            className={classes.searchInput}
            placeholder="Search cards..."
            onChange={handleChange}
            disableUnderline
          />
        </div>
      </Toolbar>
    </AppBar>
  )
};

export default MtTopBar;
