import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { WebStore } from '../../../../store/RootReducer';
import { Link } from 'react-router-dom';
import { Grid, InputAdornment, IconButton } from '@material-ui/core';
import {
  MdSave,
  MdEdit,
  MdDelete,
  MdSend,
} from 'react-icons/md';

import AppBar from '../../../../components/AppBar';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import { TextMaskCustom, NumberFormatCustom } from '../../../../utils/numberMaskFormatter';

import { Container, useStyles } from './styles';

const AddSchedule: React.FC = () => {
  // const patient = useSelector((store: WebStore) => store.patient.patient.name);

  const classes = useStyles();

  const [values, setValues] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues(event.target.value);
  };

  return (
    <>
      <AppBar title="Editar consulta" />

      <Container>
        <div className="container">
          <h2>Paciente: </h2>
          <Button type="submit" startIcon={<MdSave />}>Salvar</Button>
        </div>
        <div className="content-container">
          <div className="schedule-container">
            <h1>Dados da Consulta</h1>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Input
                  variant="standard"
                  type="date"
                  label="Data"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Input
                  variant="standard"
                  id="value"
                  name="value"
                  label="Valor"
                  value={values}
                  onChange={handleChange}
                  InputProps={{ startAdornment: (<InputAdornment position="start">R$</InputAdornment>), inputComponent: NumberFormatCustom as any }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Input
                  id="observation"
                  name="observation"
                  label="Observações"
                  multiline
                  rows={4}
                  className={classes.observation}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>

            <h2>Anamneses</h2>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div className="list">
                  <div className="list-item">
                    <span>🍌</span>
                    <span>Eutrófico</span>
                    <div>
                      <IconButton>
                        <MdEdit size={24} color="purple" />
                      </IconButton>
                      <IconButton>
                        <MdDelete size={24} color="red" />
                      </IconButton>
                    </div>
                  </div>
                </div>
              </Grid>
            </Grid>

            <Link to="/#" className="pa-link">
              <span>VER PLANO ALIMENTAR DA CONSULTA</span>
              <MdSend size={30} color="white" />
            </Link>
          </div>

          <div className="antropometric-container">
            <h1>Dados Antropométricos</h1>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={3}>
                <Input
                  label="Altura"
                  variant="standard"
                  InputProps={{ endAdornment: (<InputAdornment position="end">m</InputAdornment>), inputComponent: NumberFormatCustom as any }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <Input
                  label="Peso"
                  variant="standard"
                  InputProps={{ endAdornment: (<InputAdornment position="end">Kg</InputAdornment>), inputComponent: NumberFormatCustom as any }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <Input
                  label="IMC"
                  variant="standard"
                  InputProps={{ endAdornment: (<InputAdornment position="end">Kg/m²</InputAdornment>), inputComponent: NumberFormatCustom as any }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Input
                  label="Gordura Viceral"
                  variant="standard"
                  InputProps={{ inputComponent: NumberFormatCustom as any }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Input
                  label="Idade Metabólica"
                  variant="standard"
                  InputProps={{ endAdornment: (<InputAdornment position="end">anos</InputAdornment>), inputComponent: NumberFormatCustom as any }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <h2>Percentual de Gordura</h2>
              </Grid>
              <Grid item xs={6}>
                <Input
                  label="Somatório de Pregas"
                  variant="standard"
                  InputProps={{ endAdornment: (<InputAdornment position="end">%</InputAdornment>), inputComponent: NumberFormatCustom as any }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Input
                  label="Bioimpedância"
                  variant="standard"
                  InputProps={{ endAdornment: (<InputAdornment position="end">%</InputAdornment>), inputComponent: NumberFormatCustom as any }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Input
                  label="Percentual de Massa Muscular"
                  variant="standard"
                  InputProps={{ endAdornment: (<InputAdornment position="end">%</InputAdornment>), inputComponent: NumberFormatCustom as any }}
                  className={classes.inputHuge}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Input
                  label="Circunferência de Braço"
                  variant="standard"
                  InputProps={{ endAdornment: (<InputAdornment position="end">cm</InputAdornment>), inputComponent: NumberFormatCustom as any }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Input
                  label="Circunferência da Cintura"
                  variant="standard"
                  InputProps={{ endAdornment: (<InputAdornment position="end">cm</InputAdornment>), inputComponent: NumberFormatCustom as any }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Input
                  label="Supra ilíaca"
                  variant="standard"
                  InputProps={{ endAdornment: (<InputAdornment position="end">mm</InputAdornment>), inputComponent: NumberFormatCustom as any }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Input
                  label="Supra escapular"
                  variant="standard"
                  InputProps={{ endAdornment: (<InputAdornment position="end">mm</InputAdornment>), inputComponent: NumberFormatCustom as any }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12}><h2>Prega Cutânea</h2></Grid>
              <Grid item xs={6}>
                <Input
                  label="Biciptal"
                  variant="standard"
                  InputProps={{ endAdornment: (<InputAdornment position="end">mm</InputAdornment>), inputComponent: NumberFormatCustom as any }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Input
                  label="Triciptal"
                  variant="standard"
                  InputProps={{ endAdornment: (<InputAdornment position="end">mm</InputAdornment>), inputComponent: NumberFormatCustom as any }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          </div>
        </div>
      </Container>
    </>
  );
};

export default AddSchedule;
