export function CalendarWeekDays() {
  return (
    <div className="grid grid-cols-7 border text-center text-xs font-semibold leading-6 text-foreground first:border-l-0">
      <div className="border-r py-3">Sun</div>
      <div className="border-r py-3">Mon</div>
      <div className="border-r py-3">Tue</div>
      <div className="border-r py-3">Wed</div>
      <div className="border-r py-3">Thu</div>
      <div className="border-r py-3">Fri</div>
      <div className="border-r py-3">Sat</div>
    </div>
  );
}
