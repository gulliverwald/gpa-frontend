import React from 'react';

import { useSelector } from 'react-redux';
import { IStore } from '../../../store/Store';

const pages: React.FC = () => {
  const user = useSelector((state: IStore) => state.user.user);
  return (
    <div>
      {user}
    </div>
  );
};

export default pages;
