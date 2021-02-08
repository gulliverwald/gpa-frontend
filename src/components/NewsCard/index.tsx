/* eslint-disable react/prop-types */
import React from 'react';
import { Container, NewsContainer } from './styles';

interface NewsCardProps {
  newsTitle: string;
  subTitle: string;
  imageLink: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ newsTitle, subTitle, imageLink }) => (
  <>
    <Container>
      <img src={imageLink} alt="Imagem da Notícia" />
      <NewsContainer>
        <h3><b>{newsTitle}</b></h3>
        <p>{subTitle}</p>
      </NewsContainer>
    </Container>
  </>
);

export default NewsCard;
