import { date } from "quasar";

const units: any = {
  bytes: [
    { unit: "B", divisor: 1 },
    { unit: "KB", divisor: 1024 },
    { unit: "MB", divisor: 1024 * 1024 },
    { unit: "GB", divisor: 1024 * 1024 * 1024 },
    { unit: "TB", divisor: 1024 * 1024 * 1024 * 1024 },
    { unit: "PB", divisor: 1024 * 1024 * 1024 * 1024 * 1024 },
  ],
  seconds: [
    { unit: "ns", divisor: 0.000000001 },
    { unit: "μs", divisor: 0.000001 },
    { unit: "ms", divisor: 0.001 },
    { unit: "s", divisor: 1 },
    { unit: "m", divisor: 60 },
    { unit: "h", divisor: 3600 },
    { unit: "D", divisor: 86400 },
    { unit: "M", divisor: 2592000 }, // Assuming 30 days in a month
    { unit: "Y", divisor: 31536000 }, // Assuming 365 days in a year
  ],
  microseconds: [
    { unit: "ns", divisor: 0.001 },
    { unit: "μs", divisor: 1 },
    { unit: "ms", divisor: 1000 },
    { unit: "s", divisor: 1000000 },
    { unit: "m", divisor: 60 * 1000000 },
    { unit: "h", divisor: 3600 * 1000000 },
    { unit: "D", divisor: 86400 * 1000000 },
    { unit: "M", divisor: 2592000 * 1000000 }, // Assuming 30 days in a month
    { unit: "Y", divisor: 31536000 * 1000000 }, // Assuming 365 days in a year
  ],
  milliseconds: [
    { unit: "ns", divisor: 0.000001 },
    { unit: "μs", divisor: 0.001 },
    { unit: "ms", divisor: 1 },
    { unit: "s", divisor: 1000 },
    { unit: "m", divisor: 60 * 1000 },
    { unit: "h", divisor: 3600 * 1000 },
    { unit: "D", divisor: 86400 * 1000 },
    { unit: "M", divisor: 2592000 * 1000 }, // Assuming 30 days in a month
    { unit: "Y", divisor: 31536000 * 1000 }, // Assuming 365 days in a year
  ],
  nanoseconds: [
    { unit: "ns", divisor: 1 },
    { unit: "μs", divisor: 1000 },
    { unit: "ms", divisor: 1000000 },
    { unit: "s", divisor: 1000000000 },
    { unit: "m", divisor: 60 * 1000000000 },
    { unit: "h", divisor: 3600 * 1000000000 },
    { unit: "D", divisor: 86400 * 1000000000 },
    { unit: "M", divisor: 2592000 * 1000000000 }, // Assuming 30 days in a month
    { unit: "Y", divisor: 31536000 * 1000000000 }, // Assuming 365 days in a year
  ],
  bps: [
    { unit: "B/s", divisor: 1 },
    { unit: "KB/s", divisor: 1024 },
    { unit: "MB/s", divisor: 1024 * 1024 },
    { unit: "GB/s", divisor: 1024 * 1024 * 1024 },
    { unit: "TB/s", divisor: 1024 * 1024 * 1024 * 1024 },
    { unit: "PB/s", divisor: 1024 * 1024 * 1024 * 1024 * 1024 },
  ],
  kilobytes: [
    { unit: "B", divisor: 1 / 1024 },
    { unit: "KB", divisor: 1 },
    { unit: "MB", divisor: 1024 },
    { unit: "GB", divisor: 1024 * 1024 },
    { unit: "TB", divisor: 1024 * 1024 * 1024 },
    { unit: "PB", divisor: 1024 * 1024 * 1024 * 1024 },
  ],
  megabytes: [
    { unit: "B", divisor: 1 / (1024 * 1024) },
    { unit: "KB", divisor: 1 / 1024 },
    { unit: "MB", divisor: 1 },
    { unit: "GB", divisor: 1024 },
    { unit: "TB", divisor: 1024 * 1024 },
    { unit: "PB", divisor: 1024 * 1024 * 1024 },
  ],
  numbers: [
    { unit: "", divisor: 1 },
    { unit: "K", divisor: 1e3 },
    { unit: "M", divisor: 1e6 },
    { unit: "B", divisor: 1e9 },
    { unit: "T", divisor: 1e12 },
    { unit: "Q", divisor: 1e15 },
  ],
};

/**
 * Converts a value to a specific unit of measurement.
 *
 * @param {any} value - The value to be converted.
 * @param {string} unit - The unit of measurement to convert to.
 * @param {string} customUnit - (optional) A custom unit of measurement.
 * @return {object} An object containing the converted value and unit.
 */
