import React, { useState } from 'react';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';
import {
  Divider, Drawer, IconButton, List, ListItem, ListItemText, ListItemIcon,
} from '@material-ui/core';
import { MdRestaurantMenu, MdMenu } from 'react-icons/md';
import { IoMdCalendar, IoMdExit } from 'react-icons/io';
import { useStyles } from './styles';

const NutritionistSidebar: React.FC = () => {
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const handleDrawer = () => {
    setOpen(!open);
  };

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
            <p>{open === true ? 'PLACEHOLDER' : ''}</p>
            <IconButton onClick={handleDrawer}>
              {open === true ? <MdRestaurantMenu /> : <MdMenu />}
            </IconButton>
          </div>
          <Divider />
          <List>
            <NavLink to="/addPatient" style={{ textDecoration: 'none', color: 'black' }}>
              <ListItem
                button
              >
                <ListItemIcon><IoMdCalendar size={24} /></ListItemIcon>
                <ListItemText primary="Adicionar Paciente" />
              </ListItem>
            </NavLink>
            <Divider />
            <NavLink to="/addEatingPlan" style={{ textDecoration: 'none', color: 'black' }}>
              <ListItem button>
                <ListItemIcon><IoMdExit color="red" size={24} /></ListItemIcon>
                <ListItemText primary="Sair" style={{ color: 'red' }} />
              </ListItem>
            </NavLink>
          </List>
        </Drawer>
      </div>
    </>
  );
};

export default NutritionistSidebar;
