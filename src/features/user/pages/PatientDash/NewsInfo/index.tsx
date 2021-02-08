import React from 'react';
// import { useParams } from 'react-router-dom';
import PatientAppbar from '../../../../../components/PatientAppbar';
import { Container, BoxContainer } from './styles';

const NewsInfo: React.FC = () =>
// const { id } = useParams();

// useEffect(() => {}, []);

  (
    <>
      <PatientAppbar />
      <Container>
        <BoxContainer>
          {/* <p>PLANO ALIMENTAR</p> */}
        </BoxContainer>
      </Container>
    </>
  );
export default NewsInfo;
