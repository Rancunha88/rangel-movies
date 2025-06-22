import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { View, Text, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from '../theme';
import TrendingMovies from '../components/TrendingMovies';
import MoviesList from '../components/MoviesList';
import Loading from '../components/Loading';
import { getTrendingVideos, getUpcomingMovies, getTopRatedMovies } from '../api/moviesdb';

const ios = Platform.OS === 'ios';

export default function HomeScreen() {
  const [trending, setTrending] = useState([]);
  const [upComing, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Fetch trending, upcoming, and top-rated movies
        const trendingRes = await getTrendingVideos();
        setTrending(trendingRes.data.results);

        const upcomingRes = await getUpcomingMovies();
        setUpcoming(upcomingRes.data.results);

        const topRatedRes = await getTopRatedMovies();
        setTopRated(topRatedRes.data.results);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  return (
    <>
      <View className="flex-1 bg-neutral-900 px-2">
        {/* Search Bar and Logo */}
        <SafeAreaView className={ios ? '-mb-2' : 'mb-1'}>
          <StatusBar style="light" />
          <View className="mx-4 mt-4 flex-row items-center justify-between">
            <Bars3CenterLeftIcon size="30" color="white" />
            <View className="flex-1 items-center">{title()}</View>
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
              <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        {loading ? (
          <Loading />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 10,
            }}>
            {/* Trending Movies Carousel */}
            <TrendingMovies data={trending} />
            {/* Upcoming Movies Row */}
            <MoviesList title="Upcoming Movies" movies={upComing} />
            {/* Top Rated Movies Row */}
            <MoviesList title="Top Rated Movies" movies={topRated} />
          </ScrollView>
        )}
      </View>
    </>
  );
}

const title = () => {
  return (
    <Text className="text-2xl font-bold text-white">
      <Text style={styles.text}>R</Text>angel <Text style={styles.text}>M</Text>ovies
    </Text>
  );
};
