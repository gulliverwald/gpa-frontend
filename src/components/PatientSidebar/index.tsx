/* eslint-disable react/prop-types */
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { MdPerson, MdSettings } from 'react-icons/md';
import { IoMdExit } from 'react-icons/io';
import { requestLogout } from '../../features/user/redux/reducers/userReducer';
import {
  RootContainer, MenuContainer, OptionsContainer, OptionsItem, useStyles,
} from './styles';
import ImgGPA from '../../assets/img/logo.png';

interface PatientSidebarProps {
  name: string;
}

const PatientSidebar: React.FC<PatientSidebarProps> = ({ name }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleLogout = useCallback(
    () => { dispatch(requestLogout()); },
    [dispatch],
  );

  return (
    <>
      <RootContainer>
        <div className={classes.imageContainer}>
          <img src={ImgGPA} alt="Logo GPA" className={classes.imageGPA} />
        </div>
        <MenuContainer>
          <div className={classes.userMenuContainer}>
            <MdPerson />
            <p>{name}</p>
          </div>
          <OptionsContainer>
            <OptionsItem>
              <MdSettings size={28} />
              <p>Configurações</p>
            </OptionsItem>
            <OptionsItem onClickCapture={handleLogout}>
              <IoMdExit color="red" size={28} />
              <p style={{ color: 'red' }}>Sair</p>
            </OptionsItem>
          </OptionsContainer>
        </MenuContainer>
      </RootContainer>
    </>
  );
};

export default PatientSidebar;
