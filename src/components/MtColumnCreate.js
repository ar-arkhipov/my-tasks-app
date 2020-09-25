import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Input from '@material-ui/core/Input';

const MtColumnCreate = ({ onCreate }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState('');

  const handleClick = () => {
    setEditing(true);
    setTitle('');
  };

  const handleClickAway = () => {
    setEditing(false);
  };

  const handleChange = (evt) => {
    setTitle(evt.target.value.trim());
  };

  const handleKeyDown = (evt) => {
    if (evt.keyCode === 13) {
      setEditing(false);
      title.length > 0 && onCreate(title);
    }
  };

  return (
    <div >
      {!editing && <Button
        variant="outlined"
        onClick={handleClick}
        disableFocusRipple
      >
        Add Column
      </Button> }
      {editing &&
        <ClickAwayListener onClickAway={handleClickAway}>
          <Input
            placeholder="Type title and hit Enter"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            autoFocus
            disableUnderline
          />
        </ClickAwayListener>
      }
    </div>
  )
};

export default MtColumnCreate;
