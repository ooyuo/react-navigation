"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NativeStackView = NativeStackView;
var _elements = require("@react-navigation/elements");
var _native = require("@react-navigation/native");
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _reactNativeScreens = require("react-native-screens");
var _warnOnce = _interopRequireDefault(require("warn-once"));
var _useDismissedRouteError = require("../utils/useDismissedRouteError");
var _useInvalidPreventRemoveError = require("../utils/useInvalidPreventRemoveError");
var _DebugContainer = require("./DebugContainer");
var _HeaderConfig = require("./HeaderConfig");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const isAndroid = _reactNative.Platform.OS === 'android';
const MaybeNestedStack = _ref => {
  let {
    options,
    route,
    presentation,
    headerHeight,
    headerTopInsetEnabled,
    children
  } = _ref;
  const {
    colors
  } = (0, _native.useTheme)();
  const {
    header,
    headerShown = true,
    contentStyle
  } = options;
  const isHeaderInModal = isAndroid ? false : presentation !== 'card' && headerShown === true && header === undefined;
  const headerShownPreviousRef = React.useRef(headerShown);
  React.useEffect(() => {
    (0, _warnOnce.default)(!isAndroid && presentation !== 'card' && headerShownPreviousRef.current !== headerShown, `Dynamically changing 'headerShown' in modals will result in remounting the screen and losing all local state. See options for the screen '${route.name}'.`);
    headerShownPreviousRef.current = headerShown;
  }, [headerShown, presentation, route.name]);
  const content = /*#__PURE__*/React.createElement(_DebugContainer.DebugContainer, {
    style: [styles.container, presentation !== 'transparentModal' && presentation !== 'containedTransparentModal' && {
      backgroundColor: colors.background
    }, contentStyle],
    stackPresentation: presentation === 'card' ? 'push' : presentation
  }, children);
  if (isHeaderInModal) {
    return /*#__PURE__*/React.createElement(_reactNativeScreens.ScreenStack, {
      style: styles.container
    }, /*#__PURE__*/React.createElement(_reactNativeScreens.Screen, {
      enabled: true,
      style: _reactNative.StyleSheet.absoluteFill
    }, content, /*#__PURE__*/React.createElement(_HeaderConfig.HeaderConfig, _extends({}, options, {
      route: route,
      headerHeight: headerHeight,
      headerTopInsetEnabled: headerTopInsetEnabled,
      canGoBack: true
    }))));
  }
  return content;
};
const SceneView = _ref2 => {
  let {
    index,
    focused,
    descriptor,
    previousDescriptor,
    nextDescriptor,
    onWillDisappear,
    onAppear,
    onDisappear,
    onDismissed,
    onHeaderBackButtonClicked,
    onNativeDismissCancelled
  } = _ref2;
  const {
    route,
    navigation,
    options,
    render
  } = descriptor;
  let {
    animation,
    animationMatchesGesture,
    fullScreenGestureEnabled,
    presentation = 'card'
  } = options;
  const {
    animationDuration,
    animationTypeForReplace = 'push',
    gestureEnabled,
    gestureDirection = presentation === 'card' ? 'horizontal' : 'vertical',
    header,
    headerBackButtonMenuEnabled,
    headerShown,
    headerBackground,
    headerTransparent,
    autoHideHomeIndicator,
    navigationBarColor,
    navigationBarHidden,
    orientation,
    statusBarAnimation,
    statusBarHidden,
    statusBarStyle,
    statusBarTranslucent,
    statusBarColor,
    freezeOnBlur
  } = options;
  if (gestureDirection === 'vertical' && _reactNative.Platform.OS === 'ios') {
    // for `vertical` direction to work, we need to set `fullScreenGestureEnabled` to `true`
    // so the screen can be dismissed from any point on screen.
    // `animationMatchesGesture` needs to be set to `true` so the `animation` set by user can be used,
    // otherwise `simple_push` will be used.
    // Also, the default animation for this direction seems to be `slide_from_bottom`.
    if (fullScreenGestureEnabled === undefined) {
      fullScreenGestureEnabled = true;
    }
    if (animationMatchesGesture === undefined) {
      animationMatchesGesture = true;
    }
    if (animation === undefined) {
      animation = 'slide_from_bottom';
    }
  }

  // workaround for rn-screens where gestureDirection has to be set on both
  // current and previous screen - software-mansion/react-native-screens/pull/1509
  const nextGestureDirection = nextDescriptor?.options.gestureDirection;
  const gestureDirectionOverride = nextGestureDirection != null ? nextGestureDirection : gestureDirection;
  if (index === 0) {
    // first screen should always be treated as `card`, it resolves problems with no header animation
    // for navigator with first screen as `modal` and the next as `card`
    presentation = 'card';
  }
  const insets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  const frame = (0, _reactNativeSafeAreaContext.useSafeAreaFrame)();

  // `modal` and `formSheet` presentations do not take whole screen, so should not take the inset.
  const isModal = presentation === 'modal' || presentation === 'formSheet';

  // Modals are fullscreen in landscape only on iPhone
  const isIPhone = _reactNative.Platform.OS === 'ios' && !(_reactNative.Platform.isPad || _reactNative.Platform.isTV);
  const isLandscape = frame.width > frame.height;
  const isParentHeaderShown = React.useContext(_elements.HeaderShownContext);
  const parentHeaderHeight = React.useContext(_elements.HeaderHeightContext);
  const parentHeaderBack = React.useContext(_elements.HeaderBackContext);
  const topInset = isParentHeaderShown || _reactNative.Platform.OS === 'ios' && isModal || isIPhone && isLandscape ? 0 : insets.top;

  // On models with Dynamic Island the status bar height is smaller than the safe area top inset.
  const hasDynamicIsland = _reactNative.Platform.OS === 'ios' && topInset > 50;
  const statusBarHeight = hasDynamicIsland ? topInset - 5 : topInset;
  const {
    preventedRoutes
  } = (0, _native.usePreventRemoveContext)();
  const defaultHeaderHeight = (0, _elements.getDefaultHeaderHeight)(frame, isModal, statusBarHeight);
  const [customHeaderHeight, setCustomHeaderHeight] = React.useState(defaultHeaderHeight);
  const headerTopInsetEnabled = topInset !== 0;
  const headerHeight = header ? customHeaderHeight : defaultHeaderHeight;
  const backTitle = previousDescriptor ? (0, _elements.getHeaderTitle)(previousDescriptor.options, previousDescriptor.route.name) : parentHeaderBack?.title;
  const headerBack = React.useMemo(() => ({
    // No href needed for native
    href: undefined,
    title: backTitle
  }), [backTitle]);
  const isRemovePrevented = preventedRoutes[route.key]?.preventRemove;
  return /*#__PURE__*/React.createElement(_reactNativeScreens.Screen, {
    key: route.key,
    enabled: true,
    style: _reactNative.StyleSheet.absoluteFill,
    customAnimationOnSwipe: animationMatchesGesture,
    fullScreenSwipeEnabled: fullScreenGestureEnabled,
    gestureEnabled: isAndroid ?
    // This prop enables handling of system back gestures on Android
    // Since we handle them in JS side, we disable this
    false : gestureEnabled,
    homeIndicatorHidden: autoHideHomeIndicator,
    navigationBarColor: navigationBarColor,
    navigationBarHidden: navigationBarHidden,
    replaceAnimation: animationTypeForReplace,
    stackPresentation: presentation === 'card' ? 'push' : presentation,
    stackAnimation: animation,
    screenOrientation: orientation,
    statusBarAnimation: statusBarAnimation,
    statusBarHidden: statusBarHidden,
    statusBarStyle: statusBarStyle,
    statusBarColor: statusBarColor,
    statusBarTranslucent: statusBarTranslucent,
    swipeDirection: gestureDirectionOverride,
    transitionDuration: animationDuration,
    onWillDisappear: onWillDisappear,
    onAppear: onAppear,
    onDisappear: onDisappear,
    onDismissed: onDismissed,
    isNativeStack: true,
    nativeBackButtonDismissalEnabled: false // on Android
    ,
    onHeaderBackButtonClicked: onHeaderBackButtonClicked,
    preventNativeDismiss: isRemovePrevented // on iOS
    ,
    onNativeDismissCancelled: onNativeDismissCancelled
    // this prop is available since rn-screens 3.16
    ,
    freezeOnBlur: freezeOnBlur
  }, /*#__PURE__*/React.createElement(_native.NavigationContext.Provider, {
    value: navigation
  }, /*#__PURE__*/React.createElement(_native.NavigationRouteContext.Provider, {
    value: route
  }, /*#__PURE__*/React.createElement(_elements.HeaderShownContext.Provider, {
    value: isParentHeaderShown || headerShown !== false
  }, /*#__PURE__*/React.createElement(_elements.HeaderHeightContext.Provider, {
    value: headerShown !== false ? headerHeight : parentHeaderHeight ?? 0
  }, headerBackground != null ?
  /*#__PURE__*/
  /**
   * To show a custom header background, we render it at the top of the screen below the header
   * The header also needs to be positioned absolutely (with `translucent` style)
   */
  React.createElement(_reactNative.View, {
    style: [styles.background, headerTransparent ? styles.translucent : null, {
      height: headerHeight
    }]
  }, headerBackground()) : null, /*#__PURE__*/React.createElement(_reactNative.View, {
    accessibilityElementsHidden: !focused,
    importantForAccessibility: focused ? 'auto' : 'no-hide-descendants',
    style: styles.scene
  }, /*#__PURE__*/React.createElement(MaybeNestedStack, {
    options: options,
    route: route,
    presentation: presentation,
    headerHeight: headerHeight,
    headerTopInsetEnabled: headerTopInsetEnabled
  }, /*#__PURE__*/React.createElement(_elements.HeaderBackContext.Provider, {
    value: headerBack
  }, render())), header !== undefined && headerShown !== false ? /*#__PURE__*/React.createElement(_reactNative.View, {
    onLayout: e => {
      setCustomHeaderHeight(e.nativeEvent.layout.height);
    },
    style: headerTransparent ? styles.absolute : null
  }, header({
    back: headerBack,
    options,
    route,
    navigation
  })) : null), /*#__PURE__*/React.createElement(_HeaderConfig.HeaderConfig, _extends({}, options, {
    route: route,
    headerBackButtonMenuEnabled: isRemovePrevented !== undefined ? !isRemovePrevented : headerBackButtonMenuEnabled,
    headerShown: header !== undefined ? false : headerShown,
    headerHeight: headerHeight,
    headerBackTitle: options.headerBackTitle !== undefined ? options.headerBackTitle : undefined,
    headerTopInsetEnabled: headerTopInsetEnabled,
    canGoBack: headerBack !== undefined
  })))))));
};
function NativeStackViewInner(_ref3) {
  let {
    state,
    navigation,
    descriptors
  } = _ref3;
  const {
    setNextDismissedKey
  } = (0, _useDismissedRouteError.useDismissedRouteError)(state);
  (0, _useInvalidPreventRemoveError.useInvalidPreventRemoveError)(descriptors);
  return /*#__PURE__*/React.createElement(_reactNativeScreens.ScreenStack, {
    style: styles.container
  }, state.routes.map((route, index) => {
    const descriptor = descriptors[route.key];
    const isFocused = state.index === index;
    const previousKey = state.routes[index - 1]?.key;
    const nextKey = state.routes[index + 1]?.key;
    const previousDescriptor = previousKey ? descriptors[previousKey] : undefined;
    const nextDescriptor = nextKey ? descriptors[nextKey] : undefined;
    return /*#__PURE__*/React.createElement(SceneView, {
      key: route.key,
      index: index,
      focused: isFocused,
      descriptor: descriptor,
      previousDescriptor: previousDescriptor,
      nextDescriptor: nextDescriptor,
      onWillDisappear: () => {
        navigation.emit({
          type: 'transitionStart',
          data: {
            closing: true
          },
          target: route.key
        });
      },
      onAppear: () => {
        navigation.emit({
          type: 'transitionEnd',
          data: {
            closing: false
          },
          target: route.key
        });
      },
      onDisappear: () => {
        navigation.emit({
          type: 'transitionEnd',
          data: {
            closing: true
          },
          target: route.key
        });
      },
      onDismissed: event => {
        navigation.dispatch({
          ..._native.StackActions.pop(event.nativeEvent.dismissCount),
          source: route.key,
          target: state.key
        });
        setNextDismissedKey(route.key);
      },
      onHeaderBackButtonClicked: () => {
        navigation.dispatch({
          ..._native.StackActions.pop(),
          source: route.key,
          target: state.key
        });
      },
      onNativeDismissCancelled: event => {
        navigation.dispatch({
          ..._native.StackActions.pop(event.nativeEvent.dismissCount),
          source: route.key,
          target: state.key
        });
      }
    });
  }));
}
function NativeStackView(props) {
  return /*#__PURE__*/React.createElement(_elements.SafeAreaProviderCompat, null, /*#__PURE__*/React.createElement(NativeStackViewInner, props));
}
const styles = _reactNative.StyleSheet.create({
  container: {
    flex: 1
  },
  scene: {
    flex: 1,
    flexDirection: 'column-reverse'
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  translucent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    elevation: 1
  },
  background: {
    overflow: 'hidden'
  }
});
//# sourceMappingURL=NativeStackView.native.js.map