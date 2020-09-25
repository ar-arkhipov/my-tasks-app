import React from 'react';
import MtBoard from './components/MtBoard';
import MtTopBar from './components/MtTopBar';
import MtCardViewDialog from './components/MtCardViewDialog/MtCardViewDialog';
import {preloadExample} from './helpers/storage';

function App() {
  const handleClick = () => {
    preloadExample();
    document.location.reload();
  };

  return (
    <div className="App">
      <MtTopBar />
      <MtBoard />
      <MtCardViewDialog />

      {/*The below button is for resetting to the example state. Just for testing :) */}
      <button style={{position: 'absolute', bottom: 0, right: 0, opacity: 0.2}} onClick={handleClick}>reset to example</button>
    </div>
  );
}

export default App;
