import http from "http";
import { Server } from "socket.io";
import { EventEmitter } from "node:events";
import { PrismaClient } from "@prisma/client";

// import { createAdapter } from "@socket.io/cluster-adapter";
// import { setupWorker } from "@socket.io/sticky";
// import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from 'redis';

const prisma = new PrismaClient();

class SystemEmitter extends EventEmitter {}

const systemEmitter = new SystemEmitter();
systemEmitter.on("event", () => {
  console.log("an event occurred!");
});

systemEmitter.emit("event");

const httpServer = http.createServer();

const CURRENCY_PAIRS = [
  "EUR/USD",
  "USD/JPY",
  "GBP/USD",
  "USD/CHF",
  "AUD/USD",
  "USD/CAD",
  "NZD/USD",
];


const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:4001", "http://172.16.0.50:4001", "http://192.168.193.129:4001"],
    methods: ["GET", "POST"],
  },
});

// io.adapter(createAdapter());
// setupWorker(io);

const marketOpeningSymbols = [
  {
    name: "APPL",
    basePrice: 50,
    noOfSharesSold: 0,
    noOfShares: 100000,
  },
  {
    name: "GOOGL",
    basePrice: 50,
    noOfSharesSold: 0,
    noOfShares: 100000,
  },
  {
    name: "MSFT",
    basePrice: 50,
    noOfSharesSold: 0,
    noOfShares: 100000,
  },
  {
    name: "NTFLX",
    basePrice: 50,
    noOfSharesSold: 0,
    noOfShares: 100000,
  },
  {
    name: "MAPK",
    basePrice: 50,
    noOfSharesSold: 0,
    noOfShares: 100000,
  },
];

const users = [
  {
    id: 1,
    token: 1,
    name: "Bot1",
    balance: 100000,
    symbols: [],
  },
  {
    id: 2,
    token: 2,
    name: "Bot2",
    balance: 100000,
    symbols: [],
  },
  {
    id: 3,
    token: 3,
    name: "Bot3",
    balance: 100000,
    symbols: [],
  },
  {
    id: 4,
    token: 4,
    name: "Bot4",
    balance: 100000,
    symbols: [],
  },
  {
    id: 5,
    token: 5,
    name: "Alex",
    balance: 100000,
    symbols: [],
  },
];

const isVerified = (token) => {
  let verified = false;
  users.forEach((user) => {
    if (user.token == token) {
      verified = true;
      return;
    }
  });
  return verified;
};

const getUser = (token) => {
  let user = null;
  users.forEach((u) => {
    if (u.token == token) {
      user = u;
      return;
    }
  });
  return user;
};

const handleBuy = (socket) => {

}

const handleSell = (socket) => {

}

const handleSubscibe = (socket, payload) => {

}

const handleUnSubscribe = (socket, payload) => {

}

const handleAuth = (socket,payload) => {

}

io.use((socket, next) => {
  const token = socket.handshake?.auth?.token;
  if (isVerified(token)) {
    socket.user = getUser(token);
    next();
  } else {
    next(new Error("Authentication error"));
  }
}).on("connection", (socket) => {
  console.log("CONNECTION");
  io.emit(
    "pairs",
    "The euro and US dollar: EUR/USD. The US dollar and Japanese yen: USD/JPY. The British pound sterling and US dollar: GBP/USD. The US dollar and Swiss franc: USD/CHF. The Australian dollar and US dollar: AUD/USD. The US dollar and Canadian dollar: USD/CAD. The New Zealand dollar and US dollar: NZD/USD."
  );

  socket.on("balance/check", (args) => {
    socket.id;
  });

  socket.on("message", (data) => {
    payload = JSON.parse(data);
  });

  socket.on("action", (args) => {
    switch(args.action) {
      case "subscribe": handleSubscibe(socket, payload);
      case "unsubscribe": handleUnSubscribe(socket, payload);
    }
  });

  socket.on(`pairs/${CURRENCY_PAIRS}`, (args, callback) => {
    console.log(args);
  });

  socket.on("buy", (args, callback) => {
    console.log("BUY");
    io.emit('prices', `User ${socket.user.id} bought stock worth of ${args.amount}`);
    console.log(args);
  });

  socket.on("sell", (args, callback) => {
    console.log("SELL");
    io.emit('prices', `User ${socket.user.id} bought stock worth of ${args.amount}`);
    // socket.broadcast.emit('prices', `User ${socket.user.id} sold stock worth of ${args.amount}`);
    console.log(args);
  });

  socket.on("event", (args, callback) => {});
  socket.on("disconnect", () => {
  });
});

httpServer.listen(4000);
// const pubClient = createClient({url: "redis://172.16.42.194:6379"});
// const subClient = pubClient.duplicate();

// Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
//   io.adapter(createAdapter(pubClient, subClient));
//   httpServer.listen(4000);  
// })


