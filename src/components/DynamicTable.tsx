// Copyright 2022 Catena-X
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF \ KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { DataGrid, gridClasses, GridSelectionModel } from '@mui/x-data-grid';
import Swal from 'sweetalert2';
import { DynamicTableColumn } from '../models/DynamicTableColumn';
import { SerialPartTypization } from '../models/SerialPartTypization';
import dft from '../api/dft';

const columnsData: DynamicTableColumn[] = [];

export default function DynamicTable({ columns = columnsData, headerHeight = 60, submitUrl = '/aspect' }) {
  const [rows, setRows] = React.useState([]);
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);
  const [id, setId] = React.useState(0);

  const addRows = () => {
    const newRows: SerialPartTypization[] = [];

    Swal.fire({
      title: 'Insert number of rows',
      input: 'number',
      confirmButtonColor: '#01579b',
      preConfirm: numberOfNewRows => {
        if (!numberOfNewRows || numberOfNewRows < 1) {
          Swal.showValidationMessage(`Please enter number of rows above 0.`);
        }
      },
    }).then(result => {
      for (let i = 0; i < Number(result.value); i++) {
        newRows.push({
          id: id + (i + 1),
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
        });
      }

      setRows(prevRows => prevRows.concat(newRows));
      setId(id + Number(result.value));
    });
  };

  const generateUUID = (rowId: number) => {
    const auxRows = Object.assign([], rows);

    for (const r of auxRows) {
      if (r.id === rowId) {
        r.uuid = `urn:uuid:${uuidv4()}`;
      }
    }

    setRows(auxRows);
  };

  const onSelectionChange = (newSelectionModel: GridSelectionModel) => {
    setSelectionModel(newSelectionModel);
  };

  const deleteSelectedRows = () => {
    const auxRows = Object.assign([], rows);

    if (selectionModel.length > 0) {
      for (const s of selectionModel) {
        const index = auxRows.findIndex(a => a.id === s);
        if (index !== -1) {
          auxRows.splice(index, 1);
        }
      }
    }

    setRows(auxRows);
  };

  // styles
  const ODD_OPACITY = 0.2;

  const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
    [`& .${gridClasses.row}.even`]: {
      backgroundColor: theme.palette.grey[200],
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
        '@media (hover: none)': {
          backgroundColor: 'transparent',
        },
      },
      '&.Mui-selected': {
        backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY + theme.palette.action.selectedOpacity),
        '&:hover, &.Mui-hovered': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity + theme.palette.action.hoverOpacity,
          ),
          // Reset on touch devices, it doesn't add specificity
          '@media (hover: none)': {
            backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY + theme.palette.action.selectedOpacity),
          },
        },
      },
    },
  }));
  // end styles

  // eslint-disable-next-line
  const onCellEditCommit = (event: any) => {
    const auxRows = JSON.parse(JSON.stringify(rows));
    const index = rows.findIndex(r => r.id === event.id);
    if (index !== -1) {
      if (auxRows[index].hasOwnProperty(event.field)) {
        const f = event.field as keyof SerialPartTypization;
        auxRows[index][f] =
          f === 'uuid' && event.value !== '' && !event.value.startsWith('urn:uuid:')
            ? `urn:uuid:${event.value}`
            : event.value;
      }
    }

    setRows(auxRows);
  };

  const getInvalidDataMessage = () => {
    return Swal.fire({
      title: 'Invalid data!',
      html: '<p> Part Instance ID, Manufacturing Date, Manufacturer Part ID, Classification and Name of Manufacturer fields are required. </p> <p> Optional Identifier Value and Optional Identifier Key must either be empty or both filled.',
      icon: 'error',
      confirmButtonColor: '#01579b',
    });
  };

  const submitData = () => {
    if (rows && rows.length > 0) {
      for (const r of rows) {
        if (
          r.part_instance_id === '' ||
          r.manufacturing_date === '' ||
          r.manufacturer_part_id === '' ||
          r.classification === '' ||
          r.name_at_manufacturer === '' ||
          (r.optional_identifier_value === '' && r.optional_identifier_key !== '') ||
          (r.optional_identifier_value !== '' && r.optional_identifier_key === '')
        ) {
          getInvalidDataMessage();
        } else {
          console.log('rows', rows);
          dft.post(submitUrl, rows).then(response => {
            // TODO
          });
        }
      }
    } else {
      getInvalidDataMessage();
    }
  };

  return (
    <div style={{ width: '100%', height: 108 + 6 * 52 + 'px' }}>
      <Button variant="outlined" onClick={addRows} sx={{ mb: 2 }}>
        Add rows(s)
      </Button>
      &nbsp;
      <Button variant="outlined" onClick={deleteSelectedRows} sx={{ mb: 2 }}>
        Delete row(s)
      </Button>
      <StripedDataGrid
        getRowId={row => row.id}
        autoHeight={false}
        columns={columns}
        rows={rows}
        headerHeight={headerHeight}
        disableColumnMenu={true}
        hideFooter={true}
        checkboxSelection={true}
        disableSelectionOnClick={true}
        onSelectionModelChange={onSelectionChange}
        selectionModel={selectionModel}
        onCellEditCommit={onCellEditCommit}
        getRowClassName={params => (params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd')}
        sx={{
          '& .MuiDataGrid-columnHeaderTitle': {
            textOverflow: 'clip',
            whiteSpace: 'break-spaces',
            lineHeight: 1.5,
            textAlign: 'center',
          },
        }}
      />
      <div> * Mandatory </div>
      <Button variant="outlined" onClick={submitData} sx={{ mt: 2 }}>
        SUBMIT DATA
      </Button>
    </div>
  );
}
