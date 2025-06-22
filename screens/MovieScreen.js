import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image,
} from 'react-native';
import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/outline';
import AntDesign from '@expo/vector-icons/AntDesign';
import { LinearGradient } from 'expo-linear-gradient';
import { styles, theme } from '../theme/index';
import { getMovieDetails, getMovieCredits, getSimilarMovies } from 'api/moviesdb';
import { image500 } from 'api/moviesdb';
import MoviesList from '../components/MoviesList';
import Loading from '../components/Loading';
import Cast from '../components/Cast';
import HomeLink from '../components/HomeLink';

var { width, height } = Dimensions.get('window');
const ios = Platform.OS == 'ios';
const topMargin = ios ? '' : ' mt-3';

export default function MovieScreen() {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  const [isFavorite, toggleFavorite] = useState(false);
  const [cast, setCast] = useState([1, 2, 3, 4, 5]);
  const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4, 5]);
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    setLoading(true);
    fetchMovieDetails(item.id);
    fetchMovieCredits(item.id);
    fetchSimilarMovies(item.id);
  }, [item]);

  const fetchMovieDetails = async (id) => {
    try {
      const response = await getMovieDetails(id);
      setMovie(response.data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMovieCredits = async (id) => {
    try {
      const response = await getMovieCredits(id);
      setCast(response.data.cast.slice(0, 5)); // Limit to 5 cast members
    } catch (error) {
      console.error('Error fetching movie credits:', error);
    }
  };

  const fetchSimilarMovies = async (id) => {
    try {
      const response = await getSimilarMovies(id);
      setSimilarMovies(response.data.results.slice(0, 5)); // Limit to 5 similar movies
    } catch (error) {
      console.error('Error fetching similar movies:', error);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 10,
      }}
      className="flex-1 bg-neutral-900 px-2">
      {loading ? (
        <Loading />
      ) : (
        <View>
          <View className="w-full">
            <SafeAreaView className="absolute z-20 w-full flex-row items-center justify-between px-2 py-2">
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.background}
                className="rounded-xl p-1">
                <ChevronLeftIcon size="30" strokeWidth={2.5} color="white" />
              </TouchableOpacity>
              <HomeLink navigation={navigation} />
              <TouchableOpacity onPress={() => toggleFavorite(!isFavorite)}>
                {/* <HeartIcon size="35" color={isFavorite ? theme.background : 'white'} /> */}
                <AntDesign name="heart" size={35} color={isFavorite ? theme.background : 'white'} />
              </TouchableOpacity>
            </SafeAreaView>
            {/* Movie Poster */}
            <View style={{ width: '100%', position: 'relative' }}>
              <Image
                // source={{ uri: image500(movie?.poster_path) }}
                source={
                  movie.poster_path
                    ? { uri: image500(movie.poster_path) }
                    : require('../assets/poster-not-found.jpg')
                }
                style={{
                  width: width,
                  marginLeft: -10,
                  height: width * 1.5, // 1.5x aspect ratio
                  resizeMode: 'cover',
                }}
              />
              <LinearGradient
                colors={['rgba(23,23,23,1)', 'transparent']}
                start={{ x: 0.5, y: 1 }} // Start at bottom center
                end={{ x: 0.5, y: 0 }} // End at top center of the gradient
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: -10,
                  right: -10,
                  height: '24%', // 24% of the image's height
                  zIndex: 1,
                }}
              />
            </View>
            {/* Movie Details */}
            <View style={{ marginTop: -(height * 0.09), zIndex: 2 }} className="my-4 space-y-3">
              {/* Title */}
              <Text className="mt-4 text-center text-3xl font-bold tracking-wider text-white">
                {movie?.title || ''}
              </Text>
              {/* Status, Release, Runtime */}
              <Text className="my-4 text-center text-base font-semibold text-neutral-400">
                {movie?.status || ''} •{' '}
                {new Date(movie?.release_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}{' '}
                • {movie?.runtime ? `${movie.runtime} min` : ''}
              </Text>
              {/* Genres */}
              <View className="mx-4 flex-row justify-center space-x-2">
                <Text className="text-center text-base font-semibold text-neutral-400">
                  {movie?.genres?.map((genre, index) => (
                    <Text key={index}>
                      {genre.name}
                      {index < movie.genres.length - 1 ? ' • ' : ''}
                    </Text>
                  ))}
                </Text>
              </View>
            </View>
            {/* Description */}
            <Text className="mx-4 text-base font-semibold tracking-wide text-neutral-400">
              {movie?.overview || 'No description available.'}
            </Text>
          </View>
          {/* Cast */}
          <Cast cast={cast} navigation={navigation} />
          {/* Similar Movies */}
          <MoviesList title="Similar Movies" hideSeeAll={true} movies={similarMovies} />
        </View>
      )}
    </ScrollView>
  );
}
