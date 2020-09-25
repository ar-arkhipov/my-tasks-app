import {useEffect, useState} from 'react';

const useDebouncedValue = function(val, delay) {
  const [value, setValue] = useState(val);

  useEffect(() => {
    const timer = setTimeout(() => setValue(val), delay);

    return () => clearTimeout(timer);
  }, [val, delay]);

  return value;
};

export default useDebouncedValue;
