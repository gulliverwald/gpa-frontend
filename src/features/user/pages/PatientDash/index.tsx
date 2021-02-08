import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { MdNotificationsActive } from 'react-icons/md';
import { IoMdCalendar, IoMdPaper } from 'react-icons/io';
import EatingPlan from './EatingPlan';
import NewsInfo from './NewsInfo';
import PreScheduling from './PreScheduling';
import CardPatient from '../../../../components/CardPatient';
import PatientSidebar from '../../../../components/PatientSidebar';
import NewsFeed from '../../../../components/NewsFeed';
import api from '../../../../services/api';

import {
  Container, MenuContainer, TipContainer, ContentContainer, useStyles,
} from './styles';

interface PatientProps {
  nome: string;
}

interface TipProps {
  conteudo: string;
}

const PatientDash: React.FC = () => {
  const [patient, setPatient] = useState<PatientProps>();
  const [tip, setTip] = useState<TipProps>();
  // const userId = useSelector((store: WebStore) => store.user.state.user.userId);
  const classes = useStyles();
  const userId = '1';

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTIzNzc1NDAsImV4cCI6MTYxMjQ2Mzk0MCwic3ViIjoiNSJ9.NK07DkXlo6rli6XWYrOLDC84uz5-dO0vhdpervmwGdA';
  const config = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    async function handlePatient(): Promise<void> {
      const response = await api.get(`/Users/${userId}`, config);
      setPatient(response.data);
    }
    handlePatient();
  }, [patient]);

  useEffect(() => {
    async function handleTip(): Promise<void> {
      const response = await api.get('/Tip', config);
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
            <CardPatient Icon={IoMdPaper} message="Plano Alimentar" />
            <CardPatient Icon={IoMdCalendar} message="Pré-agendar Consulta" />
          </MenuContainer>
          <NewsFeed />
        </ContentContainer>
      </Container>
      <Switch>
        <Route path="/newsInfo" exact component={NewsInfo} />
        <Route path="/eatingPlan" exact component={EatingPlan} />
        <Route path="/preScheduling" exact component={PreScheduling} />
      </Switch>
    </>
  );
};

export default PatientDash;
