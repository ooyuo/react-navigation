"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processFonts = processFonts;
var _ReactNativeStyleAttributes = _interopRequireDefault(require("react-native/Libraries/Components/View/ReactNativeStyleAttributes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// @ts-expect-error importing private module

function processFonts(fontFamilies) {
  const fontFamilyProcessor = _ReactNativeStyleAttributes.default.fontFamily?.process;
  if (typeof fontFamilyProcessor === 'function') {
    return fontFamilies.map(fontFamilyProcessor);
  }
  return fontFamilies;
}
//# sourceMappingURL=FontProcessor.native.js.map