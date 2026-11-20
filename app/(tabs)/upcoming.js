import { useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { usePlanner } from '../../context/PlannerContext';
import { todayKey } from '../../data/events';
import EventCard from '../../components/EventCard';
import FilterModal from '../../components/FilterModal';
import { C } from '../../theme';

export default function Upcoming() {
  const router = useRouter();
  const { events, toggleDone } = usePlanner();
  const [type, setType] = useState('All');
  const [showFilter, setShowFilter] = useState(false);

  const data = events
    .filter((e) => e.date >= todayKey() && (type === 'All' || e.type === type))
    .sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));

  return (
    <View style={s.screen}>
      <View style={s.bar}>
        <Text style={s.count}>{data.length} upcoming · {type}</Text>
        <Pressable style={s.btn} onPress={() => setShowFilter(true)}><Text style={s.btnText}>Filter</Text></Pressable>
      </View>
      <FlatList
        data={data}
        keyExtractor={(e) => e.id}
        contentContainerStyle={{ paddingVertical: 12 }}
        ListEmptyComponent={<Text style={s.empty}>No upcoming events of this type.</Text>}
        renderItem={({ item }) => (
          <EventCard event={item} showDate onToggleDone={() => toggleDone(item.id)} onPress={() => router.push(`/event/${item.id}`)} />
        )}
      />
      <FilterModal visible={showFilter} selected={type} onSelect={setType} onClose={() => setShowFilter(false)} />
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.bg },
  bar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingTop: 12 },
  count: { color: C.mute, fontSize: 15 },
  btn: { backgroundColor: C.teal, paddingVertical: 8, paddingHorizontal: 18, borderRadius: 20 },
  btnText: { color: C.white, fontWeight: '600' },
  empty: { textAlign: 'center', color: C.mute, marginTop: 40 },
});
