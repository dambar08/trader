import { io } from "socket.io-client";
const socket = io("ws://localhost:4000", {
  autoConnect: true,
  auth: { token: 1 },
});

const socket2 = io("ws://localhost:4000", {
  autoConnect: true,
  auth: { token: 2 },
});

const socket3 = io("ws://localhost:4000", {
  autoConnect: true,
  auth: { token: 3 },
});

const socket4 = io("ws://localhost:4000", {
  autoConnect: true,
  auth: { token: 4 },
});
const actions = ["buy", "sell"];

const getRandomAmount = () => {
  const max = 10000;
  return Math.floor(Math.random() * max);
};

const getRandomAction = () => {
  return actions[Math.floor(Math.random() * actions.length)];
};

const getRandomNoOfShares = () => {
  const max = 10;
  return Math.floor(Math.random() * max);
};

setInterval(() => {
  const action = getRandomAction();
  const amount = getRandomAmount();
  console.log(`Performing action: ${action}, with amount ${amount}`);
  const payload = { amount, count: getRandomNoOfShares() };
  socket.emit(action, payload);
}, 1000);

setInterval(() => {
  let action = getRandomAction();
  let amount = getRandomAmount();
  let payload = { amount, count: getRandomNoOfShares() };
  socket.emit(action, payload);
}, 100);

setInterval(() => {
  let action = getRandomAction();
  let amount = getRandomAmount();
  let payload = { amount, count: getRandomNoOfShares() };
  socket2.emit(action, payload);

  // action = getRandomAction();
  // amount = getRandomAmount();
  // payload = { amount, count: getRandomNoOfShares() };
  // socket3.emit(action, payload);

  // action = getRandomAction();
  // amount = getRandomAmount();
  // payload = { amount, count: getRandomNoOfShares() };
  // socket4.emit(action, payload);
}, 1000);

setInterval(() => {
  let action = getRandomAction();
  let amount = getRandomAmount();
  let payload = { amount, count: getRandomNoOfShares() }
  socket3.emit(action, payload);
}, 500);

setInterval(() => {
  let action = getRandomAction();
  let amount = getRandomAmount();
  let payload = { amount, count: getRandomNoOfShares() };
  socket4.emit(action, payload);
}, 2000);

socket.on("error", (error) => {
  console.log(error);
});

socket.on('prices', (data) => {
  console.log(data);
})

socket.on("connected", (data) => {
  console.log("CONNECTED");
});

socket.on("disconnect", (reason) => {
  console.log(reason);
});

process.on("exit", () => {
  console.log("EXITING");
  socket.off("buy");
  socket.off("sell");
});
