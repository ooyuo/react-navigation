"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeaderConfig = HeaderConfig;
var _elements = require("@react-navigation/elements");
var _native = require("@react-navigation/native");
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeScreens = require("react-native-screens");
var _FontProcessor = require("./FontProcessor");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function HeaderConfig(_ref) {
  let {
    headerBackImageSource,
    headerBackButtonMenuEnabled,
    headerBackTitle,
    headerBackTitleStyle,
    headerBackTitleVisible = true,
    headerBackVisible,
    headerShadowVisible,
    headerLargeStyle,
    headerLargeTitle,
    headerLargeTitleShadowVisible,
    headerLargeTitleStyle,
    headerBackground,
    headerLeft,
    headerRight,
    headerShown,
    headerStyle,
    headerBlurEffect,
    headerTintColor,
    headerTitle,
    headerTitleAlign,
    headerTitleStyle,
    headerTransparent,
    headerSearchBarOptions,
    headerTopInsetEnabled,
    route,
    title,
    canGoBack
  } = _ref;
  const {
    direction
  } = (0, _native.useLocale)();
  const {
    colors,
    fonts
  } = (0, _native.useTheme)();
  const tintColor = headerTintColor ?? (_reactNative.Platform.OS === 'ios' ? colors.primary : colors.text);
  const headerBackTitleStyleFlattened = _reactNative.StyleSheet.flatten([headerBackTitleStyle, fonts.regular]) || {};
  const headerLargeTitleStyleFlattened = _reactNative.StyleSheet.flatten([headerLargeTitleStyle, _reactNative.Platform.select({
    ios: fonts.heavy,
    default: fonts.medium
  })]) || {};
  const headerTitleStyleFlattened = _reactNative.StyleSheet.flatten([headerTitleStyle, _reactNative.Platform.select({
    ios: fonts.bold,
    default: fonts.medium
  })]) || {};
  const headerStyleFlattened = _reactNative.StyleSheet.flatten(headerStyle) || {};
  const headerLargeStyleFlattened = _reactNative.StyleSheet.flatten(headerLargeStyle) || {};
  const [backTitleFontFamily, largeTitleFontFamily, titleFontFamily] = (0, _FontProcessor.processFonts)([headerBackTitleStyleFlattened.fontFamily, headerLargeTitleStyleFlattened.fontFamily, headerTitleStyleFlattened.fontFamily]);
  const backTitleFontSize = 'fontSize' in headerBackTitleStyleFlattened ? headerBackTitleStyleFlattened.fontSize : undefined;
  const titleText = (0, _elements.getHeaderTitle)({
    title,
    headerTitle
  }, route.name);
  const titleColor = 'color' in headerTitleStyleFlattened ? headerTitleStyleFlattened.color : headerTintColor ?? colors.text;
  const titleFontSize = 'fontSize' in headerTitleStyleFlattened ? headerTitleStyleFlattened.fontSize : undefined;
  const titleFontWeight = headerTitleStyleFlattened.fontWeight;
  const largeTitleBackgroundColor = headerLargeStyleFlattened.backgroundColor;
  const largeTitleColor = 'color' in headerLargeTitleStyleFlattened ? headerLargeTitleStyleFlattened.color : undefined;
  const largeTitleFontSize = 'fontSize' in headerLargeTitleStyleFlattened ? headerLargeTitleStyleFlattened.fontSize : undefined;
  const largeTitleFontWeight = headerLargeTitleStyleFlattened.fontWeight;
  const headerTitleStyleSupported = {
    color: titleColor
  };
  if (headerTitleStyleFlattened.fontFamily != null) {
    headerTitleStyleSupported.fontFamily = headerTitleStyleFlattened.fontFamily;
  }
  if (titleFontSize != null) {
    headerTitleStyleSupported.fontSize = titleFontSize;
  }
  if (titleFontWeight != null) {
    headerTitleStyleSupported.fontWeight = titleFontWeight;
  }
  const headerBackgroundColor = headerStyleFlattened.backgroundColor ?? (headerBackground != null || headerTransparent ? 'transparent' : colors.card);
  const headerLeftElement = headerLeft?.({
    tintColor,
    canGoBack,
    label: headerBackTitle
  });
  const headerRightElement = headerRight?.({
    tintColor,
    canGoBack
  });
  const headerTitleElement = typeof headerTitle === 'function' ? headerTitle({
    tintColor,
    children: titleText
  }) : null;
  const supportsHeaderSearchBar = typeof _reactNativeScreens.isSearchBarAvailableForCurrentPlatform === 'boolean' ? _reactNativeScreens.isSearchBarAvailableForCurrentPlatform :
  // Fallback for older versions of react-native-screens
  _reactNative.Platform.OS === 'ios' && _reactNativeScreens.SearchBar != null;
  const hasHeaderSearchBar = supportsHeaderSearchBar && headerSearchBarOptions != null;
  if (headerSearchBarOptions != null && !supportsHeaderSearchBar) {
    throw new Error(`The current version of 'react-native-screens' doesn't support SearchBar in the header. Please update to the latest version to use this option.`);
  }

  /**
   * We need to set this in if:
   * - Back button should stay visible when `headerLeft` is specified
   * - If `headerTitle` for Android is specified, so we only need to remove the title and keep the back button
   */
  const backButtonInCustomView = headerBackVisible ? headerLeftElement != null : _reactNative.Platform.OS === 'android' && headerTitleElement != null;
  const translucent = headerBackground != null || headerTransparent ||
  // When using a SearchBar or large title, the header needs to be translucent for it to work on iOS
  (hasHeaderSearchBar || headerLargeTitle) && _reactNative.Platform.OS === 'ios' && headerTransparent !== false;
  return /*#__PURE__*/React.createElement(_reactNativeScreens.ScreenStackHeaderConfig, {
    backButtonInCustomView: backButtonInCustomView,
    backgroundColor: headerBackgroundColor,
    backTitle: headerBackTitleVisible ? headerBackTitle : ' ',
    backTitleFontFamily: backTitleFontFamily,
    backTitleFontSize: backTitleFontSize,
    blurEffect: headerBlurEffect,
    color: tintColor,
    direction: direction,
    disableBackButtonMenu: headerBackButtonMenuEnabled === false,
    hidden: headerShown === false,
    hideBackButton: headerBackVisible === false,
    hideShadow: headerShadowVisible === false || headerBackground != null || headerTransparent && headerShadowVisible !== true,
    largeTitle: headerLargeTitle,
    largeTitleBackgroundColor: largeTitleBackgroundColor,
    largeTitleColor: largeTitleColor,
    largeTitleFontFamily: largeTitleFontFamily,
    largeTitleFontSize: largeTitleFontSize,
    largeTitleFontWeight: largeTitleFontWeight,
    largeTitleHideShadow: headerLargeTitleShadowVisible === false,
    title: titleText,
    titleColor: titleColor,
    titleFontFamily: titleFontFamily,
    titleFontSize: titleFontSize,
    titleFontWeight: titleFontWeight,
    topInsetEnabled: headerTopInsetEnabled,
    translucent:
    // This defaults to `true`, so we can't pass `undefined`
    translucent === true
  }, _reactNative.Platform.OS === 'ios' ? /*#__PURE__*/React.createElement(React.Fragment, null, headerLeftElement != null ? /*#__PURE__*/React.createElement(_reactNativeScreens.ScreenStackHeaderLeftView, null, headerLeftElement) : null, headerTitleElement != null ? /*#__PURE__*/React.createElement(_reactNativeScreens.ScreenStackHeaderCenterView, null, headerTitleElement) : null) : /*#__PURE__*/React.createElement(React.Fragment, null, headerLeftElement != null || typeof headerTitle === 'function' ? /*#__PURE__*/React.createElement(_reactNativeScreens.ScreenStackHeaderLeftView, null, /*#__PURE__*/React.createElement(_reactNative.View, {
    style: styles.row
  }, headerLeftElement, headerTitleAlign !== 'center' ? typeof headerTitle === 'function' ? headerTitleElement : /*#__PURE__*/React.createElement(_elements.HeaderTitle, {
    tintColor: tintColor,
    style: headerTitleStyleSupported
  }, titleText) : null)) : null, headerTitleAlign === 'center' ? /*#__PURE__*/React.createElement(_reactNativeScreens.ScreenStackHeaderCenterView, null, typeof headerTitle === 'function' ? headerTitleElement : /*#__PURE__*/React.createElement(_elements.HeaderTitle, {
    tintColor: tintColor,
    style: headerTitleStyleSupported
  }, titleText)) : null), headerBackImageSource !== undefined ? /*#__PURE__*/React.createElement(_reactNativeScreens.ScreenStackHeaderBackButtonImage, {
    source: headerBackImageSource
  }) : null, headerRightElement != null ? /*#__PURE__*/React.createElement(_reactNativeScreens.ScreenStackHeaderRightView, null, headerRightElement) : null, hasHeaderSearchBar ? /*#__PURE__*/React.createElement(_reactNativeScreens.ScreenStackHeaderSearchBarView, null, /*#__PURE__*/React.createElement(_reactNativeScreens.SearchBar, headerSearchBarOptions)) : null);
}
const styles = _reactNative.StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});
//# sourceMappingURL=HeaderConfig.js.map