import { formatTimeDisplay } from "./timeConversion";

test("formats 60 seconds to 1:00", () => {
    const SECONDS_IN_MINUTE = 60;
    expect(formatTimeDisplay(SECONDS_IN_MINUTE)).toBe("1:00");
});