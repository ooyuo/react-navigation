import { getHeaderTitle, Header, HeaderBackButton, HeaderBackContext, SafeAreaProviderCompat, Screen } from '@react-navigation/elements';
import { useLinkTools } from '@react-navigation/native';
import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native';
const TRANSPARENT_PRESENTATIONS = ['transparentModal', 'containedTransparentModal'];
export function NativeStackView(_ref) {
  let {
    state,
    descriptors
  } = _ref;
  const parentHeaderBack = React.useContext(HeaderBackContext);
  const {
    buildHref
  } = useLinkTools();
  return /*#__PURE__*/React.createElement(SafeAreaProviderCompat, null, /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, state.routes.map((route, i) => {
    const isFocused = state.index === i;
    const previousKey = state.routes[i - 1]?.key;
    const nextKey = state.routes[i + 1]?.key;
    const previousDescriptor = previousKey ? descriptors[previousKey] : undefined;
    const nextDescriptor = nextKey ? descriptors[nextKey] : undefined;
    const {
      options,
      navigation,
      render
    } = descriptors[route.key];
    const headerBack = previousDescriptor ? {
      title: getHeaderTitle(previousDescriptor.options, previousDescriptor.route.name),
      href: buildHref(previousDescriptor.route.name, previousDescriptor.route.params)
    } : parentHeaderBack;
    const canGoBack = headerBack !== undefined;
    const {
      header,
      headerShown,
      headerTintColor,
      headerBackImageSource,
      headerLeft,
      headerRight,
      headerTitle,
      headerTitleAlign,
      headerTitleStyle,
      headerStyle,
      headerShadowVisible,
      headerTransparent,
      headerBackground,
      headerBackTitle,
      presentation,
      contentStyle
    } = options;
    const nextPresentation = nextDescriptor?.options.presentation;
    return /*#__PURE__*/React.createElement(Screen, {
      key: route.key,
      focused: isFocused,
      route: route,
      navigation: navigation,
      headerShown: headerShown,
      headerTransparent: headerTransparent,
      header: header !== undefined ? header({
        back: headerBack,
        options,
        route,
        navigation
      }) : /*#__PURE__*/React.createElement(Header, {
        title: getHeaderTitle(options, route.name),
        headerTintColor: headerTintColor,
        headerLeft: typeof headerLeft === 'function' ? _ref2 => {
          let {
            tintColor
          } = _ref2;
          return headerLeft({
            tintColor,
            canGoBack,
            label: headerBackTitle
          });
        } : headerLeft === undefined && canGoBack ? _ref3 => {
          let {
            tintColor
          } = _ref3;
          return /*#__PURE__*/React.createElement(HeaderBackButton, {
            tintColor: tintColor,
            backImage: headerBackImageSource !== undefined ? () => /*#__PURE__*/React.createElement(Image, {
              source: headerBackImageSource,
              resizeMode: "contain",
              style: [styles.backImage, {
                tintColor
              }]
            }) : undefined,
            canGoBack: canGoBack,
            onPress: navigation.goBack,
            href: headerBack.href
          });
        } : headerLeft,
        headerRight: typeof headerRight === 'function' ? _ref4 => {
          let {
            tintColor
          } = _ref4;
          return headerRight({
            tintColor,
            canGoBack
          });
        } : headerRight,
        headerTitle: typeof headerTitle === 'function' ? _ref5 => {
          let {
            children,
            tintColor
          } = _ref5;
          return headerTitle({
            children,
            tintColor
          });
        } : headerTitle,
        headerTitleAlign: headerTitleAlign,
        headerTitleStyle: headerTitleStyle,
        headerTransparent: headerTransparent,
        headerShadowVisible: headerShadowVisible,
        headerBackground: headerBackground,
        headerStyle: headerStyle
      }),
      style: [StyleSheet.absoluteFill, {
        display: isFocused || nextPresentation != null && TRANSPARENT_PRESENTATIONS.includes(nextPresentation) ? 'flex' : 'none'
      }, presentation != null && TRANSPARENT_PRESENTATIONS.includes(presentation) ? {
        backgroundColor: 'transparent'
      } : null]
    }, /*#__PURE__*/React.createElement(HeaderBackContext.Provider, {
      value: headerBack
    }, /*#__PURE__*/React.createElement(View, {
      style: [styles.contentContainer, contentStyle]
    }, render())));
  })));
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    flex: 1
  },
  backImage: {
    height: 24,
    width: 24,
    margin: 3
  }
});
//# sourceMappingURL=NativeStackView.js.map