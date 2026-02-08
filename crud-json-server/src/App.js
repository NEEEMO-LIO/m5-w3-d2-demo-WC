import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Lists from "./Lists";
import CreateList from "./CreateList";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      alldata: [],
      loading: false,
      singledata: {
        title: "",
        author: "",
      },
    };
  }

  // GET all
  getLists = () => {
    this.setState({ loading: true });

    fetch("http://localhost:5000/posts")
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          alldata: json,
          loading: false,
        });
      })
      .catch((err) => {
        console.log("GET lists error:", err);
        this.setState({ loading: false });
      });
  };

  // shared onChange handler for Create/Update
  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState((prev) => ({
      singledata: {
        ...prev.singledata,
        [name]: value,
      },
    }));
  };

  // POST create
  createList = () => {
    fetch("http://localhost:5000/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.singledata),
    })
      .then((res) => res.json())
      .then(() => {
        // clear form + refresh list
        this.setState({
          singledata: { title: "", author: "" },
        });
        this.getLists();
      })
      .catch((err) => console.log("POST error:", err));
  };

  // GET single item by id (for Update modal preload)
  getList = (event, id) => {
    // optional: prevent default if needed
    if (event && event.preventDefault) event.preventDefault();

    // show loading text in modal fields while fetching
    this.setState({
      singledata: { title: "Loading...", author: "Loading..." },
    });

    fetch(`http://localhost:5000/posts/${id}`)
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          singledata: {
            title: json.title ?? "",
            author: json.author ?? "",
          },
        });
      })
      .catch((err) => console.log("GET single error:", err));
  };

  // PUT update
  updateList = (event, id) => {
    if (event && event.preventDefault) event.preventDefault();

    fetch(`http://localhost:5000/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(this.state.singledata),
    })
      .then((res) => res.json())
      .then(() => {
        // refresh list after update
        this.getLists();
      })
      .catch((err) => console.log("PUT error:", err));
  };

  // DELETE
  deleteList = (event, id) => {
    if (event && event.preventDefault) event.preventDefault();

    fetch(`http://localhost:5000/posts/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        // refresh list after delete
        this.getLists();
      })
      .catch((err) => console.log("DELETE error:", err));
  };

  render() {
    const listTable = this.state.loading ? (
      <p>Loading...</p>
    ) : (
      <Lists
        alldata={this.state.alldata}
        getList={this.getList}
        updateList={this.updateList}
        deleteList={this.deleteList}
        singledata={this.state.singledata}
        handleChange={this.handleChange}
      />
    );

    return (
      <div className="container mt-5">
        <h2 className="mb-3">CRUD JSON Server</h2>

        <button className="btn btn-primary me-2" onClick={this.getLists}>
          Get Lists
        </button>

        <CreateList
          singledata={this.state.singledata}
          handleChange={this.handleChange}
          createList={this.createList}
        />

        <div className="mt-4">{listTable}</div>
      </div>
    );
  }
}

export default App;
