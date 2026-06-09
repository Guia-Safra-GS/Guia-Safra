import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  DashboardScreen: undefined;
  MyBatchScreen: undefined;
  NewBatchScreen: undefined;
  ForecastScreen: undefined;
  EditBatchScreen: undefined;
  BatchDetails: { id: string, sensorId: string, type: string, status: string };
  MainTabs: undefined;
};

export type LoginScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'LoginScreen'
>;

export type RegisterScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'RegisterScreen'
>;

export type DashboardScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'DashboardScreen'
>;

export type MyBatchScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'MyBatchScreen'
>;

export type BatchDetailsProps  = NativeStackScreenProps<
  RootStackParamList,
  'BatchDetails'
>;  

export type NewBatchScreenProps  = NativeStackScreenProps<
  RootStackParamList,
  'NewBatchScreen'
>;

export type ForecastScreenProps  = NativeStackScreenProps<
  RootStackParamList,
  'ForecastScreen'
>;

export type EditBatchScreenProps  = NativeStackScreenProps<
  RootStackParamList,
  'EditBatchScreen'
>;