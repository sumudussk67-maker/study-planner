import { useEffect, useState } from 'react';
import { Modal, View, Text, TextInput, Pressable, Switch, ScrollView, StyleSheet } from 'react-native';
import { TYPE_COLORS, todayKey } from '../data/events';
import { C } from '../theme';

// Used for both adding and editing an event
export default function EventFormModal({ visible, initial, title, onSave, onClose }) {
  const [f, setF] = useState({});
  const [err, setErr] = useState('');

  useEffect(() => {
    if (visible) {
      setF({ title: '', type: 'Assignment', date: todayKey(), time: '09:00', notes: '', remind: true, ...initial });
      setErr('');
    }
  }, [visible]);

  const set = (k, v) => setF({ ...f, [k]: v });

  const save = () => {
    if (!f.title?.trim()) return setErr('Please enter a title.');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(f.date) || isNaN(new Date(f.date))) return setErr('Date must look like 2026-11-25.');
    if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(f.time)) return setErr('Time must look like 18:30.');
    onSave({ title: f.title.trim(), type: f.type, date: f.date, time: f.time, notes: f.notes || '', remind: f.remind });
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={s.backdrop}>
        <View style={s.sheet}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <Text style={s.heading}>{title}</Text>
            <Text style={s.label}>Title</Text>
            <TextInput style={s.input} value={f.title} onChangeText={(v) => set('title', v)} placeholder="e.g. Database assignment" />
            <Text style={s.label}>Type</Text>
            <View style={s.chips}>
              {Object.keys(TYPE_COLORS).map((t) => (
                <Pressable key={t} style={[s.chip, f.type === t && { backgroundColor: TYPE_COLORS[t] }]} onPress={() => set('type', t)}>
                  <Text style={[s.chipText, f.type === t && { color: C.white }]}>{t}</Text>
                </Pressable>
              ))}
            </View>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <View style={{ flex: 1 }}>
                <Text style={s.label}>Date (YYYY-MM-DD)</Text>
                <TextInput style={s.input} value={f.date} onChangeText={(v) => set('date', v)} />
              </View>
              <View style={{ width: 100 }}>
                <Text style={s.label}>Time</Text>
                <TextInput style={s.input} value={f.time} onChangeText={(v) => set('time', v)} />
              </View>
            </View>
            <Text style={s.label}>Notes</Text>
            <TextInput style={[s.input, { height: 70 }]} multiline value={f.notes} onChangeText={(v) => set('notes', v)} placeholder="Optional" />
            <View style={s.switchRow}>
              <Text style={s.label}>Remind me at this time</Text>
              <Switch value={!!f.remind} onValueChange={(v) => set('remind', v)} trackColor={{ true: C.teal }} />
            </View>
            {err ? <Text style={s.err}>{err}</Text> : null}
            <Pressable style={s.save} onPress={save}><Text style={s.saveText}>Save</Text></Pressable>
            <Pressable onPress={onClose}><Text style={s.cancel}>Cancel</Text></Pressable>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  backdrop: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' },
  sheet: { backgroundColor: C.white, padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20, maxHeight: '90%' },
  heading: { fontSize: 20, fontWeight: '700', color: C.ink },
  label: { color: C.mute, fontWeight: '600', marginTop: 12, marginBottom: 4 },
  input: { backgroundColor: C.bg, borderRadius: 10, padding: 12, fontSize: 16, color: C.ink },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { backgroundColor: C.bg, paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20 },
  chipText: { color: C.ink, fontWeight: '600' },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  err: { color: '#B91C1C', marginTop: 8, fontWeight: '600' },
  save: { backgroundColor: C.teal, padding: 14, borderRadius: 10, marginTop: 16 },
  saveText: { color: C.white, textAlign: 'center', fontWeight: '700' },
  cancel: { textAlign: 'center', color: C.mute, padding: 12 },
});
