import { type ParamListBase, type StackNavigationState } from '@react-navigation/native';
import * as React from 'react';
import type { NativeStackNavigationEventMap, NativeStackNavigationOptions, NativeStackNavigatorProps } from '../types';
declare function NativeStackNavigator({ id, initialRouteName, children, layout, screenListeners, screenOptions, ...rest }: NativeStackNavigatorProps): React.JSX.Element;
export declare const createNativeStackNavigator: {
    <ParamList extends ParamListBase>(): import("@react-navigation/native").TypedNavigator<ParamList, StackNavigationState<ParamListBase>, NativeStackNavigationOptions, NativeStackNavigationEventMap, typeof NativeStackNavigator>;
    <ParamList_1 extends ParamListBase, Config extends import("@react-navigation/core/lib/typescript/src/StaticNavigation").StaticConfig<ParamList_1, StackNavigationState<ParamListBase>, NativeStackNavigationOptions, NativeStackNavigationEventMap, typeof NativeStackNavigator>>(config: Config): import("@react-navigation/native").TypedNavigator<ParamList_1, StackNavigationState<ParamListBase>, NativeStackNavigationOptions, NativeStackNavigationEventMap, typeof NativeStackNavigator> & {
        config: Config;
    };
};
export {};
//# sourceMappingURL=createNativeStackNavigator.d.ts.map