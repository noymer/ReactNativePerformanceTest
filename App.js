/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PureComponent } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  ScrollView
} from 'react-native';

let itemid = 1
class Item extends PureComponent {
  itemid

  constructor(props) {
    super(props)
    this.itemid = itemid
    itemid++
  }
  render() {
    const id = this.props.id

    console.log('pure nokey itemid:' + this.itemid + ' id:' + id)
    return (
      <View>
        <Text>{id}</Text>
        {/*
        <Text>ここがすごい複雑の場合はどうなるの？\nこんな感じだったらおかしいのかな？</Text>
        <Text>じゅげむここがすごい複雑の場合はどうなるの？\nこんな感じだったらおかしいのかな？</Text>
        <Text>ここがaaaすごい複雑の場合はどうなるの？\nこんな感じだったらおかしいのかな？</Text>
        */}
      </View>
    )
  }
}

const timerIsOn = false

export default class App extends Component {
  timetoken

  constructor(props) {
    super(props)
    this.state = {
      keyIsOn: true,
      ids: [1,2,3],
    }
  }

  toggleKey = () => {
    this.setState({
      keyIsOn: !this.state.keyIsOn,
    })
  }

  handlePress = () => {
    const ids = this.state.ids
    const newids = [...ids]
    newids.shift()
    const maxid = Math.max(...ids)
    if (maxid % 2 === 0) {
      this.setState({
        ids: [...newids, maxid + 1],
      })
    } else {
      this.setState({
        ids: [maxid + 1, ...newids],
      })
    }
    /* 
    const newids = Array.from({length: 1000}, (v, k) => k + maxid + 1)
    this.setState({
      ids: [...ids, ...newids],
    })
    */
  }

  componentWillMount() {
    if (timerIsOn) {
      this.timetoken = setInterval(() => {
        this.setState(prevState => {
          const ids = prevState.ids
          const maxid = Math.max(...ids)
          const newids = Array.from({ length: 1000 }, (v, k) => k + maxid + 1)
          return {
            ids: [...ids, ...newids],
          }
        })
      })
    }
  }

  conponentWillUnmount() {
    if (timerIsOn) {
      clearInterval(this.timetoken)
    }
  }

  render() {
    const maxid = Math.max(...(this.state.ids))
    console.log('render max id:' + maxid)

    return (
      <View style={styles.container}>
        <Button
          onPress={this.toggleKey}
          title={this.state.keyIsOn ? 'キーを無効化' : 'キーを有効化'}
        />
        <TouchableOpacity
          onPress={this.handlePress}
        >
          <Text>タップして要素を変更</Text>
        </TouchableOpacity>
        <ScrollView>
          {this.state.ids.map((id) => {
            if (this.state.keyIsOn) {
              return <Item id={id} key={id}/>
            }
              return <Item id={id}/>
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
