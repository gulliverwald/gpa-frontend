import React from 'react';
import PatientAppbar from '../../../../components/PatientAppbar';
import { Container, BoxContainer } from './styles';

const EatingPlan: React.FC = () => (
  <>
    <PatientAppbar />
    <Container>
      <BoxContainer>
        {/* <p>PLANO ALIMENTAR</p> */}
      </BoxContainer>
    </Container>
  </>
);

export default EatingPlan;
