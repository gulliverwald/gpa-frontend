/* eslint-disable react/prop-types */
import React from 'react';
import { Container } from './styles';

interface NewsCardProps {
  newsTitle: string;
  imageLink: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ newsTitle, imageLink }) => (
  <>
    <Container>
      <img src={imageLink} alt="Imagem da Notícia" />
      <h3><b>{newsTitle}</b></h3>
    </Container>
  </>
);

export default NewsCard;
