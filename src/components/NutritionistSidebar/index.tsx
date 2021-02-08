import React, { useCallback, useState } from 'react';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  Divider, Drawer, IconButton, List, ListItem, ListItemText, ListItemIcon,
} from '@material-ui/core';
import { MdRestaurantMenu, MdMenu } from 'react-icons/md';
import { IoMdCalendar, IoMdExit } from 'react-icons/io';
import { useStyles } from './styles';

import ImgGPA from '../../assets/img/logo.png';
import { requestLogout } from '../../features/user/redux/reducers/userReducer';

const NutritionistSidebar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = useCallback(() => { dispatch(requestLogout()); }, [dispatch]);

  return (
    <>
      <div className={classes.root}>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <p>
              {open === true ? (
                <img
                  src={ImgGPA}
                  alt="Logo GPA"
                  style={{
                    width: '107px',
                    height: '54px',
                    objectFit: 'fill',
                    paddingLeft: '8px',
                    objectPosition: 'center',
                  }}
                />
              ) : ''}

            </p>
            <IconButton onClick={handleDrawer}>
              {open === true ? <MdRestaurantMenu /> : <MdMenu />}
            </IconButton>
          </div>
          <Divider />
          <List>
            <NavLink to="/admin/addPatient" style={{ textDecoration: 'none', color: 'black' }}>
              <ListItem
                button
              >
                <ListItemIcon><IoMdCalendar size={24} /></ListItemIcon>
                <ListItemText primary="Adicionar Paciente" />
              </ListItem>
            </NavLink>
            <Divider />
            <ListItem button onClick={handleLogout}>
              <ListItemIcon><IoMdExit color="red" size={24} /></ListItemIcon>
              <ListItemText primary="Sair" style={{ color: 'red' }} />
            </ListItem>
          </List>
        </Drawer>
      </div>
    </>
  );
};

export default NutritionistSidebar;
