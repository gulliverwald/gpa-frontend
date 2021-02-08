/* eslint-disable react/prop-types */
import React from 'react';
import { MdPerson, MdSettings } from 'react-icons/md';
import { IoMdExit } from 'react-icons/io';
import {
  RootContainer, MenuContainer, OptionsContainer, OptionsItem, useStyles,
} from './styles';
import ImgGPA from '../../assets/img/logo.png';

interface PatientSidebarProps {
  name: string;
}

const PatientSidebar: React.FC<PatientSidebarProps> = ({ name }) => {
  const classes = useStyles();

  return (
    <>
      <RootContainer>
        <div className={classes.imageContainer}>
          <img src={ImgGPA} alt="Logo GPA" className={classes.imageGPA} />
        </div>
        <MenuContainer>
          <div className={classes.userMenuContainer}>
            <MdPerson />
            {name}
          </div>
          <OptionsContainer>
            <OptionsItem>
              <MdSettings size={28} />
              <p>Configurações</p>
            </OptionsItem>
            <OptionsItem>
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
