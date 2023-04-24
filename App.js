
import { Animated, PanResponder, FlatList, StyleSheet, Text, View, TextInput, Button, ItemSeparatorComponent, Pressable, ScrollView } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';


function resolveMove(props) {
  console.log("in resolveMove");
  const tempArray = [...props.tileArray];
  changeColor(props.id);

  const numColumns = Math.sqrt(tempArray.length); //get number of columns
  const top = props.id - numColumns;//get id for top neighbor
  const bottom = props.id + numColumns;//get id for bottom neighbor
  const left = props.id - 1; //get id for left neighbor
  const right = props.id + 1; //get id for right neighbor
  const leftEdgeCheck = props.id % numColumns;//if clicked box is in leftmost column, value = 0
  const rightEdgeCheck = right % numColumns;//if clicked box is in rightmost column, value = 0

  //Check if neighbors exist on grid.  If they do, change boolean for color determination
  if (top >= 0) {
    changeColor(top);
  }
  if (bottom < (numColumns * numColumns)) {
    changeColor(bottom);
  }
  if (leftEdgeCheck !== 0) {//clicked box is not in leftmost column
    changeColor(left);
  }
  if (rightEdgeCheck !== 0) {//clicked box is not in the rightmost column
    changeColor(right);
  }
  function changeColor(id) {
    if (tempArray[id].value) {
      tempArray[id] = { id: id, value: false };
    }
    else {
      tempArray[id] = { id: id, value: true };
    }
  }
  let darkCo = 0;
console.log(tempArray[0]);
console.log(tempArray[0].value);
  for (let newItemCo = 0; newItemCo < (numRows * numRows); newItemCo++) {
    console.log('debug: ', newItemCo, tempArray[newItemCo])
    if (tempArray[newItemCo] && tempArray[newItemCo].value) {
      darkCo++;
    };
  };
  props.setTileArray(tempArray);
  console.log("In resolveMove numRows = " + numRows);
  console.log("darkCo = " + darkCo);
  if (darkCo === (numRows * numRows)) {
    return (
      <View style={{ fontSize: 50 }}>YOU WIN!</View>
    )
  }
}

//need some CSS
function GameTile(props) {
  let tileColor;
  //console.log("In GameTile.  props id = " + props.id);
  //console.log(props.tileArray);
  console.log("props.tileArray[props.id] = " + props.tileArray[props.id].id + "  props.tileArray[props.id].value = " + props.tileArray[props.id].value);
  if (props.tileArray[props.id].value) {
    //tile is purple
    tileColor = 'orange';
  }
  else {
    //tile is white
    tileColor = 'white';
  }
  console.log("tileColor = " + tileColor);
  return (
    <View style={{ backgroundColor: tileColor, borderWidth: 5, borderColor: 'white', height: 75, width: 75 }}>
      <Pressable
        style={{
          width: 75,
          height: 75,
          zIndex: 1000,
        }}
        onPress={() => {
          resolveMove(props);
        }
        }></Pressable>
    </View>
  )
}



function GameBoard(props) {
  console.log("In GameBoard. numRows = " + props.numRows);
  const [tileArray, setTileArray] = useState([]);
  //set up gameboard here
  const numRows = 3;
  useEffect(() => {
    //console.log('STARTING USEEFFECT');
    let tempArray = [];
    let id;
    let value;
    for (let itemCo = 0; itemCo < (numRows * numRows); itemCo++) {
      id = itemCo;//set item number
      let randNum = Math.floor(Math.random() * 2);
      if (randNum < 1) {
        value = true;
      }
      else {
        value = false;
      }
      tempArray.push({ id: id, value: value })
    }
    setTileArray(tempArray);
  }, []);
  let darkCo = 0;
if (tileArray.length > 1){
  for (let newItemCo = 0; newItemCo < (numRows * numRows); newItemCo++) {
    //console.log("IN GAMEBOARD");
    //console.log(tileArray);
    if (tileArray[newItemCo].value) {
      darkCo++;
    }
  }
}
  if (darkCo < (numRows * numRows)) {
    return (
      <View style={{
        alignItems: 'center',
      }}>
        <FlatList
          scrollEnabled={false}
          data={tileArray}
          numColumns={3}
          key={3}
          renderItem={({ item }) => <GameTile id={item.id} tileArray={tileArray} setTileArray={setTileArray} />}
        />
      </View>
    );
  }
  else {
    return (
      <Text style={{ fontSize: 50, fontColor: 'black', zIndex: 1100 }}>YOU WIN</Text>
    )
  }
}




function Fullpage() {//onPress go to GameBoard
  [numRows, changeNumRows] = useState(3);
  return (
    <GameBoard numRows={numRows} />
  );
}

/*<TextInput title="Enter Number of Rows here" keyboardType='number-pad' value={numRows} onChangeText={changeNumRows}></TextInput>
<Button title="Press to Start" onPress={() => {changeNumRows(numRows);
}}></Button>*/

export default function App() {

  return (
    <Fullpage />


  );
}
const styles = StyleSheet.create({
  box: {
    flex: 1,

  },
  container: {
    display: 'grid',
    gridTemplateColumns: 5,

  },
});