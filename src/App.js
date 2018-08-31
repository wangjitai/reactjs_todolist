import axios from "axios";
import React, { Component } from "react";
import logo from "./TODO_Logo_black.png";
import LoadingGif from "./loader.gif";
import "./App.css";
import ListItem from "./ListItem";

class App extends Component {
  constructor() {
    super();
    this.state = {
      newTodo: "",
      editing: false,
      editingIndex: null,
      notification: null,
      todos: [],
      loading: true
    };

    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);

    this.apiUrl = "https://5b889b661863df001433e810.mockapi.io";
  }

  async componentDidMount() {
    const response = await axios.get(`${this.apiUrl}/todos`);
    console.log(response);
    setTimeout(() => {
      this.setState({
        todos: response.data,
        loading: false
      });
    }, 1000);
  }

  handleChange = e => {
    this.setState({
      newTodo: e.target.value
    });
    console.log(e.target.name, e.target.value);
  };

  // generateTodoId = () => {
  //   const lastTodo = this.state.todos[this.state.todos.length - 1];
  //   if (lastTodo) {
  //     return lastTodo.id + 1;
  //   }
  //   return 1;
  // };

  async addTodo(e) {
    // console.log("1");
    // const newTodo = {
    //   name: this.state.newTodo,
    //   id: this.generateTodoId()
    // };

    const response = await axios.post(`${this.apiUrl}/todos`, {
      name: this.state.newTodo
    });

    console.log(response);

    const todos = this.state.todos;
    todos.push(response.data);

    this.setState({
      todos: todos,
      newTodo: ""
    });

    this.alert("Todo added successfully.");
  }

  editTodo = index => {
    const todo = this.state.todos[index];
    this.setState({
      editing: true,
      newTodo: todo.name,
      editingIndex: index
    });
  };

  async updateTodo() {
    const todo = this.state.todos[this.state.editingIndex];

    const response = await axios.put(`${this.apiUrl}/todos/${todo.id}`, {
      name: this.state.newTodo
    });

    // todo.name = this.state.newTodo;
    const todos = this.state.todos;
    todos[this.state.editingIndex] = response.data;
    this.setState({
      todos: todos,
      editing: false,
      editingIndex: null,
      newTodo: ""
    });
    this.alert("Todo update successfully.");
  }

  alert = notification => {
    this.setState({
      notification
    });
    setTimeout(() => {
      this.setState({
        notification: null
      });
    }, 1200);
  };

  async deleteTodo(index) {
    // console.log(index);
    const todos = this.state.todos;
    const todo = this.state.todos[index];
    await axios.delete(`${this.apiUrl}/todos/${todo.id}`);

    delete todos[index];

    this.setState({
      todos: todos
    });
    this.alert("Todo deleted successfully.");
  }

  render() {
    return (
      <div className="App">
        <header className="App-header bg-success">
          <img
            style={{
              width: "300px"
            }}
            src={logo}
            className="mb-3"
            alt="logo"
          />
          <h1 className="App-title">STAN_TODOLIST</h1>
        </header>

        <div className="container">
          {this.state.notification && (
            <div className="alert mt-4 alert-success">
              <p className="text-center">{this.state.notification}</p>
            </div>
          )}

          <input
            name="todo"
            type="text"
            className="my-4 form-control"
            placeholder="Add a new todo"
            onChange={this.handleChange}
            value={this.state.newTodo}
          />

          <button
            className="btn-success mb-3 form-control"
            onClick={this.state.editing ? this.updateTodo : this.addTodo}
            disabled={this.state.newTodo.length < 2}
          >
            {this.state.editing ? "Update todo" : "Add todo"}
          </button>

          {this.state.loading && <img src={LoadingGif} alt="loading" />}

          {(!this.state.editing || this.state.loading) && (
            <ul className="list-group">
              {this.state.todos.map((item, index) => {
                return (
                  <ListItem
                    key={item.id}
                    item={item}
                    editTodo={() => this.editTodo(index)}
                    deleteTodo={() => this.deleteTodo(index)}
                  />
                );
              })}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default App;
