import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #f9fbff;
`;

export const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  width: 60%;
  height: 100%;
  margin-top: -30px;

  border-radius: 21px;

  img {
    background-repeat: cover;
    background-size: 100% 100vh;
    width: 100%;
    height: 30%;
  }

  h2 {
    margin-top: 24px;
  }

  h3 {
    margin: 24px 0px;
    color: #6b6b6b;
  }

  p {
    align-self: center;
    justify-self: flex-end;
    width: 70%;
  }
`;
