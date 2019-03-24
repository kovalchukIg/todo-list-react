import React from 'react';
import TodoList from "./components/todoList/todoList";
import Header from "./components/header/header"
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      items: [],
      text: "",
      completed: false
    };
    this.inputRef = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onHandlerChange = this.onHandlerChange.bind(this);
  }


    onHandlerChange(e){
    this.setState({
        text: e.target.value
    })
    }


    handleSubmit(e){
      e.preventDefault();
      if(!this.state.text.length) {
        return;
      }
      const newItem = {
        text: this.state.text,
        id: Date.now()
      };
      this.setState(state => ({
        items: state.items.concat(newItem),
        text: "",
        completed: false
      }));

    this.inputRef.current.focus();
    }

    deleteItem(index){
      const removeItem = [...this.state.items];
      removeItem.splice(index, 1);
      this.setState({
          items: removeItem
      })
    }
    componentDidMount(){
      this.inputRef.current.focus();
    }

  render() {
    return (
      <div className="App">
      <Header
          handleSubmit={this.handleSubmit}
          onHandlerChange={this.onHandlerChange}
          text={this.state.text}
          inputRef={this.inputRef}
      />
          {this.state.items.map((item, index) => (
              <TodoList
                  items={this.state.items}
                  deleteItem={this.deleteItem.bind(this, index)}
                  id={index}
                  text={item.text}/>
              ))}
      </div>
    );
  }
}

export default App;
