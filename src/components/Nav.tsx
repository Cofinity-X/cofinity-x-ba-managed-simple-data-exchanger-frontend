/********************************************************************************
 * Copyright (c) 2021,2022 FEV Consulting GmbH
 * Copyright (c) 2021,2022,2023 T-Systems International GmbH
 * Copyright (c) 2022,2023 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import { Menu } from '@mui/icons-material';
import { Box, Divider, IconButton, Paper } from '@mui/material';
import { LanguageSwitch, UserMenu, UserNav } from 'cx-portal-shared-components';
import i18next, { changeLanguage } from 'i18next';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { useAppSelector } from '../features/store';
import I18nService from '../services/i18nService';

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const location = useLocation();
  const isActive = location.pathname.includes(to);

  return (
    <Link className={`header--menu__item ${isActive ? 'header--menu__item--active' : ''}`} to={to}>
      <div className="header--menu__item--border-top"></div>
      <p className="header--menu__item--text">{children}</p>
      <div className="header--menu__item--border-bottom"></div>
    </Link>
  );

};

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useTranslation();
  const avatar = useRef<HTMLDivElement>(null);
  const { loggedInUser } = useAppSelector(state => state.appSlice);
  const NAV_ITEMS = [{ title: 'Logout', to: 'logout' }];
  const [lang, setlang] = useState(i18next.language);

  const openCloseMenu = () => setMenuOpen(prevVal => !prevVal);
  const onClickAway = (e: MouseEvent | TouchEvent) => {
    if (!avatar.current?.contains(e.target as HTMLDivElement)) {
      setMenuOpen(false);
    }
  };


  return (
    <Paper
      elevation={3}
      className="header"
      component="nav"
      sx={{
        borderRadius: 0,
        width: '100vw',
        '@media screen and (min-width: 1920px)': {
          marginLeft: 'calc((1920px - 100vw)/2)',
        },
      }}
    >
      <Box
        className="header--container"
        sx={{
          height: '4rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          py: 1,
          px: 2,
          '@media screen and (min-width: 1920px)': {
            marginLeft: 'calc((100vw - 1920px)/2)',
          },
        }}
      >
        <Box className="header--menu-container">
          <Link to="/" className="header--logo-container">
            <img src="/SDE-logo.png" alt="logo" className='header--logo' />
          </Link>
          <Box className="header--menu" display={'flex'} alignItems={'center'} position={'relative'}>
            <NavLink to="dashboard">
              {t('Dashboard')}
            </NavLink>

            <NavLink to="/provider/create-data">
              {t('Provide data')}
            </NavLink>

            <NavLink to="/consumer/consume-data">
              {t('Request data')}
            </NavLink>

            <NavLink to="about">
              {t('Support')}
            </NavLink>

            <Box ref={avatar}>
              <IconButton aria-label="menu" onClick={openCloseMenu}>
                <Menu />
              </IconButton>
            </Box>
            <UserMenu
              open={menuOpen}
              userName={loggedInUser.name}
              top={50}
              userRole={loggedInUser.company}
              onClickAway={onClickAway}
            >
              <UserNav sx={{ my: 1 }} component={Link} items={NAV_ITEMS} />
              <Divider />
              <LanguageSwitch
                current={lang}
                languages={I18nService.supportedLanguages.map(key => ({
                  key,
                }))}
                onChange={e => {
                  changeLanguage(e);
                  setlang(e);
                }}
              />
            </UserMenu>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};
export default Nav;
