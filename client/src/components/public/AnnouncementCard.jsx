const splitDate = (value) => {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return { day: "", month: value, iso: undefined };
  return {
    iso: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
    day: d.getDate(),
    month: d.toLocaleString("en-US", { month: "short" }),
    year: d.getFullYear(),
  };
};

/** One notice in the bulletin register: date column, then the notice itself. */
const AnnouncementCard = ({ title, content, date, category, urgent = false }) => {
  const { iso, day, month, year } = splitDate(date);

  return (
    <article className="grid grid-cols-[3.5rem_1fr] gap-4 py-6 sm:grid-cols-[4.5rem_1fr] sm:gap-6">
      <time dateTime={iso} className="leading-none">
        <span className={`block text-3xl sm:text-4xl font-extrabold [font-stretch:125%] tabular-nums ${urgent ? "text-error" : "text-primary"}`}>
          {day}
        </span>
        <span className="mt-1 block text-sm text-base-content/60">
          {month} {year}
        </span>
      </time>
      <div>
        <p className="text-sm text-base-content/60">{category}</p>
        <h3 className="type-heading mt-1">{title}</h3>
        <p className="mt-2 text-base-content/75 max-w-prose">{content}</p>
      </div>
    </article>
  );
};

export default AnnouncementCard;
