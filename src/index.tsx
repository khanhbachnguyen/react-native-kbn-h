/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Fragment } from 'react';
import {
  ImageBackground,
  StyleSheet,
  ScrollView,
  StatusBar,
  Animated,
  SafeAreaView,
  Platform,
  NativeModules,
  View,
  useWindowDimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import type { HeaderAnimationProps } from './interfaces';


/**
 * get statusbar height
 */
const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;

const HeaderAnimation: React.FC<HeaderAnimationProps> = ({
  height = 200,
  bgBar = "rgba(34, 103, 76, 1)",
  translucent = true,
  heightNavigation = 50,
  children,
  backgroundImage = { uri: "https://cdn.pixabay.com/photo/2022/01/16/10/51/leaves-6941709__340.jpg" },
  numberElmOnNavLine = 6,
  elements,
  isBgTransition = true,
  isLeft = true,
  isRight = true,
  isSearch = false,
  customLeft,
  customRight,
  isIconTransition = true,
  arrBackgroundTransition,
  arrColorTransition,
  borderRadius = 5,
  elementLeft,
  elementRight
}): JSX.Element => {
  let _top: number = 0;
  let _distance: number = height - (STATUSBAR_HEIGHT + heightNavigation)
  let _isTransition: boolean = true
  let _arrBgTransition: string[] = ["rgba(34, 103, 76, 0.5)", "rgba(34, 103, 76, 0.75)", bgBar]
  let _arrColorTransition: string[] = ["#000", "#ddd", "#fff"]

  const _scrollY = React.useRef(new Animated.Value(0)).current
  const { width } = useWindowDimensions()

  if (isRight && elementRight?.length !== 2) {
    throw new Error(`Error elementRight requires exactly 2 elements [element,element]`)
  }
  if (_distance <= 0) {
    throw new Error(`Error height must be greater ${STATUSBAR_HEIGHT + heightNavigation} `)
  }
  if (numberElmOnNavLine < 1) {
    throw new Error(`Error numberElmOnNavLine = ${numberElmOnNavLine}, numberElmOnNavLine is a number greater than 0`)
  }
  if (arrColorTransition && arrColorTransition.length === 3) {
    _arrColorTransition = [...arrColorTransition]
  }
  if (arrBackgroundTransition && arrBackgroundTransition.length !== 3) {
    throw new Error(`Error arrBackgroundTransition.length requires exactly 3 colors [color,color,color]`)
  }
  if (arrBackgroundTransition && arrBackgroundTransition.length === 3) {
    _arrBgTransition = [...arrBackgroundTransition]
  }
  if (Platform.OS === "android" && translucent) {
    _top = STATUSBAR_HEIGHT
  }
  if (elements.length < 1) {
    console.warn("prop elements are currently empty `elements.length < 1`")
  }
  if (!isIconTransition || height < 180) {
    _isTransition = false
  }
  /**
   * backgroup transition navigation bar
   */
  let _backgroundTransition = _scrollY.interpolate({
    inputRange: [0, _distance / 2, _distance],
    outputRange: _arrBgTransition,
    extrapolate: "clamp"
  })

  /**
   * spacing on the left side when the icon is on the navigation bar
   */
  let spaceLeft = _scrollY.interpolate({
    inputRange: [0, _distance / 3, _distance],
    outputRange: [0, 0, isLeft ? width / numberElmOnNavLine : 0],
    extrapolate: "clamp"
  })
  /**
   * spacing on the right side when the icon is on the navigation bar
   */
  let spaceRight = _scrollY.interpolate({
    inputRange: [0, _distance / 3, _distance],
    outputRange: [0, 0, isRight ? width / (customRight ? numberElmOnNavLine : numberElmOnNavLine / 2) : 0],
    extrapolate: "clamp"
  })
  /**
   * initial position of the icons
   */
  let initialPlaceIcon = _scrollY.interpolate({
    inputRange: [0, _distance],
    outputRange: [(height - _top - heightNavigation) / 2, 0],
    extrapolate: "clamp"
  })
  /**
   * width search
   */
  let widthSearch = _scrollY.interpolate({
    inputRange: [0, _distance / 3, _distance],
    outputRange: [isRight ? (width / (numberElmOnNavLine / 2)) : 0, width / 1.5, width],
    extrapolate: "clamp"
  })
  /**
   * opacity seach 
   */
  let opcitySearch = _scrollY.interpolate({
    inputRange: [0, _distance / 3, _distance],
    outputRange: [1, 0, 0],
    extrapolate: "clamp"
  })
  /**
   * background transition icon when scrolling
   */
  let bgIcon = _scrollY.interpolate({
    inputRange: [0, _distance / 3, _distance],
    outputRange: ["rgb(255, 255, 255)", "rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0)"],
    extrapolate: "clamp"
  })

  let scale = _scrollY.interpolate({
    inputRange: [0, _distance / 3, _distance],
    outputRange: [1, 0, 0],
    extrapolate: "clamp"
  })

  let transitionColor = _scrollY.interpolate({
    inputRange: [0, _distance / 3, _distance],
    outputRange: _arrColorTransition,
    extrapolate: "clamp"
  })

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bgBar, justifyContent: "space-between" }}>
      <StatusBar backgroundColor={bgBar} translucent={translucent} />
      <ImageBackground style={[styles.img, { height, }]} resizeMode="cover" source={backgroundImage} />
      <View style={{ top: _top, position: "absolute", left: 0, right: 0, }}>
        <Animated.View style={[styles.nav, { overflow: "hidden", backgroundColor: isBgTransition ? _backgroundTransition : bgBar, height: heightNavigation }]}>
          {isLeft &&
            <>
              <View style={[styles.left, { height: heightNavigation, flex: 1 / numberElmOnNavLine }]}>
                <View style={styles.buttonContainer}>
                  {customLeft || (elementLeft ?
                    <TouchableOpacity onPress={elementLeft.onPress} style={{ position: "relative" }}>
                      {elementLeft.element}
                    </TouchableOpacity> : <Text>Icon</Text>
                  )}
                </View>
              </View>
              {isSearch &&
                <Animated.View style={[styles.containerSearch, { opacity: opcitySearch, right: widthSearch }]}>
                  <TouchableOpacity activeOpacity={1} style={[styles.search, { paddingLeft: (width / numberElmOnNavLine / 2) + 5 }]} onPress={() => console.log("search")}>
                    <Text style={{ color: "#999" }}>search</Text>
                  </TouchableOpacity>
                </Animated.View>
              }
            </>
          }
          <View style={[styles.right, { height: heightNavigation, flex: 1 / (numberElmOnNavLine / 2) }]}>
            {isRight &&
              (customRight || (elementRight &&
                <>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={elementRight[0].onPress}>
                      {elementRight[0].element}
                    </TouchableOpacity>
                  </View>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={elementRight[1].onPress}>
                      {elementRight[1].element}
                    </TouchableOpacity>
                  </View>
                </>
              ))
            }
          </View>
        </Animated.View>

        {_isTransition &&
          <Animated.View style={[styles.animationIcon, {
            top: initialPlaceIcon,
            left: spaceLeft,
            right: spaceRight,
            height: heightNavigation,
          }]}>
            {elements.map((item, index) => {
              return (
                <View key={index} style={styles.buttonContainer} >
                  <TouchableOpacity style={[styles.button]} onPress={item.onPress}>
                    <Animated.View style={[styles.icon, { backgroundColor: bgIcon, borderRadius }]}>
                      <Animated.Text style={{ color: transitionColor }}>{item.icon}</Animated.Text>
                    </Animated.View>
                  </TouchableOpacity>

                  <Animated.View style={[styles.viewText, { transform: [{ scaleX: scale }, { scaleY: scale }] }]}>
                    <Animated.Text numberOfLines={2} style={[styles.text, { color: bgIcon }]}> {item.text}</Animated.Text>
                  </Animated.View>
                </View>
              )
            })}

          </Animated.View>
        }
      </View>

      <ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: _scrollY } } }], { useNativeDriver: false })}
        showsVerticalScrollIndicator={false}
        style={{ paddingTop: height, flex: 1 }}
      >
        {children}
      </ScrollView>
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  text: {
    width: 100,
    textTransform: "uppercase",
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    fontSize: 13,
  },
  viewText: {
    justifyContent: "center",
    height: 35,
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
    width: 35,
    height: 35,
    borderRadius: 5,
    backgroundColor: "#fff"
  },
  containerSearch: {
    position: "absolute",
    top: 0,
    bottom: 0,
    zIndex: -1,
    left: 0,
    overflow: "hidden"
  },
  search: {
    flex: 1,
    backgroundColor: "rgba(242, 241, 241, 0.2)",
    margin: 10,
    borderRadius: 5,
    paddingLeft: 40,
    justifyContent: "center"
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center"
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 50
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  animationIcon: {
    position: "absolute",
    zIndex: 2000,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  nav: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    zIndex: 1000,
    left: 0,
    right: 0,
    flex: 1,
    justifyContent: "space-between",
  },
  img: {
    position: "absolute",
    zIndex: -100,
    width: '100%',
  }
})
export default HeaderAnimation;
