import { type ParamListBase, type StackNavigationState } from '@react-navigation/native';
import * as React from 'react';
import type { NativeStackDescriptorMap, NativeStackNavigationHelpers } from '../types';
type Props = {
    state: StackNavigationState<ParamListBase>;
    navigation: NativeStackNavigationHelpers;
    descriptors: NativeStackDescriptorMap;
};
export declare function NativeStackView(props: Props): React.JSX.Element;
export {};
//# sourceMappingURL=NativeStackView.native.d.ts.map