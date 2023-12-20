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

import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const FooterLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  return (
    <Link to={to} className="footer--link">
      <p>{children}</p>
    </Link>
  );
};

const Footer = () => {
  const { t } = useTranslation();

  return (
    <Box
      component="footer"
      sx={{
        width: '100vw',
        '@media screen and (min-width: 1920px)': {
          marginLeft: 'calc((1920px - 100vw)/2)',
        },
      }}
    >
      <Box className="footer--container">
        <Box className="footer--links">
          <FooterLink to="/">{t('Imprint')}</FooterLink>
          <FooterLink to="/">{t('FAQs')}</FooterLink>
          <FooterLink to="/">{t('About Cofinity-X')}</FooterLink>
          <FooterLink to="/">{t('Version updates')}</FooterLink>
        </Box>
        <Box>
          <Typography className="footer--copyright">© Cofinity-X GmbH - All rights reserved.</Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default Footer;
