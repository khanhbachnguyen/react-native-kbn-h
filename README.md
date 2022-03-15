# react-native-kbn-h

react native animated header multi-platform
## Installation

```sh
npm install react-native-kbn-h
```
# Demo
![Demo ](https://github.com/khanhbachnguyen/react-native-kbn-h/blob/main/example/demo/demo.gif)
## Usage
easy to use, just add your custom or leave the default blank, Here is an example of using
```tsx
import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Animated } from 'react-native';

import HeaderAnimation from 'react-native-kbn-h';

export default function App() {

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
       //.....
      </View>
    </HeaderAnimation>

  );
}

```
## Props
| Property | Type |  Require  |
|---------------|----------|--------------|
| elementRight | [Element, Element] |if prop is Right = true then it requires an array element |
| elementLeft | Element | no |
| elements | Element[] | yes |
| height | number | no |
| bgBar | string | no |
| translucent | boolean | no |
| heightNavigation | number | no |
| backgroundImage | ImageSourcePropType | no |
| numberElmOnNavLine | number | no |
| isBgTransition | boolean | no |
| isLeft | boolean | no |
| isRight | boolean | no |
| isSearch | boolean | no |
| customLeft | React.ReactNode | no |
| customRight | React.ReactNode | no | 
| isIconTransition | boolean | no |
| arrBackgroundTransition | [string, string, string] | no |
| arrColorTransition | [string, string, string] | no |
| borderRadius | number | no |


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

