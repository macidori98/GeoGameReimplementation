/**
 * @typedef {{Study: undefined, Game: undefined}} BottomTabBarParamList
 */

/**
 * @template T
 * @typedef {import("@react-navigation/native").TypedNavigator<T, import("@react-navigation/native").TabNavigationState<import("@react-navigation/native").ParamListBase>, import('@react-navigation/bottom-tabs').BottomTabNavigationOptions, import('@react-navigation/bottom-tabs/lib/typescript/src/types').BottomTabNavigationEventMap, ({ initialRouteName, backBehavior, children, screenListeners, screenOptions, sceneContainerStyle, lazy, tabBarOptions, ...rest }: import('@react-navigation/core').DefaultNavigatorOptions<import('@react-navigation/routers').ParamListBase, import('@react-navigation/routers').TabNavigationState<import('@react-navigation/routers').ParamListBase>, import('@react-navigation/bottom-tabs').BottomTabNavigationOptions, import('@react-navigation/bottom-tabs/lib/typescript/src/types').BottomTabNavigationEventMap> & import('@react-navigation/routers').TabRouterOptions & import('@react-navigation/bottom-tabs/lib/typescript/src/types').BottomTabNavigationConfig)=> JSX.Element>} CreateBottomTabNavigatorType
 */

/**
 * @typedef {{Statistics: undefined, Gaming: undefined, StatDetails: {data: StatisticsData}}} GameNavigationParamList
 */

/**
 * @typedef {import("@react-navigation/stack").StackScreenProps<GameNavigationParamList, 'Statistics'>} StatisticsScreenProps
 */

/**
 * @typedef {import("@react-navigation/stack").StackScreenProps<GameNavigationParamList, 'StatDetails'>} StatisticDetailsScreenProps
 */

/**
 * @typedef {import("@react-navigation/stack").StackScreenProps<GameNavigationParamList, 'Gaming'>} GameScreenProps
 */

/**
 * @template T
 * @typedef {import('@react-navigation/native').TypedNavigator<T, import('@react-navigation/native').StackNavigationState<import('@react-navigation/native').ParamListBase>,  import('@react-navigation/stack').StackNavigationOptions, import('@react-navigation/stack/lib/typescript/src/types').StackNavigationEventMap, ({ initialRouteName, children, screenListeners, screenOptions, ...rest}: import('@react-navigation/core').DefaultNavigatorOptions<import('@react-navigation/routers').ParamListBase, import('@react-navigation/routers').StackNavigationState<import('@react-navigation/routers').ParamListBase>, import('@react-navigation/stack').StackNavigationOptions, import('@react-navigation/stack/lib/typescript/src/types').StackNavigationEventMap> & import('@react-navigation/routers').StackRouterOptions & import('@react-navigation/stack/lib/typescript/src/types').StackNavigationConfig) => JSX.Element>} CreateNativeStackNavigatorType
 */

/**
 * @typedef {{RegionList: undefined, CountryList: {regionName: string, regionId: string}, Details: {countryName: string, countryCode: string}}} StudyNavigationParamList
 */

/**
 * @typedef {import("@react-navigation/stack").StackScreenProps<StudyNavigationParamList, 'Details'>} DetailsScreenProps
 */

/**
 * @typedef {import("@react-navigation/stack").StackScreenProps<StudyNavigationParamList, 'CountryList'>} CountryListScreenProps
 */

/**
 * @typedef {import("@react-navigation/stack").StackScreenProps<StudyNavigationParamList, 'RegionList'>} RegionListScreenProps
 */
