import React from 'react';
import { Text, StyleSheet, View, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';

type Props = {
  term: string;
  onTermChange: (term: string) => void;
  onTermSubmit: () => void;
};

const SearchBar: React.FC<Props> = ({ term, onTermChange, onTermSubmit }) => {
  return (
    <View style={styles.background}>
      <Feather name="search" style={styles.iconStyle} />
      <TextInput
        style={styles.inputStyle}
        placeholder="Search"
        value={term}
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={onTermChange}
        onEndEditing={onTermSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    marginTop: 15,
    backgroundColor: 'lightgrey',
    height: 50,
    borderRadius: 5,
    marginHorizontal: 15,
    flexDirection: 'row',
    fontSize: 25,
    marginBottom: 10,
  },
  inputStyle: {
    borderColor: 'black',
    fontSize: 15,
    flex: 1,
  },
  iconStyle: {
    fontSize: 35,
    alignSelf: 'center',
    marginHorizontal: 15,
  },
});

export default SearchBar;
