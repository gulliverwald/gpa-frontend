/* eslint-disable react/prop-types */
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, NewsContainer, useStyles } from './styles';

interface NewsCardProps {
  id: number;
  newsTitle: string;
  subTitle?: string;
  imageLink: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
  id, newsTitle, subTitle, imageLink,
}) => {
  const classes = useStyles();

  return (
    <>
      <NavLink to={`/dashboard/newsInfo/${id}`} className={classes.linkContainer}>
        <Container>
          <img src={imageLink} alt="Imagem da Notícia" />
          <NewsContainer>
            <h3><b>{newsTitle}</b></h3>
            <p>{subTitle}</p>
          </NewsContainer>
        </Container>
      </NavLink>
    </>
  );
};

export default NewsCard;
