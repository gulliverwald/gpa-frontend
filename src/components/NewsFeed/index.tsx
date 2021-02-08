import React, { useState, useEffect } from 'react';
import NewsCard from '../NewsCard';
import api from '../../services/api';
import { Container } from './styles';

interface NewsProps {
  id: number;
  titulo: string;
  image_link: string;
}

const NewsFeed: React.FC = () => {
  const [news, setNews] = useState<NewsProps[]>([]);

  useEffect(() => {
    async function handleNews(): Promise<void> {
      const response = await api.get('/New');
      setNews(response.data);
    }
    handleNews();
  }, []);

  return (
    <>
      <Container>
        <h2><b>Feed de Notícias</b></h2>
        {news.map((noticia) => (
          <NewsCard key={noticia.id} newsTitle={noticia.titulo} imageLink={noticia.image_link} />
        ))}
      </Container>
    </>
  );
};

export default NewsFeed;
