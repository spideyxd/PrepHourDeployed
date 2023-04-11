import "./stylesheets/App.css";
import Banner from "./components/Banner";
import Header from "./components/Header";
import "./stylesheets/App.css";

function App() {
  return (
    <>
      <div
        style={{ display: "flex", flexDirection: "column" }}
        className="body"
      >
        <Header />
        <Banner />
      </div>
    </>
  );
}

export default App;
