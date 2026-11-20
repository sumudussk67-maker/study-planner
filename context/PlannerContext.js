import { createContext, useContext, useState } from 'react';
import { SEED_EVENTS } from '../data/events';
import { notifyNow, remindAt } from '../utils/notifications';

const Ctx = createContext();

// Global state shared by every screen: the list of events
export function PlannerProvider({ children }) {
  const [events, setEvents] = useState(SEED_EVENTS);

  const schedule = (e) => {
    if (e.remind) remindAt(new Date(`${e.date}T${e.time}:00`), `${e.type} reminder`, e.title);
  };

  const addEvent = (data) => {
    const e = { ...data, id: String(Date.now()), done: false };
    setEvents([...events, e]);
    notifyNow('Event added!', `${e.title} on ${e.date} at ${e.time}`);
    schedule(e);
  };

  const updateEvent = (id, data) => {
    setEvents(events.map((e) => (e.id === id ? { ...e, ...data } : e)));
    notifyNow('Event updated', data.title);
    schedule(data);
  };

  const deleteEvent = (id) => setEvents(events.filter((e) => e.id !== id));

  const toggleDone = (id) => {
    const e = events.find((x) => x.id === id);
    setEvents(events.map((x) => (x.id === id ? { ...x, done: !x.done } : x)));
    if (!e.done) notifyNow('Completed!', `Great job: ${e.title}`);
  };

  return <Ctx.Provider value={{ events, addEvent, updateEvent, deleteEvent, toggleDone }}>{children}</Ctx.Provider>;
}

export const usePlanner = () => useContext(Ctx);
