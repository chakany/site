<script>
  import { onMount } from 'svelte';

  let estTimeString = '';
  let differenceString = '';

  // Calculate the time zone offset in minutes
  function getOffset(timeZone) {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    });
    const parts = formatter.formatToParts(now);
    const year = parts.find(p => p.type === "year").value;
    const month = parts.find(p => p.type === "month").value - 1; // 0-based
    const day = parts.find(p => p.type === "day").value;
    const hour = parts.find(p => p.type === "hour").value;
    const minute = parts.find(p => p.type === "minute").value;
    const second = parts.find(p => p.type === "second").value;
    const tzDate = new Date(Date.UTC(year, month, day, hour, minute, second));
    const offsetMs = tzDate.getTime() - now.getTime();
    return offsetMs / 60000; // Convert milliseconds to minutes
  }

  // Format the time difference, only if it's 1 minute or more
  function formatDifference(minutes) {
    const absMinutes = Math.abs(minutes);
    if (absMinutes < 1) {
      return ""; // No difference shown if less than 1 minute
    }
    const hours = Math.floor(absMinutes / 60);
    const mins = Math.round(absMinutes % 60);
    let str = "";
    if (hours > 0) {
      str += `${hours} hour${hours > 1 ? "s" : ""}`;
    }
    if (mins > 0 || hours === 0) {
      if (str) str += " ";
      str += `${mins} minute${mins > 1 ? "s" : ""}`;
    }
    if (str === "") str += "0 hours";
    return minutes > 0 ? `${str} ahead` : `${str} behind`;
  }

  onMount(() => {
    const update = () => {
      const now = new Date();
      const localOffset = -now.getTimezoneOffset(); // Local offset in minutes
      const estOffset = getOffset("America/New_York"); // EST offset in minutes
      const differenceMinutes = Math.round(localOffset - estOffset); // Round to nearest integer

      // Format EST time with hours, minutes, seconds
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/New_York",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      });
      const timeString = formatter.format(now);
      // Append milliseconds
      const milliseconds = String(now.getMilliseconds()).padStart(3, '0');
      let fuck = timeString.split(" ");
      estTimeString = `${fuck[0]}.${milliseconds} ${fuck[1]}`;

      // Set difference string (empty if less than 1 minute)
      differenceString = formatDifference(differenceMinutes);
    };

    update(); // Initial update
    const interval = setInterval(update, 50); // Update every 50ms for millisecond precision
    return () => clearInterval(interval); // Cleanup on unmount
  });
</script>

<div>
  {estTimeString}
  {#if differenceString !== ""}
    ({differenceString})
  {/if}
</div>
