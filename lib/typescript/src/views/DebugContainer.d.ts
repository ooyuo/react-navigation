import * as React from 'react';
import { type ViewProps } from 'react-native';
import type { StackPresentationTypes } from 'react-native-screens';
type ContainerProps = ViewProps & {
    stackPresentation: StackPresentationTypes;
    children: React.ReactNode;
};
export declare function DebugContainer(props: ContainerProps): React.JSX.Element;
export {};
//# sourceMappingURL=DebugContainer.d.ts.map