/* eslint-disable prettier/prettier */
import type { ImageSourcePropType } from "react-native";

export interface Element {
    element?: React.ReactNode | undefined,
    icon?: string | undefined,
    onPress?(): void | undefined
    text?: string | undefined,

}

export interface HeaderAnimationProps {
    /**
     * an array of elements
     */
    elementRight?: [Element, Element]
    /**
     * an object of elements
     */
    elementLeft?: Element
    /**
     * an array of elements, the navigation will rely on the elements array to render
     */
    elements: Element[]
    /**
     * height header, `default: 200`
     */
    height?: number | undefined,
    /**
     * background of statusbar 
     */
    bgBar?: string | undefined,
    /**
     * translucent `default: true` for android
     */
    translucent?: boolean | undefined
    /**
     * height navigation bar `default: 50`
     */
    heightNavigation?: number | undefined,
    /**
     * background image
     */
    backgroundImage?: ImageSourcePropType,
    /**
     * number of elements on the nav line `default: 6`
     */
    numberElmOnNavLine?: number | undefined,
    /**
     * An number of child indices determining which children get docked to the
     * top of the screen when scrolling. For example passing
     * `stickyHeaderIndices={0}` will cause the first child to be fixed to the
     * top of the scroll view
     */
    stickyHeaderIndices?: number | undefined;
    /**
     * background transition `default: true`
     */
    isBgTransition?: boolean | undefined,
    /**
     * default element left navigation `default: true`
     */
    isLeft?: boolean | undefined,
    /**
     * default element right navigation `default: true`
     */
    isRight?: boolean | undefined,
    /**
     * show search bar on navigation `default: false`
     */
    isSearch?: boolean | undefined,
    /**
     * this is for user customization
     * @example `customLeft={<View><Text>hello</Text></View>}`
     */
    customLeft?: React.ReactNode | undefined,
    /**
     * @example `customLeft={<View><Text>hello</Text></View>}`
     */
    customRight?: React.ReactNode | undefined,
    /**
     * show transition icons `default: true`
     */
    isIconTransition?: boolean | undefined,
    /**
     * array background transition 
     */
    arrBackgroundTransition?: [string, string, string] | undefined,
    /**
     * array background transition 
     */
    arrColorTransition?: [string, string, string] | undefined
    /**
     * 
     */
    borderRadius?: number | undefined,
}
