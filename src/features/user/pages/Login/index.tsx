import React, { useCallback } from 'react';
// import { Link } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { requestLogin } from '../../redux/reducers/userReducer';
import { Container, useStyles } from './styles';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const loginSchema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required(),
  });

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const classes = useStyles();

  const onSubmit = useCallback(
    // eslint-disable-next-line no-unused-vars
    (data, event) => {
      console.log('data', data);
      dispatch(requestLogin(data));
    },
    [dispatch],
  );

  return (
    <>
      <Container>
        <form
          className="login-form"
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >
          <TextField
            inputRef={register({ required: true })}
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            className={classes.inputField}
          />
          <TextField
            inputRef={register({ required: true })}
            id="password"
            name="password"
            label="Senha"
            type="password"
            variant="outlined"
            className={classes.inputField}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
          >
            Entrar
          </Button>
        </form>
        <p>Esqueci minha senha</p>
      </Container>
    </>
  );
};

export default Login;
