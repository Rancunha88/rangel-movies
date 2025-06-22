import { View, Text, Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';
import React from 'react';

const { height, width } = Dimensions.get('window');
import { styles, theme } from '../theme';
import { useNavigation } from '@react-navigation/native';

export default function Loading() {
  return (
    <View style={{ height, width }} className="absolute flex-row items-center justify-center">
      <Progress.CircleSnail
        thickness={12}
        size={160}
        indeterminate={true}
        color={theme.background}
      />
    </View>
  );
}
