export function CalendarWeekDays() {
  return (
    <div className="grid grid-cols-7 border text-center text-xs font-medium leading-6 text-foreground first:border-l-0">
      <div className="border-r px-3 py-2">Sun</div>
      <div className="border-r px-3 py-2">Mon</div>
      <div className="border-r px-3 py-2">Tue</div>
      <div className="border-r px-3 py-2">Wed</div>
      <div className="border-r px-3 py-2">Thu</div>
      <div className="border-r px-3 py-2">Fri</div>
      <div className="border-r px-3 py-2">Sat</div>
    </div>
  );
}
