import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, Image } from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import yelp from '../api/yelp';

type Params = {
  id: string;
};

type Props = {
  navigation: NavigationScreenProp<NavigationState, Params>;
};

type Result = {
  name: string;
  photos: string[];
};

const ResultsShowScreen: React.FC<Props> = ({ navigation }) => {
  const [result, setResult] = useState<Result | null>(null);
  const id = navigation.getParam('id', '');

  const getResult = async (id: string) => {
    const response = await yelp.get(`/${id}`);
    setResult(response.data);
  };

  useEffect(() => {
    getResult(id);
  }, []);

  if (!result) {
    return null;
  }

  return (
    <View>
      <Text>{result.name}</Text>
      <FlatList
        data={result.photos}
        keyExtractor={(photo) => photo}
        renderItem={({ item }) => {
          return <Image style={styles.image} source={{ uri: item }} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 200,
    borderRadius: 4,
    marginBottom: 5,
  },
});

export default ResultsShowScreen;
