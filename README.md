# Study Planner

**Name:** G.G.SAMANTHA SUMUDU KUMARI GUNAWARDANA  
**Student ID:** MSC_CS_2025_023  
**Course:** COSC 64173 Mobile Computing, Assignment 01  
**Demo video:** https://youtu.be/ZxxvmOHg8Z0


## 1. What is the app?
Study Planner is a calendar-based planner for university students. The home screen shows a monthly calendar; tapping a date shows the assignments, exams, due dates, reminders, study sessions and meetings planned for that day. Users can add, edit, delete and complete events, and get a local notification reminder at the event time. It solves the problem of forgetting deadlines and not knowing what is due when.

## 2. Screens (4)
| Screen | File | Purpose |
|---|---|---|
| Calendar (Home) | `app/(tabs)/index.js` | Month calendar with dots on busy days, events of the selected date, add button, "Welcome back" banner |
| Upcoming | `app/(tabs)/upcoming.js` | All upcoming events sorted by date, filter by type |
| Settings | `app/(tabs)/settings.js` | AppState status and notification test buttons |
| Event Details | `app/event/[id].js` | Full details, mark done, edit, delete (with confirmation), back navigation |

## 3. Core components and where they are used
- **View, Text, Pressable, TextInput, Switch:** `components/Calendar.js`, `EventCard.js`, `EventFormModal.js`
- **FlatList:** Calendar screen (events of the day) and Upcoming screen, rendering `data/events.js` (15 events)
- **Modal:** `components/EventFormModal.js` (add and edit), `components/FilterModal.js` (type filter), delete confirmation in `app/event/[id].js`
- **ScrollView:** event details and the form
- **Image:** `app/(tabs)/index.js` (header banner on the Calendar screen)

## 4. Expo Router structure
```
app/
  _layout.js        Root Stack + PlannerProvider + notification permission
  (tabs)/
    _layout.js      Tab navigator (Calendar, Upcoming, Settings) with a badge of pending events
    index.js, upcoming.js, settings.js
  event/
    _layout.js      Nested Stack with header and back button
    [id].js         Dynamic route, e.g. /event/4
```

## 5. State management
`context/PlannerContext.js` keeps the `events` array with `useState` and shares it through React Context, with `addEvent`, `updateEvent`, `deleteEvent` and `toggleDone`. Adding an event on the Calendar screen immediately updates the dots on the calendar, the Upcoming list and the tab badge.

## 6. AppState
`hooks/useAppState.js` uses `AppState.addEventListener('change', ...)` to detect background/inactive to active. The Calendar screen shows a "Welcome back" banner, and Settings shows the time of the last return.

## 7. Local notifications: research and implementation
I read the expo-notifications documentation and learned that a notification handler is needed to show notifications while the app is open, permission must be requested, and Android needs a channel. `utils/notifications.js` uses `scheduleNotificationAsync` for an immediate notification (`trigger: null`), a time interval notification, and a date trigger (`remindAt`) that fires at the exact date and time of an event when its reminder switch is on. Adding, updating or completing an event also sends an immediate notification. In Expo Go on Android, creating the notification channel is not supported, so I wrapped it in try/catch to keep the app running.

## 8. Run locally
```bash
git clone https://github.com/sumudussk67-maker/study-planner.git
cd sumudussk67-maker
npm install --legacy-peer-deps
npx expo start
```

