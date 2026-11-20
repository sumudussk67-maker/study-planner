import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Show notifications even while the app is open
Notifications.setNotificationHandler({
  handleNotification: async () => ({ shouldShowBanner: true, shouldShowList: true, shouldPlaySound: false, shouldSetBadge: false }),
});

export async function setupNotifications() {
  try {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', { name: 'default', importance: Notifications.AndroidImportance.DEFAULT });
    }
  } catch (e) { console.log('Channel setup skipped:', e.message); }
  try {
    const { status } = await Notifications.requestPermissionsAsync();
    return status === 'granted';
  } catch (e) { console.log('Permission failed:', e.message); return false; }
}

// Immediate notification (trigger: null)
export async function notifyNow(title, body) {
  try { await Notifications.scheduleNotificationAsync({ content: { title, body }, trigger: null }); }
  catch (e) { console.log('Notification failed:', e.message); }
}

// Scheduled notification after N seconds
export async function remindIn(seconds, title, body) {
  try {
    await Notifications.scheduleNotificationAsync({
      content: { title, body },
      trigger: { type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, seconds },
    });
  } catch (e) { console.log('Reminder failed:', e.message); }
}

// Notification at an exact date and time (used for event reminders)
export async function remindAt(date, title, body) {
  if (date <= new Date()) return;
  try {
    await Notifications.scheduleNotificationAsync({
      content: { title, body },
      trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date },
    });
  } catch (e) { console.log('Reminder failed:', e.message); }
}
