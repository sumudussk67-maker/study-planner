import { Modal, View, Text, Pressable, StyleSheet } from 'react-native';
import { EVENT_TYPES } from '../data/events';
import { C } from '../theme';

export default function FilterModal({ visible, selected, onSelect, onClose }) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={s.backdrop}>
        <View style={s.sheet}>
          <Text style={s.heading}>Filter by type</Text>
          {EVENT_TYPES.map((x) => (
            <Pressable key={x} style={[s.row, selected === x && s.active]} onPress={() => { onSelect(x); onClose(); }}>
              <Text style={[s.rowText, selected === x && { color: C.white }]}>{x}</Text>
            </Pressable>
          ))}
          <Pressable onPress={onClose}><Text style={s.close}>Close</Text></Pressable>
        </View>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  backdrop: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.4)' },
  sheet: { backgroundColor: C.white, padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  heading: { fontSize: 20, fontWeight: '700', color: C.ink, marginBottom: 12 },
  row: { padding: 14, borderRadius: 10, marginBottom: 6, backgroundColor: C.bg },
  active: { backgroundColor: C.teal },
  rowText: { fontSize: 16, color: C.ink },
  close: { textAlign: 'center', color: C.mute, padding: 12, marginTop: 4 },
});
