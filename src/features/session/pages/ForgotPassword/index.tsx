import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { IoMdAlert, IoMdContact, IoMdLock } from 'react-icons/io';
import { InputAdornment } from '@material-ui/core';
import { requestForgotPassword, requestLogin } from '../../../user/redux/reducers/userReducer';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import ImgBackground from '../../../../assets/img/5912.jpg';
import ImgGPA from '../../../../assets/img/logo.png';
import { MainContainer, Container, useStyles } from './styles';
import { addNotification } from '../../../../hooks/toast/redux/reducers/NotificationReducer';
import BackdropLoading from '../../../../components/BackdropLoading';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const loginSchema = yup.object().shape({
    email: yup.string().email('Email inválido').required('O email é obrigatório!'),
  });

  const { register, errors, handleSubmit } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const classes = useStyles();

  const onSubmit = useCallback(
    // eslint-disable-next-line no-unused-vars
    (data) => {
      setLoading(true);
      dispatch(requestForgotPassword({
        ...data,
        callback: (data_, error) => {
          setLoading(false);
          console.table(errors);
          if (data_) {
            console.table(data_);
            dispatch(addNotification({
              key: Math.random(),
              message: `Email enviado para ${data.email}`,
              options: {
                variant: 'success',
              },
            }));
          }
          if (error) {
            dispatch(addNotification({
              key: Math.random(),
              message: 'erro',
              options: {
                variant: 'error',
              },
            }));
          }
        },
      }));
    },
    [dispatch],
  );

  return (
    <>
      <MainContainer>
        <BackdropLoading open={loading} />
        <Container>
          {/* <a href="https://www.freepik.com/vectors/nature">Nature vector created by pch.vector - www.freepik.com</a> */}
          <div className={classes.imageContainer}>
            <img src={ImgGPA} alt="Logo GPA" className={classes.imageGPA} />
          </div>
          <form
            className="forgot-form"
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
          >
            <Input
              inputRef={register({ required: 'O email é obrigatório!' })}
              id="email"
              name="email"
              label="Email"
              className={classes.inputField}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IoMdContact size={26} />
                  </InputAdornment>
                ),
              }}
            />
            <Button type="submit"> Enviar </Button>
            <Link
              to="/"
              style={{
                marginTop: 16,
                paddingTop: 16,
              }}
            >
              <span>
                Voltar ao login
              </span>
            </Link>
          </form>
        </Container>
        <img src={ImgBackground} alt="Imagem de fundo" className={classes.imageBackground} />
      </MainContainer>
    </>
  );
};

export default Login;
