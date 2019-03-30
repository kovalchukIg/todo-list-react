import React from 'react';
import TodoList from "./components/todoList/todoList";
import Header from "./components/header/header";
import Filters from "./components/filters/filters";
import style from "./app.module.css";

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items: JSON.parse(localStorage.getItem("items")) || [],
      text: "",
      filter: localStorage.getItem("filterItems") || "all"
    };
    this.inputRef = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onHandlerChange = this.onHandlerChange.bind(this);
    this.getFilterState = this.getFilterState.bind(this);
  }

    componentDidMount(){
        this.inputRef.current.focus();
    }


    onHandlerChange(e){
    this.setState({
        text: e.target.value.trim()
    })
    }


    handleSubmit(e){
      e.preventDefault();
      if(!this.state.text.length) {
        return;
      }
      const newItem = {
        text: this.state.text,
        id: Date.now(),
        completed: false
      };
      this.setState(state => ({
        items: state.items.concat(newItem),
        text: "",
      }), () => localStorage.setItem("items", JSON.stringify([...this.state.items])));

    this.inputRef.current.focus();
    }

    deleteItem(index){
      const removeItem = [...this.state.items];
      removeItem.splice(index.id, 1);
      this.setState({
          items: removeItem
      }, () => localStorage.setItem("items", JSON.stringify([...this.state.items])));
    }

    handlerCompleted(id){

      const currentTodoIndex = this.state.items.findIndex(i => i.id === id);

      if(currentTodoIndex === -1){
        return
      }

      const todo = {...this.state.items[currentTodoIndex]};

      todo.completed = !todo.completed;

      const newTodos = [...this.state.items];
       newTodos[currentTodoIndex] = todo;

       this.setState({
           items: newTodos
       },() => localStorage.setItem("items", JSON.stringify([...this.state.items])));
    }

    getFilterState(e){
      const filters = e.target.value;
      this.setState({
          filter: filters
      }, () => localStorage.setItem("filterItems", this.state.filter));
    }


  render() {
    return (
      <div className={style.borderRadius}>
      <Header
          handleSubmit={this.handleSubmit}
          onHandlerChange={this.onHandlerChange}
          text={this.state.text}
          inputRef={this.inputRef}
      />
          <ul>
          {this.state.items.map((item) => (
              <TodoList
                  key={item.id}
                  stateCompleted={item.completed}
                  deleteItem={this.deleteItem.bind(this, item.id)}
                  id={item.id}
                  text={item.text}
                  handlerCompleted={this.handlerCompleted.bind(this, item.id)}
                  stateFilter={this.state.filter}
              />
              ))}
              </ul>
        <Filters
            getFilterState={this.getFilterState}
        />

      </div>
    );
  }
}

export default App;
