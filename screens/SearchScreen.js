import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { useState } from 'react';
import { searchMovies } from 'api/moviesdb';
import { image500 } from 'api/moviesdb';
import Loading from '../components/Loading';

const { width, height } = Dimensions.get('window');

export default function SearchScreen() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  let movieName = 'The Matrix';

  const fetchSearchResults = async (query) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const response = await searchMovies(query);
      setResults(response.data.results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-neutral-800">
      <View className="mx-4 mb-3 mt-4 flex-row items-center justify-between rounded-full border border-neutral-500">
        <TextInput
          placeholder="Search for movies..."
          placeholderTextColor={'lightgrey'}
          className="mx-2 flex-1 p-2 text-white"
          onChangeText={fetchSearchResults}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          className="m-1 rounded-full bg-neutral-500 p-3">
          <XMarkIcon size={24} color="white" />
        </TouchableOpacity>
      </View>
      {loading ? (
        <Loading />
      ) : (
        <View>
          {/* Results */}
          {results.length > 0 ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 15 }}
              className="space-y-3">
              <Text className="mb-4 ml-1 font-semibold text-white">Results ({results.length})</Text>
              <View className="flex-row flex-wrap justify-between">
                {results.map((item, index) => (
                  <TouchableOpacity key={index} onPress={() => navigation.push('Movie', item)}>
                    <View className="mb-4 space-y-2">
                      <Image
                        className="mb-3 rounded-3xl"
                        // source={{ uri: image500(item.poster_path) || 'https://via.placeholder.com/500x750' }}
                        source={
                          image500(item.poster_path)
                            ? { uri: image500(item.poster_path) }
                            : require('../assets/poster-not-found.jpg')
                        }
                        style={{ width: width * 0.44, height: height * 0.3, resizeMode: 'cover' }}
                      />
                      <Text className="ml-1 text-neutral-300">
                        {item.title.length > 20 ? item.title.slice(0, 20) + '...' : item.title}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          ) : (
            <View className="flex-1 items-center justify-center">
              <Text className="text-neutral-500">No Movies Found</Text>
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}
