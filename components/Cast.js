import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { image185 } from 'api/moviesdb';

export default function Cast({ cast, navigation }) {
  const breakAtNearestSpace = (str, maxLength = 15) => {
    if (str.length <= maxLength) return str;
    const substring = str.slice(0, maxLength); // Get substring up to max length
    const lastSpaceIndex = substring.lastIndexOf(' '); // Find last space in substring
    if (lastSpaceIndex === -1) {
      // No spaces found in substring, split at max length
      return `${str.slice(0, maxLength)}\n${str.slice(maxLength)}`;
    }
    // Split at the last space
    return `${str.slice(0, lastSpaceIndex)}\n${str.slice(lastSpaceIndex + 1)}`;
  };

  return (
    <View className="my-6">
      <Text className="mx-4 mb-5 text-lg text-white">Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}>
        {cast &&
          cast.map((person, index) => {
            return (
              <TouchableOpacity
                key={index}
                className="mr-4 items-center"
                onPress={() => {
                  navigation.navigate('Person', person);
                }}>
                <View className="h-22 w-22 mb-2 items-center overflow-hidden rounded-full border border-neutral-500">
                  <Image
                    source={
                      person.profile_path
                        ? { uri: image185(person.profile_path) }
                        : require('../assets/profile-not-found.jpg')
                    }
                    className="h-24 w-24 rounded-2xl"
                    style={{ resizeMode: 'cover' }}
                  />
                </View>
                <Text className="mb-1 text-center text-sm text-white">
                  {/* {person?.character.length > 10 ? person?.character.slice(0, 10) + '...' : person?.character} */}
                  {person?.character
                    ? require('../theme/supportFunctions').breakAtNearestSpace(person.character, 15)
                    : 'Unknown Character'}
                </Text>
                <Text className="mb-1 text-center text-sm text-neutral-400">
                  {person?.original_name
                    ? require('../theme/supportFunctions').breakAtNearestSpace(person.original_name, 15)
                    : 'Unknown Actor'}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
}
