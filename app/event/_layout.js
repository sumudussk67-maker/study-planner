import { Stack } from 'expo-router';
import { C } from '../../theme';

// Nested stack on top of the tabs: header with a back button
export default function EventLayout() {
  return <Stack screenOptions={{ headerStyle: { backgroundColor: C.teal }, headerTintColor: C.white, title: 'Event details' }} />;
}
