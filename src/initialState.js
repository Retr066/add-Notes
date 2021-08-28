export default function initialState() {
  let notes = JSON.parse(localStorage.getItem('Notes'));
  if (!notes || notes < 1) {
    notes = {
      notes: [
        {
          id: 1,
          note: 'Porque te gusta sacar heroes gey loquito',
          color: 'blue',
          completed: false,
        },
      ],
    };
  } else {
    return { notes };
  }
  return notes;
}
