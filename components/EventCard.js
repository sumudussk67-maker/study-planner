import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TYPE_COLORS, prettyDate } from '../data/events';
import { C } from '../theme';

export default function EventCard({ event, showDate, onToggleDone, onPress }) {
  const color = TYPE_COLORS[event.type];
  return (
    <Pressable style={s.card} onPress={onPress}>
      <View style={[s.bar, { backgroundColor: color }]} />
      <View style={{ flex: 1 }}>
        <Text style={[s.title, event.done && s.done]}>{event.title}</Text>
        <Text style={s.meta}>{showDate ? prettyDate(event.date) + ' · ' : ''}{event.time}</Text>
        <Text style={[s.type, { color }]}>{event.type}</Text>
      </View>
      <Pressable onPress={onToggleDone} hitSlop={10}>
        <Ionicons name={event.done ? 'checkmark-circle' : 'ellipse-outline'} size={28} color={event.done ? '#2B7A4B' : C.mute} />
      </Pressable>
    </Pressable>
  );
}

const s = StyleSheet.create({
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: C.white, borderRadius: 12, padding: 12, marginBottom: 10, marginHorizontal: 16, elevation: 1 },
  bar: { width: 5, alignSelf: 'stretch', borderRadius: 3, marginRight: 12 },
  title: { fontSize: 16, fontWeight: '700', color: C.ink },
  done: { textDecorationLine: 'line-through', color: C.mute },
  meta: { color: C.mute, marginTop: 2 },
  type: { fontWeight: '600', marginTop: 2, fontSize: 13 },
});
