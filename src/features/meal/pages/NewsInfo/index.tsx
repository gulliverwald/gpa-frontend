import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PatientAppbar from '../../../../components/PatientAppbar';

import { WebStore } from '../../../../store/RootReducer';
import { Container, BoxContainer } from './styles';

const NewsInfo: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  // eslint-disable-next-line max-len
  const news = useSelector((store: WebStore) => store.news.news.find((news_) => news_.id === parseInt(id, 10)));

  return (
    <>
      <PatientAppbar />
      <Container>
        <BoxContainer>
          <img src={news?.image_link} alt="Imagem da notícia" />
          <h2><b>{news?.title}</b></h2>
          <h3>{news?.subtitle}</h3>
          <p>{news?.description}</p>
        </BoxContainer>
      </Container>
    </>
  );
};

export default NewsInfo;
