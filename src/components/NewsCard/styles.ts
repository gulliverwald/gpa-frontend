import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  border-bottom: 1px solid #C4C4C4;
  padding: 23px;

  img {
    width: '89px';
    height: '89px';
    object-fit: 'fill';
    padding-left: '8px';
    object-position: 'center';
  }
`;

export const NewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 14px;

  p {
    padding-top: 8px;
    color: #6E6E6E;
  }
`;
