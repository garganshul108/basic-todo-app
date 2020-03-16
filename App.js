
import React from 'react';
import {
  View,
  ScrollView,
  ActivityIndicator
} from 'react-native';

import {
  Text,
  CheckBox,
  Divider,
  Header,
  SearchBar,
  Icon
} from 'react-native-elements';


const LineBreak = () => <View><Text>{"\n"}</Text></View>;

const LoadingIcon = () => <ActivityIndicator size="large" color="#0000ff" animating={true} />;

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
          <View style={{ flex: 6 }}>
            <Text h4>{todo.id}: </Text>
          </View>
          <View style={{ flex: 20, marginHorizontal: 10 }}>
            <Text>{todo.title}</Text>
          </View>
          <View>
            <CheckBox
              checked={todo.completed} />
          </View>
        </View>
        <Divider />
      </Todo>
    );
  }

  render() {
    return (
      <View style={{ width: '100%' }}>
        <Header
          leftComponent={<Icon color='white' name='list' />}
          centerComponent={{ text: 'TODO APP', style: { fontWeight: 'bold', color: '#fff' } }}
          rightComponent={{ icon: '', color: '#fff' }}
        />
        <SearchBar
          platform="ios"
          placeholder="Type Here..."
        />
        <Divider />
        <ScrollView>
          {this.state.todos.length <= 0 && <><LineBreak /><LoadingIcon /></>}
          {this.state.todos.length > 0 && this.state.todos.map(todo => this.generateTodoTemplate(todo))}
        </ScrollView>
        <LineBreak />
      </View>
    );
  }
}


export default App;
