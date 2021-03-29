import React, { useCallback, useState } from 'react';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  Divider, Drawer, IconButton, List, ListItem, ListItemText, ListItemIcon, Collapse,
} from '@material-ui/core';
import {
  MdRestaurantMenu, MdMenu, MdExpandMore, MdExpandLess, MdAddBox, MdList, MdPerson,
} from 'react-icons/md';
import { IoMdCalendar, IoMdLogOut } from 'react-icons/io';
import { IoNewspaperOutline } from 'react-icons/io5';
import { GiFruitBowl } from 'react-icons/gi';
import { useStyles } from './styles';

import ImgGPA from '../../assets/img/logo.png';
import { requestLogout } from '../../features/user/redux/reducers/userReducer';

const NutritionistSidebar: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [openBlog, setOpenBlog] = useState(false);
  const [openPatient, setOpenPatient] = useState(false);

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
          anchor="left"
        >
          <div className={classes.toolbar}>
            <p>
              {open === true ? (
                <img
                  src={ImgGPA}
                  alt="Logo GPA"
                  style={{
                    width: '117px',
                    height: '64px',
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
            <ListItem button onClick={() => { setOpenPatient(!openPatient); }}>
              <ListItemIcon><MdPerson size={24} /></ListItemIcon>
              <ListItemText primary="Paciente" />
              {openPatient ? <MdExpandLess /> : <MdExpandMore />}
            </ListItem>
            <Collapse in={openPatient} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <NavLink activeClassName={classes.activeNavLink} to="/admin/addPatient" style={{ textDecoration: 'none', color: 'black' }}>
                  <ListItem
                    button
                    className={classes.nestedList}
                  >
                    <ListItemIcon><MdAddBox size={24} /></ListItemIcon>
                    <ListItemText primary="Adicionar" />
                  </ListItem>
                </NavLink>
                <Divider />
                <NavLink activeClassName={classes.activeNavLink} to="/admin/listPatient" style={{ textDecoration: 'none', color: 'black' }}>
                  <ListItem
                    button
                    className={classes.nestedList}
                  >
                    <ListItemIcon><MdList size={24} /></ListItemIcon>
                    <ListItemText primary="Listar" />
                  </ListItem>
                </NavLink>
              </List>
            </Collapse>
            <Divider />

            <ListItem button onClick={() => { setOpenBlog(!openBlog); }}>
              <ListItemIcon><IoNewspaperOutline size={24} /></ListItemIcon>
              <ListItemText primary="Blog" />
              {openBlog ? <MdExpandLess /> : <MdExpandMore />}
            </ListItem>
            <Collapse in={openBlog} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <NavLink activeClassName={classes.activeNavLink} to="/admin/addNews" style={{ textDecoration: 'none', color: 'black' }}>
                  <ListItem
                    button
                    className={classes.nestedList}
                  >
                    <ListItemIcon><MdAddBox size={24} /></ListItemIcon>
                    <ListItemText primary="Adicionar" />
                  </ListItem>
                </NavLink>
                <Divider />
                <NavLink activeClassName={classes.activeNavLink} to="/admin/listNews" style={{ textDecoration: 'none', color: 'black' }}>
                  <ListItem
                    button
                    className={classes.nestedList}
                  >
                    <ListItemIcon><MdList size={24} /></ListItemIcon>
                    <ListItemText primary="Listar" />
                  </ListItem>
                </NavLink>
              </List>
            </Collapse>
            <Divider />

            {/* <NavLink activeClassName={classes.activeNavLink} to="/admin/addEatingPlan"
            style={{ textDecoration: 'none', color: 'black' }}>
              <ListItem
                button
              >
                <ListItemIcon><IoMdCalendar size={24} /></ListItemIcon>
                <ListItemText primary="Adicionar PA" />
              </ListItem>
            </NavLink>
            <Divider /> */}

            <NavLink activeClassName={classes.activeNavLink} to="/admin/addFood" style={{ textDecoration: 'none', color: 'black' }}>
              <ListItem button>
                <ListItemIcon><GiFruitBowl size={24} /></ListItemIcon>
                <ListItemText primary="Alimento" />
              </ListItem>
            </NavLink>
            <Divider />

            <ListItem button onClick={handleLogout}>
              <ListItemIcon><IoMdLogOut color="red" size={24} /></ListItemIcon>
              <ListItemText primary="Sair" style={{ color: 'red' }} />
            </ListItem>
          </List>
        </Drawer>
      </div>
    </>
  );
};

export default NutritionistSidebar;
