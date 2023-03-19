import React, { useEffect, useState } from "react";
import { useSocket } from "./providers/SocketProvider";
import ForexEvents from "./ForexEvents";
const App = () => {
  const { buy, sell } = useSocket();
  const [amount, setAmount] = useState("");

  return (
    <div className="bg-black text-white">
      <header className="App-header">Trader</header>
      <div className="grid grid-cols-2">
        <ForexEvents />
        <div>
          <div>Lets win!!</div>
          <div>
            <input
              value={amount}
              className="text-black"
              placeholder="Enter your amount"
              type="number"
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div>
            <button
              className="bg-green-600 hover:bg-green-800 rounded-full text-white p-4"
              onClick={() => buy(amount)}
            >
              Buy
            </button>
            <button
              className="bg-red-600 hover:bg-red-800 rounded-full text-white p-4"
              onClick={() => sell(amount)}
            >
              Sell
            </button>
          </div>
        </div>
      </div>
      <footer></footer>
    </div>
  );
};

export default App;
