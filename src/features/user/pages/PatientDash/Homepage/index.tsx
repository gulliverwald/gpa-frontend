import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { MdNotificationsActive } from 'react-icons/md';
import { IoMdCalendar, IoMdPaper } from 'react-icons/io';
import CardPatient from '../../../../../components/CardPatient';
import PatientSidebar from '../../../../../components/PatientSidebar';
import NewsFeed from '../../../../../components/NewsFeed';

import { WebStore } from '../../../../../store/RootReducer';
import api from '../../../../../services/api';

import {
  Container, MenuContainer, TipContainer, ContentContainer, useStyles,
} from './styles';

interface TipProps {
  content: string;
}

const Homepage: React.FC = () => {
  const classes = useStyles();
  const [tips, setTips] = useState<TipProps>();

  const user = useSelector((store: WebStore) => store.user.state.userInfo.user);

  useEffect(
    () => {
      async function handleTips(): Promise<void> {
        const response = await api.get('/Tip');
        setTips(response.data.slice(-1)[0]);
      }
      handleTips();
    },
    [],
  );

  return (
    <>
      <Container>
        <PatientSidebar name={`${user.name}`} />
        <ContentContainer>
          <MenuContainer>
            <TipContainer>
              <MdNotificationsActive size={60} color="#FDCB6E" />
              <div className={classes.tipContentContainer}>
                <h3><b>Dica:</b></h3>
                <p>
                  {`"${tips?.content}"`}
                </p>
              </div>
            </TipContainer>
            <NavLink to="/dashboard/eatingPlan" className={classes.cardLink}>
              <CardPatient Icon={IoMdPaper} message="Plano Alimentar" />
            </NavLink>
            <NavLink to="/dashboard/preSchedule" className={classes.cardLink}>
              <CardPatient Icon={IoMdCalendar} message="Pré-agendar Consulta" />
            </NavLink>
          </MenuContainer>
          <NewsFeed />
        </ContentContainer>
      </Container>
    </>
  );
};

export default Homepage;
