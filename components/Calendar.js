import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { toKey, pad, todayKey } from '../data/events';
import { C } from '../theme';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

// Simple month calendar: dots mark days that have events
export default function Calendar({ selected, onSelect, events }) {
  const start = new Date(selected + 'T00:00:00');
  const [year, setYear] = useState(start.getFullYear());
  const [month, setMonth] = useState(start.getMonth());
  const marked = new Set(events.map((e) => e.date));
  const today = todayKey();

  const move = (delta) => {
    const d = new Date(year, month + delta, 1);
    setYear(d.getFullYear());
    setMonth(d.getMonth());
  };

  const blanks = new Date(year, month, 1).getDay();
  const count = new Date(year, month + 1, 0).getDate();
  const cells = [...Array(blanks).fill(null), ...Array.from({ length: count }, (_, i) => i + 1)];

  return (
    <View style={s.box}>
      <View style={s.head}>
        <Pressable onPress={() => move(-1)} hitSlop={10}><Ionicons name="chevron-back" size={24} color={C.teal} /></Pressable>
        <Text style={s.month}>{MONTHS[month]} {year}</Text>
        <Pressable onPress={() => move(1)} hitSlop={10}><Ionicons name="chevron-forward" size={24} color={C.teal} /></Pressable>
      </View>
      <View style={s.grid}>
        {DAYS.map((d, i) => <Text key={i} style={s.dow}>{d}</Text>)}
        {cells.map((day, i) => {
          if (!day) return <View key={i} style={s.cell} />;
          const key = `${year}-${pad(month + 1)}-${pad(day)}`;
          const isSel = key === selected;
          return (
            <Pressable key={i} style={s.cell} onPress={() => onSelect(key)}>
              <View style={[s.day, key === today && s.today, isSel && s.sel]}>
                <Text style={[s.dayText, isSel && { color: C.white }]}>{day}</Text>
              </View>
              <View style={[s.dot, marked.has(key) && { backgroundColor: isSel ? C.teal : C.turmeric }]} />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  box: { backgroundColor: C.white, borderRadius: 16, padding: 12, margin: 16, elevation: 2 },
  head: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  month: { fontSize: 18, fontWeight: '700', color: C.ink },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  dow: { width: '14.28%', textAlign: 'center', color: C.mute, fontWeight: '600', marginBottom: 4 },
  cell: { width: '14.28%', alignItems: 'center', paddingVertical: 3 },
  day: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  today: { borderWidth: 2, borderColor: C.turmeric },
  sel: { backgroundColor: C.teal },
  dayText: { color: C.ink, fontWeight: '500' },
  dot: { width: 6, height: 6, borderRadius: 3, marginTop: 2 },
});
