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
      filter: localStorage.getItem("filterItems") || "all",
      startDate: new Date()
    };
    this.inputRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);
    this.getFilterState = this.getFilterState.bind(this);
  }
    componentDidMount(){
        this.inputRef.current.focus();
    }

    handleChange(date) {
        this.setState({
            startDate: date
        });
    }

    onHandleChange(e){
    this.setState({
        text: e.target.value.trim()
    })
    }


    handleSubmit(e){
      e.preventDefault();
      if(!this.state.text.length) {
        return;
      }
      const newDate = this.state.startDate;

      const newItem = {
        text: this.state.text,
        id: Date.now(),
        currentDate: newDate.toDateString(),
        completed: false
      };

      console.log(this.state.startDate);
      console.log(newItem.currentDate);
      this.setState(state => ({
        items: state.items.concat(newItem),
        text: "",
      }), () => localStorage.setItem("items", JSON.stringify([...this.state.items])));

    this.inputRef.current.focus();
    }

    deleteItem(index){
      const removeItem = [...this.state.items];
      removeItem.splice(index, 1);
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
          onHandleChange={this.onHandleChange}
          text={this.state.text}
          inputRef={this.inputRef}
          select={this.state.startDate}
          change={this.handleChange}
      />
          <ul>
          {this.state.items.map((item, index) => (
              <TodoList
                  key={item.id}
                  stateCompleted={item.completed}
                  deleteItem={this.deleteItem.bind(this, index)}
                  id={item.id}
                  text={item.text}
                  handlerCompleted={this.handlerCompleted.bind(this, item.id)}
                  stateFilter={this.state.filter}
                  date={item.currentDate}
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
