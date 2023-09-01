import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import SearchBar from '../components/SearchBar';
import useResults from '../hooks/useResults';
import ResultsList from '../components/ResultsList';

type Result = {
    id: string;
    image_url: string;
    name: string;
    rating: number;
    review_count: number;
    price: string;
  };
  

const SearchScreen: React.FC = () => {
  const [term, setTerm] = useState<string>('');
  const [searchApi, results, errorMessage] = useResults();
  console.log(results);

  const filterResultsByPrice = (price: string) => {
    return results.filter((resultItem: Result) => {
      return resultItem.price === price;
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'lightyellow' }}>
      <SearchBar term={term} onTermChange={setTerm} onTermSubmit={() => searchApi(term)} />
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      <ScrollView>
        <ResultsList results={filterResultsByPrice('$')} title="Cost Effective" />
        <ResultsList results={filterResultsByPrice('$$')} title="Bit Pricier" />
        <ResultsList results={filterResultsByPrice('$$$')} title="Big Spender" />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SearchScreen;
