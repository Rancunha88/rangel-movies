import {
  View,
  Image,
  Dimensions,
  Platform,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { styles, theme } from '../theme/index';
import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/outline';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { image342 } from 'api/moviesdb';

import portrait from '../assets/cast-portrait.png'; // Placeholder for cast images
import MoviesList from '../components/MoviesList';
import Loading from '../components/Loading';
import HomeLink from '../components/HomeLink';
import { getPersonDetails, getPersonMovies } from 'api/moviesdb';

var { width, height } = Dimensions.get('window');
const ios = Platform.OS === 'ios';
const verticalMargin = ios ? '' : ' my-3';

export default function PersonScreen() {
  const { params: item } = useRoute();
  const [person, setPerson] = useState(item);
  const [isFavorite, toggleFavorite] = useState(false);
  const [personMovies, setPersonMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true);
    fetchPersonDetails(item.id);
    fetchPersonMovies(item.id);
  }, [item]);

  const fetchPersonDetails = async () => {
    try {
      const personDetails = await getPersonDetails(item.id);
      setPerson(personDetails.data);
    } catch (error) {
      console.error('Error fetching person details:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPersonMovies = async () => {
    try {
      const personMovies = await getPersonMovies(item.id);
      setPersonMovies(personMovies.data.cast);
    } catch (error) {
      console.error('Error fetching person movies:', error);
    }
  };
  return (
    <ScrollView className="flex-1 bg-neutral-900" contentContainerStyle={{ paddingBottom: 20 }}>
      {loading ? (
        <Loading />
      ) : (
        <View>
          {/* Back Button */}
          <SafeAreaView
            className={'z-20 w-full flex-row items-center justify-between px-4 ' + verticalMargin}>
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

          {/* Person Details */}
          <View>
            <View className="flex-row justify-center">
              <View
                className="w-76 items-center overflow-hidden rounded-full border-2 border-neutral-500"
                style={{
                  shadowColor: '#ffbb00',
                  shadowRadius: 40,
                  shadowOffset: { width: 0, height: 5 },
                  shadowOpacity: 1,
                  elevation: 50,
                }}>
                <Image
                  source={
                    person.profile_path
                      ? { uri: image342(person.profile_path) }
                      : require('../assets/profile-not-found.jpg')
                  }
                  style={{ height: height * 0.43, width: width * 0.74 }}
                />
              </View>
            </View>
            {/* Person Name and Location */}
            <View className="mt-6">
              <Text className="text-center text-3xl font-bold text-white">{person?.name}</Text>
              <Text className="text-center text-base text-neutral-500">London, United Kingdom</Text>
            </View>
            <View className="mx-3 mt-6 flex-row items-center justify-between rounded-full bg-neutral-700 p-4">
              <View className="items-center border-r-2 border-r-neutral-400 px-2">
                <Text className="font-semibold text-white">Gender</Text>
                <Text className="text-sm text-neutral-300">
                  {person?.gender === 1 ? 'Female' : 'Male'}
                </Text>
              </View>
              <View className="items-center border-r-2 border-r-neutral-400 px-2">
                <Text className="font-semibold text-white">Birthday</Text>
                <Text className="text-sm text-neutral-300">{person?.birthday}</Text>
              </View>
              <View className="items-center border-r-2 border-r-neutral-400 px-2">
                <Text className="font-semibold text-white">Known For</Text>
                <Text className="text-sm text-neutral-300">{person?.known_for_department}</Text>
              </View>
              <View className="items-center px-2">
                <Text className="font-semibold text-white">Popularity</Text>
                <Text className="text-sm text-neutral-300">{person?.popularity}</Text>
              </View>
            </View>
            <View className="mx-4 my-6 space-y-2">
              <Text className="text-lg text-white">Biography</Text>
              <Text className="leading-6 tracking-wide text-neutral-400">{person?.biography}</Text>
            </View>

            {/* Filmography */}
            <MoviesList title="Filmography" movies={personMovies} hideSeeAll={true} />
          </View>
        </View>
      )}
    </ScrollView>
  );
}
