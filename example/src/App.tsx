import * as React from 'react';

import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Animated } from 'react-native';
import HeaderAnimation from 'react-native-kbn-h';

export default function App() {
  // const [result, setResult] = React.useState<number | undefined>();
  const _scrollY = React.useRef(new Animated.Value(0)).current

  // React.useEffect(() => {
  //   multiply(3, 7).then(setResult);
  // }, []);

  return (
    <HeaderAnimation
      backgroundImage={{ uri: "https://cdn.pixabay.com/photo/2022/01/16/10/51/leaves-6941709__340.jpg" }}
      isBgTransition={true}
      height={200}
      isLeft={true}
      isRight={true}
      numberElmOnNavLine={6}
      heightNavigation={50}
      elementRight={[
        {
          element: <Text>Icon</Text>,
          onPress: () => console.log('1'),
          text: 'Your title',
        },
        {
          element: <Text>Icon</Text>,
          onPress: () => console.log('2'),
          text: 'Your title',
        },
      ]}
      elements={[
        {
          icon: 'Icon',
          onPress: () => console.log('1'),
          text: 'Your title',
        },
        {
          icon: 'Icon',
          onPress: () => console.log('2'),
          text: 'Your title',
        },
        {
          icon: 'Icon',
          onPress: () => console.log('3'),
          text: 'Your title',
        },
      ]}
    >
      <View style={{ backgroundColor: "#fff", height: 1200 }}>

      </View>
    </HeaderAnimation>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
