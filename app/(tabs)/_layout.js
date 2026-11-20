import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { usePlanner } from '../../context/PlannerContext';
import { todayKey } from '../../data/events';
import { C } from '../../theme';

const icon = (name) => ({ color, size }) => <Ionicons name={name} size={size} color={color} />;

export default function TabsLayout() {
  const { events } = usePlanner();
  const pending = events.filter((e) => e.date >= todayKey() && !e.done).length;
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: C.teal, headerStyle: { backgroundColor: C.teal }, headerTintColor: C.white }}>
      <Tabs.Screen name="index" options={{ title: 'Calendar', tabBarIcon: icon('calendar') }} />
      <Tabs.Screen name="upcoming" options={{ title: 'Upcoming', tabBarIcon: icon('time'), tabBarBadge: pending || undefined }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings', tabBarIcon: icon('settings') }} />
    </Tabs>
  );
}
