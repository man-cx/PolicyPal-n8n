declare module '@react-navigation/drawer' {
  import { ParamListBase } from '@react-navigation/native';
  import * as React from 'react';
  import { StyleProp, ViewStyle } from 'react-native';

  export interface DrawerContentComponentProps {
    state: any;
    navigation: any;
    descriptors: any;
    progress: any;
  }

  export interface DrawerItemProps {
    label: string | ((props: { focused: boolean; color: string }) => React.ReactNode);
    icon?: (props: { focused: boolean; color: string; size: number }) => React.ReactNode;
    focused?: boolean;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
    activeTintColor?: string;
    inactiveTintColor?: string;
  }

  export function DrawerContentScrollView(props: any): JSX.Element;
  export function DrawerItemList(props: any): JSX.Element;
  export function DrawerItem(props: DrawerItemProps): JSX.Element;
} 