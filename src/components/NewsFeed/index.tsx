import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Divider } from '@material-ui/core';
import { IoMdArrowDropright } from 'react-icons/io';
import NewsCard from '../NewsCard';
import { WebStore } from '../../store/RootReducer';
import { requestListNews } from '../../features/news/redux/reducers/newsReducer';
import { Container, ShowContainer } from './styles';

const NewsFeed: React.FC = () => {
  const dispatch = useDispatch();
  const news = useSelector((store: WebStore) => store.news.news);

  useEffect(() => {
    dispatch(requestListNews());
  }, [dispatch]);

  return (
    <>
      <Container>
        <h2>
          <b>Feed de Notícias</b>
        </h2>
        {news.map((news_) => (
          <NewsCard
            key={news_.id}
            id={news_.id}
            newsTitle={news_.title}
            subTitle={news_.subtitle}
            imageLink={news_.image_link}
          />
        ))}
        <Divider />
        <ShowContainer>
          <h3>Mostrar mais </h3>
          <IoMdArrowDropright size={40} color="#64C077" />
        </ShowContainer>
      </Container>
    </>
  );
};

export default NewsFeed;
