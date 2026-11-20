import { View, Text, FlatList, Pressable, Image, StyleSheet } from 'react-native';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { usePlanner } from '../../context/PlannerContext';
import { todayKey, prettyDate } from '../../data/events';
import useAppState from '../../hooks/useAppState';
import Calendar from '../../components/Calendar';
import EventCard from '../../components/EventCard';
import EventFormModal from '../../components/EventFormModal';
import { C } from '../../theme';

export default function Home() {
  const router = useRouter();
  const { events, addEvent, toggleDone } = usePlanner();
  const [selected, setSelected] = useState(todayKey());
  const [showForm, setShowForm] = useState(false);
  const [welcome, setWelcome] = useState(false);

  // AppState: banner when the app returns to the foreground
  useAppState(() => { setWelcome(true); setTimeout(() => setWelcome(false), 4000); });

  const dayEvents = events.filter((e) => e.date === selected).sort((a, b) => a.time.localeCompare(b.time));

  return (
    <View style={s.screen}>
      {welcome && <View style={s.banner}><Text style={s.bannerText}>Welcome back! Check what is due today.</Text></View>}
      <FlatList
        data={dayEvents}
        keyExtractor={(e) => e.id}
        ListHeaderComponent={
          <Image source={{ uri: 'https://placehold.co/800x180/0B4F5C/FFFFFF/png?text=Study+Planner' }} style={s.hero} />
            <Calendar selected={selected} onSelect={setSelected} events={events} />
            <Text style={s.h}>{prettyDate(selected)}</Text>
          </>
        }
        ListEmptyComponent={<Text style={s.empty}>Nothing planned for this day. Tap + to add an event.</Text>}
        contentContainerStyle={{ paddingBottom: 90 }}
        renderItem={({ item }) => (
          <EventCard event={item} onToggleDone={() => toggleDone(item.id)} onPress={() => router.push(`/event/${item.id}`)} />
        )}
      />
      <Pressable style={s.fab} onPress={() => setShowForm(true)}><Ionicons name="add" size={32} color={C.white} /></Pressable>
      <EventFormModal visible={showForm} title="New event" initial={{ date: selected }} onClose={() => setShowForm(false)} onSave={(d) => { addEvent(d); setShowForm(false); }} />
    </View>
  );
}

const s = StyleSheet.create({
  hero: { height: 90, width: '100%' },
  screen: { flex: 1, backgroundColor: C.bg },
  banner: { backgroundColor: C.turmeric, padding: 10 },
  bannerText: { textAlign: 'center', fontWeight: '600', color: C.ink },
  h: { fontSize: 18, fontWeight: '700', color: C.ink, marginHorizontal: 16, marginBottom: 10 },
  empty: { textAlign: 'center', color: C.mute, marginTop: 20, paddingHorizontal: 30 },
  fab: { position: 'absolute', right: 20, bottom: 24, width: 58, height: 58, borderRadius: 29, backgroundColor: C.teal, alignItems: 'center', justifyContent: 'center', elevation: 6 },
});
