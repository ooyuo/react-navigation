import * as React from 'react';
import { type ViewProps } from 'react-native';
import type { StackPresentationTypes } from 'react-native-screens';
type ContainerProps = ViewProps & {
    stackPresentation: StackPresentationTypes;
    children: React.ReactNode;
};
/**
 * This view must *not* be flattened.
 * See https://github.com/software-mansion/react-native-screens/pull/1825
 * for detailed explanation.
 */
export declare let DebugContainer: (props: ContainerProps) => React.JSX.Element;
export {};
//# sourceMappingURL=DebugContainer.native.d.ts.map