export const getUnitValue = (
  value: any,
  unit: string,
  customUnit: string,
  decimals: number = 2,
) => {
  // console.time("getUnitValue:");
  let formattedValue;
  if (
    [
      "currency-dollar",
      "currency-euro",
      "currency-pound",
      "currency-yen",
      "currency-rupee",
    ].includes(unit)
  ) {
    const numericValue = parseFloat(value) || 0;
    const formattedNumber = numericValue.toFixed(decimals);

    const localeMap: any = {
      "currency-dollar": "en-US", // US Dollar
      "currency-euro": "de-DE", // Euro
      "currency-pound": "en-GB", // British Pound
      "currency-yen": "ja-JP", // Japanese Yen
      "currency-rupee": "en-IN", // Indian Rupee
    };

    formattedValue = new Intl.NumberFormat(localeMap[unit], {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(Number(formattedNumber));
  }

  // value sign: positive = 1, negative = -1
  const sign = Math.sign(value);
  // abs value
  const absValue = Math.abs(value);

  if (Number.isNaN(absValue) || Number.isNaN(sign)) {
    return { value: value, unit: "" };
  }

  // if value is missing use - as a placeholder
  if (isNaN(value) || value === "") {
    return { value: value === "" ? "-" : value, unit: "" };
  }

  switch (unit) {
    case "numbers":
    case "bytes":
    case "seconds":
    case "microseconds":
    case "milliseconds":
    case "nanoseconds":
    case "kilobytes":
    case "bps":
    case "megabytes": {
      // start with last index
      let unitIndex = units[unit].length - 1;
      // while the value is smaller than the divisor
      while (unitIndex > 0 && absValue < units[unit][unitIndex].divisor) {
        unitIndex--;
      }

      // calculate the final value: sign * absValue / divisor
      const finalValue = (
        (sign * absValue) /
        units[unit][unitIndex].divisor
      ).toFixed(decimals);
      const finalUnit = units[unit][unitIndex].unit;

      // console.timeEnd("getUnitValue:");
      return { value: finalValue, unit: finalUnit };
    }
    case "custom": {
      // console.timeEnd("getUnitValue:");
      return {
        value: `${parseFloat(value)?.toFixed(decimals) ?? 0}`,
        unit: `${customUnit ?? ""}`,
      };
    }
    case "percent-1": {
      // console.timeEnd("getUnitValue:");
      return {
        value: `${(parseFloat(value) * 100)?.toFixed(decimals) ?? 0}`,
        unit: "%",
      };
    }
    case "percent": {
      // console.timeEnd("getUnitValue:");
      return {
        value: `${parseFloat(value)?.toFixed(decimals) ?? 0}`,
        unit: "%",
      };
    }
    case "currency-pound": {
      return {
        value: `${formattedValue}`,
        unit: "£",
      };
    }
    case "currency-dollar": {
      return {
        value: `${formattedValue}`,
        unit: "$",
      };
    }
    case "currency-euro": {
      return {
        value: `${formattedValue}`,
        unit: "€",
      };
    }
    case "currency-yen": {
      return {
        value: `${formattedValue}`,
        unit: "¥",
      };
    }
    case "currency-rupee": {
      return {
        value: `${formattedValue}`,
        unit: "₹",
      };
    }
    case "default":
    default: {
      return {
        value: isNaN(value)
          ? value
          : value === ""
            ? "-"
            : ((+value)?.toFixed(decimals) ?? 0),
        unit: "",
      };
    }
  }
};

/**
 * Formats a unit value.
 *
 * @param {any} obj - The object containing the value and unit.
 * @return {string} The formatted unit value.
 */
export const formatUnitValue = (obj: any) => {
  const { unit } = obj;

  if (["$", "€", "£", "¥", "₹"].includes(unit)) {
    return `${obj.unit}${obj.value}`;
  }
  return `${obj.value}${obj.unit}`;
};

/**
 * Formats the given date into a string in the format "YY-MM-DD HH:MM:SS".
 *
 * @param {any} date - The date to be formatted.
 * @return {string} The formatted date string.
 */
export const formatDate = (date: any) => {
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// Check if the sample is time series
export const isTimeSeries = (sample: any) => {
  const iso8601Pattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
  return sample.every((value: any) => {
    return iso8601Pattern.test(value);
  });
};

//Check if the sample is timestamp
export const isTimeStamp = (sample: any) => {
  const microsecondsPattern = /^\d{16}$/;
  return sample.every((value: any) =>
    microsecondsPattern.test(value?.toString()),
  );
};

export function convertOffsetToSeconds(
  offset: string,
  endISOTimestamp: number,
) {
  try {
    const periodValue = parseInt(offset.slice(0, -1)); // Extract the numeric part
    const period = offset.slice(-1); // Extract the last character (unit)

    if (isNaN(periodValue)) {
      return {
        seconds: 0,
        periodAsStr: "",
      };
    }

    const subtractObject: any = {};

    let periodAsStr = periodValue.toString();

    switch (period) {
      case "s": // Seconds
        subtractObject.seconds = periodValue;
        periodAsStr += " Seconds ago";
        break;
      case "m": // Minutes
        subtractObject.minutes = periodValue;
        periodAsStr += " Minutes ago";
        break;
      case "h": // Hours
        subtractObject.hours = periodValue;
        periodAsStr += " Hours ago";
        break;
      case "d": // Days
        subtractObject.days = periodValue;
        periodAsStr += " Days ago";
        break;
      case "w": // Weeks
        subtractObject.days = periodValue * 7;
        periodAsStr += " Weeks ago";
        break;
      case "M": // Months (approximate, using 30 days per month)
        subtractObject.months = periodValue;
        periodAsStr += " Months ago";
        break;
      default:
        return {
          seconds: 0,
          periodAsStr: "",
        };
    }

    // subtract period from endISOTimestamp
    const startTimeStamp = date.subtractFromDate(
      endISOTimestamp,
      subtractObject,
    );

    // return difference of seconds between endISOTimestamp and startTimeStamp
    return {
      seconds: endISOTimestamp - startTimeStamp.getTime(),
      periodAsStr: periodAsStr,
    };
  } catch (error) {
    console.log(error);
    return {
      seconds: 0,
      periodAsStr: "",
    };
  }
}

// will find first valid mapped value based on given fieldToCheck
export const findFirstValidMappedValue = (
  value: any,
  mappings: any[],
  fieldToCheck: string,
) => {
  return mappings?.find((v: any) => {
    let isMatch = false;

    // Check based on type
    if (v?.type == "value") {
      isMatch = v?.value == value;
    } else if (v?.type == "range") {
      if (
        v?.from &&
        v?.to &&
        !Number.isNaN(+v?.from) &&
        !Number.isNaN(+v?.to)
      ) {
        isMatch = +v?.from <= +value && +v?.to >= +value;
      }
    } else if (v?.type == "regex") {
      isMatch = new RegExp(v?.pattern ?? "").test(value);
    }

    // If a match is found, check if the required field (color or text) is valid
    if (isMatch && v[fieldToCheck]) {
      return true;
    }

    return false;
  });
};

/**
 * Calculates the width of a given text.
 * Useful to calculate nameGap for the left axis
 *
 * @param {string} text - The text to calculate the width of.
 * @param {string} fontSize - The font size of the text.
 * @return {number} The width of the text in pixels.
 */
export const calculateWidthText = (
  text: string,
  fontSize: string = "12px",
): number => {
  if (!text) return 0;

  const span = document.createElement("span");
  document.body.appendChild(span);

  span.style.font = "sans-serif";
  span.style.fontSize = fontSize || "12px";
  span.style.height = "auto";
  span.style.width = "auto";
  span.style.top = "0px";
  span.style.position = "absolute";
  span.style.whiteSpace = "no-wrap";
  span.innerHTML = text;

  const width = Math.ceil(span.clientWidth);
  span.remove();
  return width;
};

/**
 * Calculates the optimal font size for a given text that fits the canvas width.
 * @param text - The text to calculate the font size for.
 * @param canvasWidth - canvas width in pixels
 * @returns {number} - The optimal font size in pixels.
 */
export const calculateOptimalFontSize = (text: string, canvasWidth: number) => {
  let minFontSize = 1; // Start with the smallest font size
  let maxFontSize = 90; // Set a maximum possible font size
  let optimalFontSize = minFontSize;

  while (minFontSize <= maxFontSize) {
    const midFontSize = Math.floor((minFontSize + maxFontSize) / 2);
    const textWidth = calculateWidthText(text, `${midFontSize}px`);

    if (textWidth > canvasWidth) {
      maxFontSize = midFontSize - 1; // Text is too wide, reduce font size
    } else {
      optimalFontSize = midFontSize; // Text fits, but we try larger
      minFontSize = midFontSize + 1;
    }
  }

  return optimalFontSize; // Return the largest font size that fits
};
