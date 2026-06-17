import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Calendar, Clock, CheckCircle2, Loader2 } from "lucide-react";

// ============================================================
// 🔧 GOOGLE SHEETS CONFIG — change this to your own
// ============================================================
// EASIEST WAY (Google Apps Script Web App):
// 1. Open https://sheets.new and create a sheet with header row:
//    Timestamp | Name | Company | Email | Phone | Service | Description | Date | Time
// 2. In that sheet: Extensions → Apps Script. Paste this code:
//
//    function doPost(e) {
//      const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
//      const data = JSON.parse(e.postData.contents);
//      sheet.appendRow([
//        new Date(),
//        data.name, data.company, data.email, data.phone,
//        data.service, data.description, data.date, data.time
//      ]);
//      return ContentService.createTextOutput(JSON.stringify({ok:true}))
//        .setMimeType(ContentService.MimeType.JSON);
//    }
//
// 3. Click Deploy → New deployment → Type: Web app
//    - Execute as: Me
//    - Who has access: Anyone
//    Copy the Web app URL and paste it below ⬇️
// ============================================================
const GOOGLE_SHEETS_WEBHOOK_URL = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";
// ============================================================

const services = [
  "AI Automation",
  "Technology Solutions",
  "Marketing Growth",
  "Not sure yet",
];

const TIME_SLOTS = ["10:00 AM", "11:30 AM", "2:00 PM", "4:30 PM"];

// Build the next 6 working days (skipping Sundays). Past dates are not shown.
function buildUpcomingDays() {
  const days: { date: Date; label: string; day: number; disabled: boolean }[] = [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let cursor = new Date(today);
  while (days.length < 6) {
    if (cursor.getDay() !== 0) {
      days.push({
        date: new Date(cursor),
        label: cursor.toLocaleDateString("en-US", { weekday: "short" }),
        day: cursor.getDate(),
        disabled: false,
      });
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return days;
}

// Disable time slots that have already passed (only matters for today).
function isSlotPast(date: Date, slot: string) {
  const now = new Date();
  const sameDay = date.toDateString() === now.toDateString();
  if (!sameDay) return false;
  const [time, period] = slot.split(" ");
  const [h, m] = time.split(":").map(Number);
  let hour = h;
  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;
  const slotDate = new Date(date);
  slotDate.setHours(hour, m, 0, 0);
  return slotDate.getTime() <= now.getTime();
}

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const days = useMemo(buildUpcomingDays, []);
  const [selectedDayIdx, setSelectedDayIdx] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const selectedDate = days[selectedDayIdx].date;

    const payload = {
      name: String(fd.get("name") ?? ""),
      company: String(fd.get("company") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      service: String(fd.get("service") ?? ""),
      description: String(fd.get("description") ?? ""),
      date: selectedDate.toISOString().split("T")[0],
      time: selectedSlot ?? "",
    };

    try {
      // Send to Google Sheets via Apps Script Web App.
      // mode: "no-cors" keeps the browser happy — Apps Script still receives the data.
      await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Form submission failed:", err);
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-widest text-brand mb-3">Contact</div>
          <h2 className="text-3xl md:text-5xl font-semibold mb-4">
            Let's <span className="text-gradient">Automate Your Business</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Tell us about your business and we'll identify opportunities for automation and growth.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 glass rounded-2xl p-8 space-y-4"
          >
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-12 h-12 text-brand mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Thanks for reaching out!</h3>
                <p className="text-muted-foreground">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Full Name" name="name" required />
                  <Field label="Company Name" name="company" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Email" type="email" name="email" required />
                  <Field label="Phone Number" type="tel" name="phone" />
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                    Service Interested In
                  </label>
                  <select
                    name="service"
                    className="w-full h-11 px-3 rounded-lg bg-background/50 border border-border text-sm focus:border-brand outline-none transition"
                  >
                    {services.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                    Business Description
                  </label>
                  <textarea
                    name="description"
                    rows={4}
                    className="w-full px-3 py-2.5 rounded-lg bg-background/50 border border-border text-sm focus:border-brand outline-none transition resize-none"
                    placeholder="Tell us about your business and what you'd like to automate..."
                  />
                </div>
                {error && (
                  <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                    {error}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 rounded-lg bg-gradient-brand text-primary-foreground font-medium shadow-glow hover:opacity-90 transition disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {loading ? "Submitting..." : "Submit & Book Discovery Call"}
                </button>
              </>
            )}
          </motion.form>

          {/* Calendar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 glass rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 mb-5">
              <Calendar className="w-4 h-4 text-brand" />
              <span className="font-medium text-sm">Pick a time</span>
            </div>

            {/* Upcoming days — past days are not rendered */}
            <div className="grid grid-cols-6 gap-2 mb-6">
              {days.map((d, i) => {
                const active = i === selectedDayIdx;
                return (
                  <button
                    type="button"
                    key={d.date.toISOString()}
                    onClick={() => {
                      setSelectedDayIdx(i);
                      setSelectedSlot(null);
                    }}
                    className={`p-2 rounded-lg text-center text-xs border transition ${
                      active
                        ? "bg-gradient-brand border-transparent text-primary-foreground"
                        : "border-border hover:border-brand/40"
                    }`}
                  >
                    <div className="text-[10px] opacity-70">{d.label}</div>
                    <div className="font-medium mt-0.5">{d.day}</div>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              Available slots (IST)
            </div>
            <div className="grid grid-cols-2 gap-2">
              {TIME_SLOTS.map((s) => {
                const past = isSlotPast(days[selectedDayIdx].date, s);
                const active = selectedSlot === s;
                return (
                  <button
                    type="button"
                    key={s}
                    disabled={past}
                    onClick={() => setSelectedSlot(s)}
                    className={`p-2.5 rounded-lg text-xs font-medium border transition ${
                      past
                        ? "border-border/40 text-muted-foreground/40 line-through cursor-not-allowed"
                        : active
                          ? "border-brand text-brand bg-brand/10"
                          : "border-border hover:border-brand/40"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
            <div className="mt-6 pt-6 border-t border-border text-xs text-muted-foreground">
              30 min free discovery call · Google Meet
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
        {label}
        {required && <span className="text-brand"> *</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full h-11 px-3 rounded-lg bg-background/50 border border-border text-sm focus:border-brand outline-none transition"
      />
    </div>
  );
}
