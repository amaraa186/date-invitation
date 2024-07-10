import dynamic from "next/dynamic";
import { withRouter } from "next/router";

const Calendar = dynamic(() => import("app/modules/calendar/CalendarView"), {
  ssr: false,
});

function CalendarPage() {
  return <Calendar />;
}

export default withRouter(CalendarPage);
