export const developmentData = {
  timetableId: '43202565-6691-4cbb-9045-6a7e18584c29',
  academicYear: '2026-27',
  semester: 3,
  score: 90,
  conflicts: 0,
  courses: 91,
  entries: 254,
  groups: 26,
  generationTime: 92087,
  lastUpdated: 'Today, 09:42 AM',
};

export const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
export const periods = ['09:00', '10:00', '11:15', '12:15', '14:00', '15:00'];
export const departments = ['All departments', 'CSE', 'CSE-DS', 'CSE-AIML', 'ECE', 'IT', 'Mechanical'];
export const groups = ['All groups', 'CSE-Y2-S3-A', 'CSE-Y2-S3-B', 'CSE-DS-Y2-S3-A', 'ECE-Y2-S3-A'];

const facultyNames = ['Dr. CSE Faculty 01', 'Dr. CSE Faculty 02', 'Prof. Systems 04', 'Dr. Networks 03'];
const roomNames = ['CR-04', 'CR-11', 'CR-18', 'LAB-03', 'LAB-07'];
const courseSeeds = [
  ['CS301', 'Database Management Systems', 'Theory', 'CSE', 'CSE-Y2-S3-A', 'CR-04'],
  ['CS302', 'Operating Systems', 'Theory', 'CSE', 'CSE-Y2-S3-A', 'CR-11'],
  ['CSL302', 'Operating Systems Lab', 'Lab', 'CSE', 'CSE-Y2-S3-A', 'LAB-03'],
  ['DS301', 'Data Structures', 'Theory', 'CSE-DS', 'CSE-DS-Y2-S3-A', 'CR-18'],
  ['IT206', 'Object Oriented Programming Lab', 'Lab', 'IT', 'IT-Y2-S3-A', 'LAB-07'],
  ['EC301', 'Digital Signal Processing', 'Theory', 'ECE', 'ECE-Y2-S3-A', 'CR-04'],
  ['CS305', 'Software Engineering', 'Theory', 'CSE', 'CSE-Y2-S3-B', 'CR-11'],
  ['CS307', 'Professional Elective', 'Seminar', 'CSE', 'CSE-Y2-S3-B', 'CR-18'],
];

export const timetableEntries = courseSeeds.map((seed, index) => ({
  id: index + 1,
  code: seed[0],
  name: seed[1],
  type: seed[2],
  department: seed[3],
  group: seed[4],
  room: seed[5],
  faculty: facultyNames[index % facultyNames.length],
  day: days[index % days.length],
  time: periods[(index * 2) % periods.length],
  duration: seed[2] === 'Lab' ? 2 : 1,
}));

export const faculty = facultyNames.map((name, index) => ({ name, code: `FAC-00${index + 1}`, department: index < 2 ? 'CSE' : 'CSE-DS', email: `${name.toLowerCase().replaceAll(' ', '.')}@sato.edu`, hours: 14 + index, max: 16, availability: 'Available' }));
export const rooms = roomNames.map((name, index) => ({ name, type: name.startsWith('LAB') ? 'Lab' : 'Classroom', building: index % 2 ? 'North Wing' : 'Innovation Hall', floor: index % 2 + 1, capacity: name.startsWith('LAB') ? 60 : 70, utilization: 54 + index * 7, status: 'Ready' }));
export const courseRows = courseSeeds.map(([code, name, type, department, group], index) => ({ code, name, type, department, credits: type === 'Lab' ? 2 : 3, sessions: type === 'Lab' ? 1 : 3, faculty: facultyNames[index % facultyNames.length], group }));
export const groupRows = ['CSE-Y2-S3-A', 'CSE-Y2-S3-B', 'CSE-DS-Y2-S3-A', 'ECE-Y2-S3-A', 'IT-Y2-S3-A'].map((name, index) => ({ name, department: name.split('-Y2')[0], year: 2, semester: 3, students: 55 + index * 2, sessions: 18 + index }));

export const dailyDistribution = [{ day: 'Mon', classes: 48 }, { day: 'Tue', classes: 52 }, { day: 'Wed', classes: 51 }, { day: 'Thu', classes: 55 }, { day: 'Fri', classes: 48 }];
export const workload = facultyNames.map((name, index) => ({ name: name.replace('Dr. ', '').replace('Prof. ', ''), scheduled: 14 + index, maximum: 16 }));
export const utilization = rooms.map((room) => ({ name: room.name, utilization: room.utilization }));
