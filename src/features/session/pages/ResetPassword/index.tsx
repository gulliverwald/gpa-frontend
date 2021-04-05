import React, { useCallback, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { IoMdAlert, IoMdContact, IoMdLock } from 'react-icons/io';
import { InputAdornment } from '@material-ui/core';
import { requestLogin, requestResetPassword } from '../../../user/redux/reducers/userReducer';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import ImgBackground from '../../../../assets/img/5912.jpg';
import ImgGPA from '../../../../assets/img/logo.png';
import { MainContainer, Container, useStyles } from './styles';
import BackdropLoading from '../../../../components/BackdropLoading';
import { addNotification } from '../../../../hooks/toast/redux/reducers/NotificationReducer';
import { useRedirect } from '../../../../hooks';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const { token } = useParams<{token: string}>();

  const loginSchema = yup.object().shape({
    password: yup.string().required('A senha é obrigatória!'),
    confirmPassword: yup.string().oneOf(
      [yup.ref('password'), null],
      'Confirmação de senha incorreta',
    ),
  });
  const [loading, setLoading] = useState(false);

  const { register, errors, handleSubmit } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const classes = useStyles();
  const { redirect } = useRedirect();

  const onSubmit = useCallback(
    (data) => {
      if (!token) return;
      setLoading(true);
      dispatch(requestResetPassword({
        ...data,
        token,
        callback: (data_, error) => {
          setLoading(false);
          console.log('HAHAHAHAHAH', data_, error);
          console.error(error);
          if (data_) {
            console.table(data_);
            dispatch(addNotification({
              key: Math.random(),
              message: 'Senha atualizada',
              options: {
                variant: 'success',
              },
            }));
            redirect('/');
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
            className="login-form"
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
          >
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
            <Input
              inputRef={register({ required: 'A confirmação de senha é obrigatória!' })}
              id="confirmPassword"
              name="confirmPassword"
              label="Confirmação de Senha"
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
              {errors.confirmPassword && errors.confirmPassword.type === 'required' && (
                <>
                  <p className={classes.inputAlert}>
                    <IoMdAlert color="red" style={{ margin: '0px 8px' }} />
                    {errors.confirmPassword.message}
                  </p>
                </>
              )}
            </span>
            <Button type="submit"> Enviar </Button>
          </form>
        </Container>
        <img src={ImgBackground} alt="Imagem de fundo" className={classes.imageBackground} />
      </MainContainer>
    </>
  );
};

export default Login;
