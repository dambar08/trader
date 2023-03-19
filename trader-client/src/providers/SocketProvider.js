// @flow
import React, {
  useEffect,
  createContext,
  useDispatch,
  useContext,
  useReducer,
  useState,
  useMemo,
} from "react";
import io, { Manager } from "socket.io-client";

const socket = io("ws://localhost:4000", {
  autoConnect: true,
  auth: { token: 5 },
});

export const SocketContext = React.createContext(socket);

const SocketProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);

  const buy = (amount) => {
    // console.log("BUYING");
    // console.log(socket);
    const payload = { amount, count: 10 };
    socket.emit("buy", payload);
  };

  const sell = (amount) => {
    // console.log("SELLING");
    // console.log(socket);
    const payload = { amount, count: 10 };
    socket.emit("sell", payload);
  };

  useEffect(() => {
    socket.on("disconnect", () => setIsConnected(false));
    socket.on("connect", () => setIsConnected(true));
    socket.on("pong", () => setLastPong(new Date().toISOString()));

    socket.on("buy", (data) => {
      console.log(data);
    });

    socket.on("sell", (data) => {
      console.log(data);
    });

    socket.once("pairs", (data) => {
      console.log(data);
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
      socket.off("prices");
      socket.off("buy");
      socket.off("sell");
      socket.off("pairs");
    };
  }, []);

  const value = { buy, sell, socket };
  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocket must be used with SocketProvider");
  }

  return context;
};

export default SocketProvider;
