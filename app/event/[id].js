import { useState } from 'react';
import { View, Text, Pressable, ScrollView, Modal, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { usePlanner } from '../../context/PlannerContext';
import { TYPE_COLORS, prettyDate } from '../../data/events';
import EventFormModal from '../../components/EventFormModal';
import { C } from '../../theme';

export default function EventDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { events, updateEvent, deleteEvent, toggleDone } = usePlanner();
  const [editing, setEditing] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const e = events.find((x) => x.id === id);
  if (!e) return <Text style={{ padding: 20 }}>Event not found.</Text>;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: C.bg }} contentContainerStyle={s.body}>
      <Text style={[s.type, { color: TYPE_COLORS[e.type] }]}>{e.type.toUpperCase()}</Text>
      <Text style={s.title}>{e.title}</Text>
      <Text style={s.line}>Date: {prettyDate(e.date)}</Text>
      <Text style={s.line}>Time: {e.time}</Text>
      <Text style={s.line}>Reminder: {e.remind ? 'On' : 'Off'}</Text>
      <Text style={s.line}>Status: {e.done ? 'Completed' : 'Pending'}</Text>
      {e.notes ? <Text style={s.notes}>{e.notes}</Text> : null}
      <Pressable style={s.btn} onPress={() => toggleDone(e.id)}><Text style={s.btnText}>{e.done ? 'Mark as not done' : 'Mark as done'}</Text></Pressable>
      <Pressable style={[s.btn, { backgroundColor: C.turmeric }]} onPress={() => setEditing(true)}><Text style={[s.btnText, { color: C.ink }]}>Edit</Text></Pressable>
      <Pressable style={[s.btn, { backgroundColor: C.heart }]} onPress={() => setConfirm(true)}><Text style={s.btnText}>Delete</Text></Pressable>
      <Pressable onPress={() => router.back()}><Text style={s.back}>Back</Text></Pressable>

      <EventFormModal visible={editing} title="Edit event" initial={e} onClose={() => setEditing(false)} onSave={(d) => { updateEvent(e.id, d); setEditing(false); }} />
      <Modal visible={confirm} transparent animationType="fade" onRequestClose={() => setConfirm(false)}>
        <View style={s.backdrop}>
          <View style={s.box}>
            <Text style={s.confirmTitle}>Delete this event?</Text>
            <Pressable style={[s.btn, { backgroundColor: C.heart }]} onPress={() => { deleteEvent(e.id); setConfirm(false); router.back(); }}><Text style={s.btnText}>Yes, delete</Text></Pressable>
            <Pressable onPress={() => setConfirm(false)}><Text style={s.back}>Cancel</Text></Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  body: { padding: 20 },
  type: { fontWeight: '800', letterSpacing: 1, fontSize: 13 },
  title: { fontSize: 24, fontWeight: '800', color: C.ink, marginVertical: 8 },
  line: { color: C.ink, fontSize: 16, marginTop: 3 },
  notes: { color: C.mute, fontSize: 16, lineHeight: 24, marginTop: 16 },
  btn: { backgroundColor: C.teal, padding: 14, borderRadius: 10, marginTop: 12 },
  btnText: { color: C.white, textAlign: 'center', fontWeight: '700' },
  back: { textAlign: 'center', color: C.mute, padding: 14 },
  backdrop: { flex: 1, justifyContent: 'center', padding: 30, backgroundColor: 'rgba(0,0,0,0.5)' },
  box: { backgroundColor: C.white, borderRadius: 14, padding: 20 },
  confirmTitle: { fontSize: 18, fontWeight: '700', color: C.ink },
});
