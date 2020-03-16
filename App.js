
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  CheckBox
} from 'react-native';


class Todo extends React.Component {

  render() {
    return (
      <View id={this.props.id} style={{ padding: 5 }}>{this.props.children}</View>
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

  generateTodoTemplate = (todo) => {
    return (
      <Todo id={todo.id}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 3 }}>
            <Text>{todo.id}: </Text>
          </View>
          <View style={{ flex: 20, marginHorizontal: 10 }}>
            <Text>{todo.title}</Text>
          </View>
          <View style={{ flex: 3 }}>
            <CheckBox title="done"
              checkedIcon='dot-circle-o'
              uncheckedIcon='circle-o'
              value={todo.completed} />
          </View>
        </View>
      </Todo>
    );
  }

  render() {
    return (
      <View style={{ width: '100%' }}>
        <Text>TODO LIST:</Text>
        <ScrollView>
          {this.state.todos.length <= 0 && <Text>Loading...</Text>}
          {this.state.todos.length > 0 && this.state.todos.map(todo => this.generateTodoTemplate(todo))}
        </ScrollView>
      </View>
    );
  }
}


export default App;
