import { FC } from 'react';

import { UserTable } from 'components/usersTable/ui/UserTable';
import { ProtectedRoute } from 'components/protectedRoute/ui';

const Main: FC = () => {
  return (
    <ProtectedRoute>
      <UserTable />
    </ProtectedRoute>
  );
};

export { Main };
