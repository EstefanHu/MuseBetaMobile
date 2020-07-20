import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput
} from 'react-native';

import BottomSheet from 'reanimated-bottom-sheet';
import { TextInput } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.2,
    paddingTop: 5,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 6,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    height: '100%'
  },
});

export const StoryBottomSheet = ({ navigation, story }) => {
  const [search, setSearch] = React.useState('');

  return (
    <BottomSheet
      ref={bs}
      snapPoints={[topHeight, previewHeight, dockHeight]}
      initialSnap={2}
      callbackNode={fall}
      enabledBottomInitialAnimation={true}
      renderHeader={() => <bsHeader search={search} setSearch={setSearch} />}
      renderContent={() => <bsBody />}
    />
  );
};

const bsHeader = ({ search, setSearch }) => {

  return (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle}></View>
      </View>
      <TextInput
        underlineColorAndroid='rgba(0,0,0,0)'
        placeholder="Search"
        onSubmitEditing={() => console.log('testing')}
        value={search}
        onChangeText={text => setSearch(text)}
      />
    </View>
  )
}

const bsBody = () => {

  return (
    <View style={styles.panel}>
      <Text>Hello World</Text>
    </View>
  );
};