import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { PlannerProvider } from '../context/PlannerContext';
import { setupNotifications } from '../utils/notifications';

export default function RootLayout() {
  useEffect(() => { setupNotifications(); }, []);
  return (
    <PlannerProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </PlannerProvider>
  );
}
