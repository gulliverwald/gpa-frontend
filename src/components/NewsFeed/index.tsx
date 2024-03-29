import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isBefore, isAfter } from 'date-fns';
import { Divider } from '@material-ui/core';
import { IoMdArrowDropleft, IoMdArrowDropright } from 'react-icons/io';
import NewsCard from '../NewsCard';
import { WebStore } from '../../store/RootReducer';
import { requestListNews } from '../../features/news/redux/reducers/newsReducer';
import { addNotification } from '../../hooks/toast/redux/reducers/NotificationReducer';

import { Container, ShowContainer } from './styles';
import { INewsInfo } from '../../features/news/redux/types/INewsState';

const NewsFeed: React.FC = () => {
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [newsUpdated, setNewsUpdated] = useState<INewsInfo[]>([]);
  const news = useSelector((store: WebStore) => store.news.news);

  useEffect(() => {
    setLoading(true);
    dispatch(
      requestListNews({
        callback: (data, error) => {
          setLoading(false);
          if (error) {
            dispatch(
              addNotification({
                message: 'Erro em carregar notícias!',
                options: { variant: 'error' },
                key: Math.random(),
              }),
            );
          }
        },
      }),
    );
    if (news) {
      const arraySort = [...news];
      setNewsUpdated(arraySort.sort((a, b) => {
        const keyA = new Date(a.date);
        const keyB = new Date(b.date);

        if (isBefore(keyA, keyB)) return 1;
        if (isAfter(keyA, keyB)) return -1;
        return 0;
      }));
    }
  }, []);

  return (
    <>
      <Container>
        <h2><b>Feed de Notícias</b></h2>
        {newsUpdated
          .slice(count * 4 - 4, count * 4)
          .map((news_: any) => (
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

          { count * 4 > 4
            ? (
              <>
                <button type="button" onClick={(e) => setCount(count - 1)}>
                  <IoMdArrowDropleft size={40} color="#64C077" />
                  <h3>
                    Anterior
                    {' '}
                  </h3>
                </button>
              </>
            ) : ''}
          { count * 4 < news.length
            ? (
              <>
                <button type="button" onClick={(e) => setCount(count + 1)}>
                  <h3>
                    Próximo
                    {' '}
                  </h3>
                  <IoMdArrowDropright size={40} color="#64C077" />
                </button>
              </>
            ) : ''}
        </ShowContainer>
      </Container>
    </>
  );
};

export default NewsFeed;
