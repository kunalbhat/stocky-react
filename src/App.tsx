import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const POLYGON_API_KEY = process.env.REACT_APP_POLYGON_API_KEY;

  const [quoteData, setQuoteData] = useState();

  async function fetchQuote() {
    const BASE_URL = "https://api.polygon.io/v2/aggs/ticker/";
    let SYMBOL = "PYPL";

    let FETCH_URL = `${BASE_URL}${SYMBOL}/prev?adjusted=true&apiKey=${POLYGON_API_KEY}`;

    const response = await fetch(FETCH_URL);
    const quote_data = await response.json();

    console.log("Response: ", quote_data);
    setQuoteData(quote_data["results"]);
  }

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="App">
      <header className="app-header">
        <h1 className="logo">Stocky</h1>
      </header>
      <section>
        {quoteData && (
          <ul className="stock-list">
            <li className="stock-list-row">
              <span className="symbol">{quoteData[0]["T"]}</span>
              <span className="close-price">{quoteData[0]["c"]}</span>
            </li>
          </ul>
        )}
      </section>
    </div>
  );
}

export default App;
