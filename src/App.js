import { FilteredUsersProvider } from "./storage/FilteredUsersStorage";
import { UserProvider } from "./storage/UserStorage";
import { Layout } from "./Layout/Layout";
import { Router } from "./router/Router";

export const App = () => (
  <UserProvider>
    <FilteredUsersProvider>
      <Layout>
        <Router />
      </Layout>
    </FilteredUsersProvider>
  </UserProvider>
);
