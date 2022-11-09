/* eslint-disable no-unused-vars */
/********************************************************************************
 * Copyright (c) 2021,2022 FEV Consulting GmbH
 * Copyright (c) 2021,2022 T-Systems International GmbH
 * Copyright (c) 2021,2022 Contributors to the CatenaX (ng) GitHub Organisation
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

import { useEffect, useRef, useState } from 'react';
import { Box, Grid, TextareaAutosize, useTheme } from '@mui/material';
import { Button, Tab, Tabs, Typography } from 'cx-portal-shared-components';
import DynamicTable from '../components/DynamicTable';
import { getColumnsBySubmodelType } from '../helpers/commonSubmodelColumns';
// eslint-disable-next-line no-unused-vars
import { getAssemblyPartRelationshipColumns } from '../helpers/AssemblyPartRelationshipColumns';
import { SerialPartTypization } from '../models/SerialPartTypization';
import { Batch } from '../models/Batch';
import { AssemblyPartRelationship } from '../models/AssemblyPartRelationship';
import UploadFile from '../components/UploadFile';
import { useAppDispatch } from '../store/store';
import { handleDialogOpen } from '../store/accessUsagePolicySlice';
import { setSelectedFiles, setUploadStatus } from '../store/providerSlice';
import { setSnackbarMessage } from '../store/Notifiication/slice';
import SelectSubmodel from '../components/SelectSubmodel';
import DataTable from '../components/DataTable';

const serialPartInitialData = [
  {
    uuid: '',
    part_instance_id: '',
    manufacturing_date: '',
    manufacturing_country: '',
    manufacturer_part_id: '',
    customer_part_id: '',
    classification: '',
    name_at_manufacturer: '',
    name_at_customer: '',
    optional_identifier_key: '',
    optional_identifier_value: '',
  },
];
const batchInitialData = [
  {
    uuid: '',
    batch_id: '',
    manufacturing_date: '',
    manufacturing_country: '',
    manufacturer_part_id: '',
    customer_part_id: '',
    classification: '',
    name_at_manufacturer: '',
    name_at_customer: '',
    optional_identifier_key: '',
    optional_identifier_value: '',
  },
];
const assemblyRelationshipInitialData = [
  {
    parent_uuid: '',
    parent_part_instance_id: '',
    parent_manufacturer_part_id: '',
    parent_optional_identifier_key: '',
    parent_optional_identifier_value: '',
    uuid: '',
    part_instance_id: '',
    manufacturer_part_id: '',
    optional_identifier_key: '',
    optional_identifier_value: '',
    lifecycle_context: '',
    quantity_number: '',
    measurement_unit_lexical_value: '',
    datatype_uri: '',
    assembled_on: '',
  },
];

export default function CreateData({ handleFiles }: { handleFiles: (_file: File) => void }) {
  const serialDataRef = useRef(null);
  const batchDataRef = useRef(null);
  const assemblyDataRef = useRef(null);
  const [v, setValue] = useState(0);
  const [serialTemplate] = useState<SerialPartTypization[]>(serialPartInitialData);
  const [batchTemplate] = useState<Batch[]>(batchInitialData);
  const [assemblyTemplate] = useState<AssemblyPartRelationship[]>(assemblyRelationshipInitialData);
  const theme = useTheme();

  const dispatch = useAppDispatch();
  const getInvalidDataMessage = () => {
    dispatch(
      setSnackbarMessage({
        message: 'Invalid data! Enter Required * fields.',
        type: 'error',
      }),
    );
  };
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const getSerialPlaceholder = () => {
    return JSON.stringify(serialTemplate, undefined, 4);
  };

  const getBatchPlaceHolder = () => {
    return JSON.stringify(batchTemplate, undefined, 4);
  };

  const getAssemblyPlaceholder = () => {
    return JSON.stringify(assemblyTemplate, undefined, 4);
  };

  const validateSerialPartFiedls = (value: SerialPartTypization[]) => {
    const auxRows = JSON.parse(JSON.stringify(value));
    if (auxRows && auxRows.length > 0) {
      for (const r of auxRows) {
        if (
          r.part_instance_id === '' ||
          r.manufacturing_date === '' ||
          r.manufacturer_part_id === '' ||
          r.classification === '' ||
          r.name_at_manufacturer === '' ||
          (r.optional_identifier_value === '' && r.optional_identifier_key !== '') ||
          (r.optional_identifier_value !== '' && r.optional_identifier_key === '')
        ) {
          return false;
        }
      }
      return true;
    }

    return false;
  };

  const validateBatchFields = (value: Batch[]) => {
    const auxRows = JSON.parse(JSON.stringify(value));
    if (auxRows && auxRows.length > 0) {
      for (const r of auxRows) {
        if (
          r.batch_id === '' ||
          r.manufacturing_date === '' ||
          r.manufacturer_part_id === '' ||
          r.classification === '' ||
          r.name_at_manufacturer === '' ||
          (r.optional_identifier_value === '' && r.optional_identifier_key !== '') ||
          (r.optional_identifier_value !== '' && r.optional_identifier_key === '')
        ) {
          return false;
        }
      }
      return true;
    }

    return false;
  };

  const validateAssemblyRelationshipFiedls = (value: AssemblyPartRelationship[]) => {
    const auxRows = JSON.parse(JSON.stringify(value));
    if (auxRows && auxRows.length > 0) {
      for (const r of auxRows) {
        if (
          r.parent_part_instance_id === '' ||
          r.parent_manufacturer_part_id === '' ||
          r.part_instance_id === '' ||
          r.manufacturer_part_id === '' ||
          r.lifecyle_context === '' ||
          r.quantity_number === '' ||
          r.measurement_unit_lexical_value === '' ||
          r.datatype_uri === '' ||
          r.assembled_on === '' ||
          (r.optional_identifier_value === '' && r.optional_identifier_key !== '') ||
          (r.optional_identifier_value !== '' && r.optional_identifier_key === '') ||
          (r.parent_optional_identifier_key === '' && r.parent_optional_identifier_value !== '') ||
          (r.parent_optional_identifier_key !== '' && r.parent_optional_identifier_value === '')
        ) {
          return false;
        }
      }
      return true;
    }

    return false;
  };

  const validateData = async (
    value: SerialPartTypization[] | Batch[] | AssemblyPartRelationship[],
    submitUrl: string,
    type: string,
  ) => {
    let valid = false;

    if (value.hasOwnProperty('parent_uuid')) {
      // assembly part relationship
      valid = validateAssemblyRelationshipFiedls(value as AssemblyPartRelationship[]);
    } else if (value.hasOwnProperty('batch_id')) {
      valid = validateBatchFields(value as Batch[]);
    } else {
      // serial part
      valid = validateSerialPartFiedls(value as SerialPartTypization[]);
    }
    const auxRows = JSON.parse(JSON.stringify(value));
    if (valid) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      auxRows.forEach((auxRow: any) => {
        Object.keys(auxRow).forEach(k => {
          if (auxRow[k] === '') {
            auxRow[k] = null;
          }
        });
      });
      dispatch(handleDialogOpen({ data: auxRows, url: submitUrl, type: type }));
    } else {
      getInvalidDataMessage();
    }
  };

  const submitSerialData = () => {
    let json;
    try {
      json = JSON.parse(serialDataRef.current.value.trim());
    } catch (e) {
      getInvalidDataMessage();
    }

    if (json) {
      validateData(json, '/aspect', 'json');
    }
  };

  const submitBatchData = () => {
    let json;
    try {
      json = JSON.parse(batchDataRef.current.value.trim());
    } catch (e) {
      getInvalidDataMessage();
    }

    if (json) {
      validateData(json, '/batch', 'json');
    }
  };
  const submitAssemblyData = () => {
    let json;
    try {
      json = JSON.parse(assemblyDataRef.current.value.trim());
    } catch (e) {
      getInvalidDataMessage();
    }

    if (json) {
      validateData(json, '/aspect/relationship', 'json');
    }
  };

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  useEffect(() => {
    dispatch(setSelectedFiles([]));
    dispatch(setUploadStatus(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const textareaStyle = {
    width: '100%',
    border: `1px solid ${theme.palette.grey[500]}`,
    marginTop: '16px',
    padding: '16px',
    borderRadius: 4,
  };
  const jsonInputRef = useRef(null);
  return (
    <Box sx={{ flex: 1, p: 4 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={v} onChange={handleChange} aria-label="basic tabs example" sx={{ pt: 0 }}>
              <Tab label="Upload File" {...a11yProps(0)} />
              <Tab label="Table" {...a11yProps(1)} />
              {/* <Tab label="Batch" {...a11yProps(2)} />
              <Tab label="Assembly Part Relationship" {...a11yProps(3)} /> */}
              <Tab label="JSON" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <Box>
            <TabPanel value={v} index={0}>
              <UploadFile handleFiles={(file: File) => handleFiles(file)} selectedTabIndex={v} />
            </TabPanel>
            <TabPanel value={v} index={1}>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <SelectSubmodel />
                </Grid>
              </Grid>
              <DataTable />
            </TabPanel>
            <TabPanel value={v} index={2}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  {/* <SelectSubmodel /> */}
                  <TextareaAutosize
                    ref={jsonInputRef}
                    minRows={20}
                    placeholder="hello"
                    style={{ width: '100%', border: '1px solid black', marginTop: '10px' }}
                  />
                  <Button variant="contained" onClick={submitSerialData} sx={{ mt: 2 }} fullWidth>
                    Next Step - Configure Policies
                  </Button>
                </Grid>
              </Grid>
            </TabPanel>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
