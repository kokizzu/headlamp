import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import api, { useConnectApi } from '../../lib/api';
import { timeAgo } from '../../lib/util';
import Link from '../common/Link';
import SectionHeader from '../common/SectionHeader';
import SimpleTable from '../common/SimpleTable';

export default function RoleList() {
  const [rolesData, dispatch] = React.useReducer(setRoles, {});

  function setRoles(roles, newRoles) {
    const data = {...roles};

    newRoles.forEach((item) => {
      if (!(item.kind in data)) {
        data[item.kind] = [];
      }
      data[item.kind].push(item);
    });

    return data;
  }

  function getJointItems() {
    let joint = [];
    for (const items of Object.values(rolesData)) {
      joint = joint.concat(items);
    }
    return joint;
  }

  useConnectApi(
    api.role.list.bind(null, null, dispatch),
    api.clusterRole.list.bind(null, dispatch),
  );

  return (
    <Paper>
      <SectionHeader title="Roles" />
      <Box margin={1}>
        <SimpleTable
          rowsPerPage={[15, 25, 50]}
          columns={[
            {
              label: 'Type',
              getter: (item) => item.kind
            },
            {
              label: 'Name',
              getter: (item) =>
                <Link
                  routeName={item.metadata.namespace ? 'role' : 'clusterrole'}
                  params={{
                    namespace: item.metadata.namespace || '',
                    name: item.metadata.name
                  }}
                >
                  {item.metadata.name}
                </Link>
            },
            {
              label: 'Namespace',
              getter: (item) => item.metadata.namespace
            },
            {
              label: 'Age',
              getter: (item) => timeAgo(item.metadata.creationTimestamp)
            },
          ]}
          data={getJointItems()}
        />
      </Box>
    </Paper>
  );
}