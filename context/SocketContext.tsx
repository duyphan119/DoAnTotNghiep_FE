import { createContext, ReactNode, useContext, useEffect } from "react";
import { io } from "socket.io-client";
import { API_URL } from "@/utils/constants";
const socket = io(API_URL as string);
type Props = Partial<{
  children: ReactNode;
}>;
const SocketContext = createContext({} as any);

const SocketWrapper = ({ children }: Props) => {
  useEffect(() => {
    // socket.on("welcome", (data) => {
    //   console.log("Welcome", data);
    // });
    // socket.on("test", (data) => {
    //   console.log("test", data);
    // });
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
export function useSocketContext() {
  return useContext(SocketContext);
}
export default SocketWrapper;
