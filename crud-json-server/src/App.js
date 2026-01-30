import React from "react";
import Lists from "./Lists";

class App extends React.Component {
  constructor(props) {
    super(props);

    // local state (课件说 constructor 里已定义)
    this.state = {
      loading: true,
      alldata: [],
      error: null
    };
  }

  // handler: called by onClick
  getLists = () => {
    this.setState({ loading: true, error: null });

    fetch("http://localhost:5000/posts")
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Request failed: ${res.status} ${res.statusText}`);
        }
        return res.json();
      })
      .then((result) => {
        this.setState({
          loading: false,
          alldata: result
        });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          loading: false,
          error: err.message || "Unknown error"
        });
      });
  };

  render() {
    const { loading, alldata, error } = this.state;

    return (
      <div className="container" style={{ paddingTop: "24px" }}>
        {/* title bar (你课件里有这个 span) */}
        <span className="title-bar" style={{ display: "block", marginBottom: "12px" }}>
          <h2 style={{ margin: 0 }}>CRUD JSON Server Demo</h2>
        </span>

        {/* button (课件红框) */}
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.getLists}
          style={{ marginBottom: "16px" }}
        >
          Get Lists
        </button>

        {/* status */}
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* call child component (把 state 传给 Lists) */}
        {!loading && !error && <Lists alldata={alldata} />}
      </div>
    );
  }
}

export default App;
