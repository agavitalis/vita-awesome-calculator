import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';


export default class App extends Component {

  constructor(){
    super();

    this.state = {
      inputText : '',
      outputText: ''
    }

    this.operations = ['Del', '+', '-', '/', '*']
  }
  
  calculateResult(){
    const text = this.state.inputText
    //now parse this text with this trick, and insert in the output text
    this.setState({
      outputText:eval(text)
    })
    
  }

  validate(){
    //check the last input, to know if its an operator, we can still use pop()
    const text = this.state.inputText
    switch(text.slice(-1)){
      case '+':
      case '-':
      case '/':
      case '*':
        return false
    }

    return true
  }

  buttonPressed(text){
    //check for the equal sign was pressed, and also validate before processing it
    if(text == '='){
       return this.validate() && this.calculateResult()
    }
   //update the text in the input
   this.setState({ 
     inputText: this.state.inputText + text
   })
  }

  operate(operation){
    switch(operation){
      case'Del':
        //split the array and remove the last elememt
        let text = this.state.inputText.split("")
        text.pop()
        this.setState({
          inputText: text.join("")
        })
        break;

      case '+':
      case '-':
      case '/':
      case '*':
        //check the last character against its index, to prevent double entry
        const lastChar = this.state.inputText.split('').pop()
        if(this.operations.indexOf(lastChar) > 0) return

        if(this.state.inputText == '') return
          this.setState({
            inputText:this.state.inputText + operation
          })
    }

  }
  render() {

    //Lest use loops to generate the buttons for better clean code
    //create an array to hold the values
    let number_rows = []
    let numbers = [[1, 2, 3], [4, 5, 6], [7, 8, 9], ['.', 0, '=']]
    for (let i = 0; i < 4; i++) {
      let row = []
      for (let j = 0; j < 3; j++) {

        row.push(
        <TouchableOpacity key={numbers[i][j]} style={styles.buttons} onPress={()=>this.buttonPressed(numbers[i][j])}>
          <Text style={styles.button_text}>{numbers[i][j]}</Text>
        </TouchableOpacity>
        )

      }

      number_rows.push(<View key={i} style={styles.row}>
        {row}
      </View>
      )

    }

    //for the functions
    let opp_rows = []
    for (let i = 0; i < 5; i++) {
      opp_rows.push(
        <TouchableOpacity key={this.operations[i]} sstyle={styles.buttons} onPress={()=>this.operate(this.operations[i])} >
          <Text style={styles.button_text}>{this.operations[i]}</Text>
        </TouchableOpacity>
      )
    }

    return (
      <View style={styles.container}>
        <View style={styles.intro}>
          <Text style={styles.introText}>Vita Awesome Calculator</Text>
        </View>
        <View style={styles.screenInput}>
          <Text style={styles.screenInputText}>{this.state.inputText}</Text>
        </View>
        <View style={styles.screenOutput}>
          <Text style={styles.screenOutputText}>{this.state.outputText}</Text>
        </View>
        <View style={styles.inputs}>
          <View style={styles.inputNumbers}>
            {number_rows}
          </View>
          <View style={styles.inputFunctions}>
            {opp_rows}
          </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  intro:{
    flexGrow: 0.1
  },
  introText:{
    textAlign: 'center'
  },
  screenInput: {
    flex: 2,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 10
  },
  screenInputText: {
    fontSize: 45,
  },
  screenOutput: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    justifyContent: 'center',
    paddingRight: 10
  },
  screenOutputText: {
    fontSize: 25,
    textAlign: 'right'
  },

  inputs: {
    flexGrow: 3.5,
    flexDirection: 'row',
  },
  inputNumbers: {
    flex: 3,
    backgroundColor: '#444444'
  },
  inputFunctions: {
    flex: 1,
    backgroundColor: '#636363',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',

  },
  buttons: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',

  },
  button_text: {
    fontSize: 25,
    color: 'white'
  }

});
