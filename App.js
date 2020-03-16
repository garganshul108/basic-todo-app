
import React from 'react';
import {
  View,
  Text,
  ScrollView,
} from 'react-native';

class Todo extends React.Component {

  render() {
    return (
      <Text id={this.props.id}>{this.props.children}</Text>
    );
  }

}

class App extends React.Component {

  state = {
    todos: []
  }

  async componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then(res => res.json())
      .then(res => {
        console.log("Responce Fetched");
        this.setState({ todos: res })
      })
      .catch(e => console.log(e))
  }

  render() {
    return (
      <View><Text>TODO LIST:</Text>
        <ScrollView>
          {this.state.todos.length <= 0 && <Text>Loading...</Text>}
          {this.state.todos.length > 0 && this.state.todos.map(todo => <Todo id={todo.id}>{todo.id}: {todo.title}</Todo>)}
        </ScrollView>
      </View>
    );
  }
}


export default App;
