import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import yelp from "../api/yelp";

type Result = {
  id: string;
  image_url: string;
  name: string;
  rating: number;
  review_count: number;
  price: string;
};
type YelpApiResponse = {
  businesses: Result[];
  // Add more properties as needed
};

type ApiResponse = {
  data: YelpApiResponse;
};

type HookResponse = [
  (searchTerm: string) => Promise<void>,
  Result[],
  string
];

const useResults = (): HookResponse => {
  const [results, setResults] = useState<Result[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const searchApi = async (searchTerm: string): Promise<void> => {
    try {
      const response: ApiResponse = await yelp.get("/search", {
        params: {
          limit: 50,
          term: searchTerm,
          location: "san jose",
        },
      });
      setResults(response.data.businesses);
    } catch (error) {
      setErrorMessage("something went wrong");
      //console.log(error);
    }
  };

  useEffect(() => {
    searchApi("pasta");
  }, []);

  return [searchApi, results, errorMessage];
};

export default useResults;
