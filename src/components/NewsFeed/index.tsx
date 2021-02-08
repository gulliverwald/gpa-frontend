import React, { useState, useEffect } from 'react';
import { Divider } from '@material-ui/core';
import { IoMdArrowDropright } from 'react-icons/io';
import NewsCard from '../NewsCard';
import api from '../../services/api';
import { Container, ShowContainer } from './styles';

interface NewsProps {
  id: number;
  title: string;
  subtitle: string;
  image_link: string;
}

const NewsFeed: React.FC = () => {
  const [news, setNews] = useState<NewsProps[]>([]);

  useEffect(() => {
    async function handleNews(): Promise<void> {
      const response = await api.get('/News');
      setNews(response.data);
    }
    handleNews();
  }, []);

  return (
    <>
      <Container>
        <h2><b>Feed de Notícias</b></h2>
        {news.map((noticia) => (
          <NewsCard
            key={noticia.id}
            newsTitle={noticia.title}
            subTitle={noticia.subtitle}
            imageLink={noticia.image_link}
          />
        ))}
        <Divider />
        <ShowContainer>
          <h3>
            Mostrar mais
            {' '}
          </h3>
          <IoMdArrowDropright size={40} color="#64C077" />
        </ShowContainer>
      </Container>
    </>
  );
};

export default NewsFeed;
