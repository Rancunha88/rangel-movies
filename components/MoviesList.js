import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme/index';
var { width } = Dimensions.get('window');
import { image342 } from '../api/moviesdb'; // Adjust the import path as necessary

export default function MovieList({ title, movies, hideSeeAll }) {
  const navigation = useNavigation();

  return (
    <View className="my-2 space-y-4">
      <View className="mx-4 mb-4 flex-row items-center justify-between">
        <Text className="text-xl text-white">{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity>
            <Text className="text-sm text-gray-400" style={{ color: theme.background }}>
              See All
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}>
        {movies.map((item, index) => {
          const movieName = item.title || item.name || 'Unknown Title';
          return (
            <TouchableWithoutFeedback key={index} onPress={() => navigation.push('Movie', item)}>
              <View className="mr-4 space-y-2">
                <Image
                  source={{ uri: image342(item.poster_path) }}
                  className="h-48 w-32 rounded-lg"
                  style={{
                    width: width * 0.25, // Adjust width as needed
                    height: width * 0.25 * 1.5, // Maintain aspect ratio, adjust height as needed
                    borderRadius: 10,
                  }}
                />
                <Text className="my-2 ml-1 text-center text-neutral-300">
                  {movieName.length > 20
                    ? movieName.slice(0, 10) + '...'
                    : movieName.length > 14
                      ? require('../theme/supportFunctions').breakAtNearestSpace(movieName, 15)
                      : movieName}
                  {/* {movieName.length > 14
                    ? movieName.slice(0, 10) + '...'
                    : require('../theme/supportFunctions').breakAtNearestSpace(movieName, 15)} */}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
}
