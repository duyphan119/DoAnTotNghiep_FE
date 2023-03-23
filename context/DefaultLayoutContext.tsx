import { UserModel } from "@/models";
import { authActions } from "@/redux/slice/authSlice";
import { useAppDispatch } from "@/redux/store";
import { createContext, ReactNode, useContext, useState } from "react";

const DefaultLayoutContext = createContext<{
  profile: UserModel;
  logout: () => void;
}>({
  profile: new UserModel(),
  logout: () => {},
});

const DefaultLayoutWrapper = ({
  profile,
  children,
}: {
  profile: UserModel;
  children: ReactNode;
}) => {
  const appDispatch = useAppDispatch();

  const [state, setState] = useState<{ profile: UserModel }>({ profile });

  const handleLogout = () => {
    setState({ profile: new UserModel() });
    appDispatch(authActions.fetchLogout());
  };

  return (
    <DefaultLayoutContext.Provider
      value={{
        profile: state.profile,
        logout: handleLogout,
      }}
    >
      {children}
    </DefaultLayoutContext.Provider>
  );
};

export const useDefaultLayoutContext = () => useContext(DefaultLayoutContext);

export default DefaultLayoutWrapper;
