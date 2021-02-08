import React, { useEffect, useState } from 'react';
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

interface PatientProps {
  nome: string;
}

interface TipProps {
  conteudo: string;
}

const Homepage: React.FC = () => {
  const [patient, setPatient] = useState<PatientProps>();
  const [tip, setTip] = useState<TipProps>();
  const userId = useSelector((store: WebStore) => store.user.state.userInfo.user.id);
  const classes = useStyles();

  useEffect(() => {
    async function handlePatient(): Promise<void> {
      const response = await api.get(`/Users/${userId}`);
      setPatient(response.data);
    }
    handlePatient();
  }, [patient]);

  useEffect(() => {
    async function handleTip(): Promise<void> {
      const response = await api.get('/Tip');
      setTip(response.data[0]);
    }
    handleTip();
  }, [tip]);

  return (
    <>
      <Container>
        <PatientSidebar name={`${patient?.nome}`} />
        <ContentContainer>
          <MenuContainer>
            <TipContainer>
              <MdNotificationsActive size={60} color="#FDCB6E" />
              <div className={classes.tipContentContainer}>
                <h3><b>Dica:</b></h3>
                <p>
                  {`"${tip?.conteudo}"`}
                </p>
              </div>
            </TipContainer>
            <NavLink to="/dashboard/eatingPlan">
              <CardPatient Icon={IoMdPaper} message="Plano Alimentar" />
            </NavLink>
            <CardPatient Icon={IoMdCalendar} message="Pré-agendar Consulta" />
          </MenuContainer>
          <NewsFeed />
        </ContentContainer>
      </Container>
    </>
  );
};

export default Homepage;
