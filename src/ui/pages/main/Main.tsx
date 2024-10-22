import { FC } from 'react';

import { UserTable } from 'components/usersTable/ui/UserTable';
import { ProtectedRoute } from 'core/router';

const Main: FC = () => {
  return (
    <ProtectedRoute>
      <UserTable />
    </ProtectedRoute>
  );
};

export { Main };
