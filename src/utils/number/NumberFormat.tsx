function formatAmount(value: number): string {
  if (value === undefined || value === null) return "";

  const parts = value.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return parts.join(".");
}

function formatDuration(millis: number): string {
  const hours = Math.floor(millis / (1_000 * 3_600));
  const minutes = Math.floor((millis % (1_000 * 3_600)) / 1_000 / 60);
  const seconds = Math.floor((millis % (1_000 * 60)) / 1_000);
  const ms = millis % 1_000;

  const parts = [
    hours > 0 ? hours + "hr" : null,
    minutes > 0 ? minutes + "m" : null,
    seconds > 0 ? seconds + "s" : null,
    ms > 0 ? ms + "ms" : null,
  ];
  return parts.filter(Boolean).join(" ");
}

export default {
  formatAmount,
  formatDuration,
};
