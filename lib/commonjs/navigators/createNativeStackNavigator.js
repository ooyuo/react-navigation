"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createNativeStackNavigator = void 0;
var _native = require("@react-navigation/native");
var React = _interopRequireWildcard(require("react"));
var _NativeStackView = require("../views/NativeStackView");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function NativeStackNavigator(_ref) {
  let {
    id,
    initialRouteName,
    children,
    layout,
    screenListeners,
    screenOptions,
    ...rest
  } = _ref;
  const {
    state,
    descriptors,
    navigation,
    NavigationContent
  } = (0, _native.useNavigationBuilder)(_native.StackRouter, {
    id,
    initialRouteName,
    children,
    layout,
    screenListeners,
    screenOptions
  });
  React.useEffect(() =>
  // @ts-expect-error: there may not be a tab navigator in parent
  navigation?.addListener?.('tabPress', e => {
    const isFocused = navigation.isFocused();

    // Run the operation in the next frame so we're sure all listeners have been run
    // This is necessary to know if preventDefault() has been called
    requestAnimationFrame(() => {
      if (state.index > 0 && isFocused && !e.defaultPrevented) {
        // When user taps on already focused tab and we're inside the tab,
        // reset the stack to replicate native behaviour
        navigation.dispatch({
          ..._native.StackActions.popToTop(),
          target: state.key
        });
      }
    });
  }), [navigation, state.index, state.key]);
  return /*#__PURE__*/React.createElement(NavigationContent, null, /*#__PURE__*/React.createElement(_NativeStackView.NativeStackView, _extends({}, rest, {
    state: state,
    navigation: navigation,
    descriptors: descriptors
  })));
}
const createNativeStackNavigator = exports.createNativeStackNavigator = (0, _native.createNavigatorFactory)(NativeStackNavigator);
//# sourceMappingURL=createNativeStackNavigator.js.map