import React, { useState, useEffect, useRef } from "react";
import { Socket } from "socket.io-client";
import { useSocket } from "./providers/SocketProvider";
const ForexEvents = () => {
  const [messages, setMessages] = useState([]);
  const { socket } = useSocket();
  const bottomRef = useRef(null);
  useEffect(() => {
    socket.on("prices", (data) => {
      setMessages((messages) => [...messages, data]);
    });
    return () => {
      socket.off("prices");
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="text-white">
      <h2>Events</h2>
      <div className="h-screen overflow-scroll">
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default ForexEvents;
