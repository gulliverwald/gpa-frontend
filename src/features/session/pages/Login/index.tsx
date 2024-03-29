import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { IoMdAlert, IoMdContact, IoMdLock } from 'react-icons/io';
import { InputAdornment } from '@material-ui/core';
import { requestLogin } from '../../../user/redux/reducers/userReducer';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import ImgBackground from '../../../../assets/img/5912.jpg';
import ImgGPA from '../../../../assets/img/logo.png';
import { MainContainer, Container, useStyles } from './styles';
import BackdropLoading from '../../../../components/BackdropLoading';
import { addNotification } from '../../../../hooks/toast/redux/reducers/NotificationReducer';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const loginSchema = yup.object().shape({
    email: yup.string().email('Email inválido').required('O email é obrigatório!'),
    password: yup.string().required('A senha é obrigatória!'),
  });

  const { register, errors, handleSubmit } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const classes = useStyles();

  const onSubmit = useCallback(
    // eslint-disable-next-line no-unused-vars
    (data) => {
      setLoading(true);
      dispatch(requestLogin({
        ...data,
        callback: (data_, error) => {
          setLoading(false);
          if (error) {
            dispatch(addNotification({
              key: Math.random(),
              message: error.response.data.message,
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
            className="login-form"
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
            <span>
              {errors.email && errors.email.type === 'required' && (
                <>
                  <p className={classes.inputAlert}>
                    <IoMdAlert color="red" style={{ margin: '0px 8px' }} />
                    {errors.email.message}
                  </p>
                </>
              )}
            </span>
            <Input
              inputRef={register({ required: 'A senha é obrigatória!' })}
              id="password"
              name="password"
              label="Senha"
              type="password"
              className={classes.inputField}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IoMdLock size={26} />
                  </InputAdornment>
                ),
              }}
            />
            <span>
              {errors.password && errors.password.type === 'required' && (
                <>
                  <p className={classes.inputAlert}>
                    <IoMdAlert color="red" style={{ margin: '0px 8px' }} />
                    {errors.password.message}
                  </p>
                </>
              )}
            </span>
            <Button type="submit"> Entrar </Button>
            <Link
              to="/forgot"
              style={{
                marginTop: 16,
                paddingTop: 16,
              }}
            >
              <span>
                Recuperar senha
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
