import { View, Text, Image, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import Icon from '../assets/adaptive-icon.png'; // Assuming you have an icon image
import { image500 } from 'api/moviesdb';

var {width} = Dimensions.get('window');

export default function TrendingMovies({ data }) {
  const navigation = useNavigation();

  const handleClick = (item) => {
    navigation.navigate('Movie', item)
  };

  return (
    <View className="mb-6">
      <Text className="mx-2 mb-2 text-xl text-white">Trending</Text>
      <Animated.FlatList
        data={data}
        renderItem={({ item }) => <MovieCard item={item} handleClick={handleClick} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      />
    </View>
  );
}

const MovieCard = ({ item, handleClick }) => {
  return (
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <View className="mx-2 flex-1 items-center rounded-lg">
        <Image
          source={{uri: image500(item.poster_path)}}
          style={{
            width: width * 0.5, // Adjust width as needed
            height: width * 0.5 * 1.5, // Maintain aspect ratio, adjust height as needed
            borderRadius: 10,
          }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}