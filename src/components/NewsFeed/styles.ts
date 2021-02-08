import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 80%;
  width: 40%;
  padding: 16px 0px;
  border-radius: 32px;
  background-color: #F4F4F4;

  h2 {
    padding: 16px;
  }
`;

export const ShowContainer = styled.div`
  position: relative;
  align-self: left;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding-left: 10%;
  margin: 16px;
  color: #64C077;
`;
