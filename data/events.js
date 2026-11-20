// Date helpers + hard-coded events (dates are relative to today so the calendar always has data)
export const pad = (n) => String(n).padStart(2, '0');
export const toKey = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const addDays = (n) => { const d = new Date(); d.setDate(d.getDate() + n); return toKey(d); };
export const todayKey = () => toKey(new Date());
export const prettyDate = (key) => { const [y, m, d] = key.split('-').map(Number); return new Date(y, m - 1, d).toDateString(); };

export const TYPE_COLORS = { Assignment: '#0B4F5C', Exam: '#C2410C', 'Due date': '#B91C1C', Reminder: '#D9822B', Study: '#2B7A4B', Meeting: '#7A4EAB' };
export const EVENT_TYPES = ['All', ...Object.keys(TYPE_COLORS)];

export const SEED_EVENTS = [
  { id: '1', title: 'Read Expo Router documentation', type: 'Study', date: addDays(0), time: '19:00', notes: 'Tabs, nested stacks and dynamic routes.', done: false },
  { id: '2', title: 'Group meeting: project proposal', type: 'Meeting', date: addDays(1), time: '14:00', notes: 'Discuss the proposal outline with the team.', done: false },
  { id: '3', title: 'Practice SQL joins', type: 'Study', date: addDays(1), time: '20:00', notes: 'Inner, left and right joins on the student database.', done: false },
  { id: '4', title: 'Mobile Computing Assignment 01', type: 'Assignment', date: addDays(2), time: '23:59', notes: 'Push to GitHub, add README and demo video link.', done: false },
  { id: '5', title: 'Return library books', type: 'Reminder', date: addDays(2), time: '16:00', notes: 'Return the two Database Systems books.', done: false },
  { id: '6', title: 'Submit ER diagram', type: 'Due date', date: addDays(3), time: '17:00', notes: 'Library system: Book, Member, Loan, Author.', done: false },
  { id: '7', title: 'Revise hypothesis testing', type: 'Study', date: addDays(3), time: '18:30', notes: 'z-test and t-test formula sheet.', done: false },
  { id: '8', title: 'Pay exam registration fee', type: 'Reminder', date: addDays(4), time: '12:00', notes: 'Pay at the faculty office before 3 PM.', done: false },
  { id: '9', title: 'Data Structures quiz', type: 'Exam', date: addDays(5), time: '10:30', notes: 'Linked lists, stacks and queues.', done: false },
  { id: '10', title: 'Linked list lab report', type: 'Assignment', date: addDays(6), time: '23:59', notes: 'Include screenshots of test cases.', done: false },
  { id: '11', title: 'English presentation', type: 'Assignment', date: addDays(7), time: '11:00', notes: 'Five-minute talk on a recent technology topic.', done: false },
  { id: '12', title: 'Meet supervisor', type: 'Meeting', date: addDays(8), time: '15:00', notes: 'Bring the progress report.', done: false },
  { id: '13', title: 'Statistics mid-semester exam', type: 'Exam', date: addDays(9), time: '09:00', notes: 'Probability, distributions and hypothesis testing.', done: false },
  { id: '14', title: 'Weekly review', type: 'Reminder', date: addDays(10), time: '20:00', notes: 'Check completed tasks and plan next week.', done: false },
  { id: '15', title: 'Regression lab report due', type: 'Due date', date: addDays(12), time: '23:59', notes: 'Include the scatter plot and interpretation.', done: false },
];
