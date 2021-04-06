import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #F9FBFF;
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
    width: 100%;
    height: 40%;
    border-radius: 21px 21px 0px 0px;
    object-fit: cover;
    object-position: center;
  }

  h2 {
    margin-top: 24px;
  }

  h3 {
    margin: 24px 0px;
    color: #6B6B6B;
  }

  p {
    align-self: center;
    justify-self: flex-end;
    width: 70%;
  }

  @media (max-width: 900px) {
    width: 90%;
    height: auto;
  }
`;
