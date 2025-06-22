import { TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { styles } from '../theme/index';

export default function HomeLink({ navigation }) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Home')}
      style={styles.background}
      className="rounded-xl p-1">

      <Entypo name="home" size={30} color="white" />

    </TouchableOpacity>
  );
}
