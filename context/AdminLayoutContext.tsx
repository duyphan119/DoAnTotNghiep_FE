import { UserModel } from "@/models";
import { createContext, ReactNode, useContext } from "react";

const AdminLayoutContext = createContext<{
  profile: UserModel;
}>({
  profile: new UserModel(),
});

const AdminLayoutWrapper = ({
  profile,

  children,
}: {
  profile: UserModel;

  children: ReactNode;
}) => {
  return (
    <AdminLayoutContext.Provider
      value={{
        profile,
      }}
    >
      {children}
    </AdminLayoutContext.Provider>
  );
};

export const useAdminLayoutContext = () => useContext(AdminLayoutContext);

export default AdminLayoutWrapper;
