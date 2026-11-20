import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useState } from 'react';
import useAppState from '../../hooks/useAppState';
import { notifyNow, remindIn } from '../../utils/notifications';
import { C } from '../../theme';

export default function Settings() {
  const [lastReturn, setLastReturn] = useState('Not yet');
  const appState = useAppState(() => setLastReturn(new Date().toLocaleTimeString()));
  return (
    <View style={s.screen}>
      <Text style={s.h}>App status</Text>
      <Text style={s.p}>Current state: {appState}</Text>
      <Text style={s.p}>Last returned to foreground: {lastReturn}</Text>
      <Text style={[s.h, { marginTop: 28 }]}>Test notifications</Text>
      <Pressable style={s.btn} onPress={() => notifyNow('Study Planner', 'This is an instant notification.')}><Text style={s.btnText}>Send now</Text></Pressable>
      <Pressable style={s.btn} onPress={() => remindIn(10, 'Study Planner', 'Time for your study session!')}><Text style={s.btnText}>Remind me in 10 seconds</Text></Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: C.bg, padding: 20 },
  h: { fontSize: 20, fontWeight: '700', color: C.ink, marginBottom: 8 },
  p: { color: C.mute, fontSize: 16, marginBottom: 4 },
  btn: { backgroundColor: C.teal, padding: 14, borderRadius: 10, marginTop: 10 },
  btnText: { color: C.white, textAlign: 'center', fontWeight: '600' },
});
