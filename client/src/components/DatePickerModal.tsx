import React, { useCallback, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import DatePicker from "react-datepicker";
import { format, isValid, parse } from "date-fns";

import { TextInput } from "./TextInput";
import { SecondaryButton, TertiaryOutlinedButton, YearButton } from "./Buttons";

type Props = {
  startDate: Date;
  endDate: Date;
  handleDateSelect: (dates: Date[]) => void;
  handleClose: () => void;
  handleApply: () => void;
};

export default function DatePickerModal({
  startDate,
  endDate,
  handleDateSelect,
  handleClose,
  handleApply,
}: Props) {
  const [selectedYear, setSelectedYear] = useState<number>();
  const [startFormat, setStartFormat] = useState('');
  const [endFormat, setEndFormat] = useState('');

  const getYears = () => {
    const currentYear = (new Date()).getFullYear();
    const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step));
    return range(currentYear, currentYear - 50, -1);
  };

  useEffect(() => {
    const start = new Date(startDate);
    setSelectedYear(start.getFullYear());
    const startFormatted = format(start, "MMM d, yyyy");
    let endFormatted = "";
    if (endDate) {
      endFormatted = format(new Date(endDate), "MMM d, yyyy");
    }
    setStartFormat(startFormatted);
    setEndFormat(endFormatted);
  }, [startDate, endDate]);

  const handleStartInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value = '' } = e.target;
    setStartFormat(value);
    const date = parse(value, 'MMM d, yyyy', new Date());
    if (isValid(date)) {
      handleDateSelect([date, endDate]);
    }
  }, [endDate, handleDateSelect]);

  const handleEndInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value = '' } = e.target;
    setEndFormat(value);
    const date = parse(value, 'MMM d, yyyy', new Date());
    if (isValid(date)) {
      handleDateSelect([startDate, date]);
    }
  }, [startDate, handleDateSelect]);

  const handleSelectedYear = useCallback((year: number) => {
    const start = new Date(startDate);
    start.setFullYear(year);
    let end = endDate;
    if (endDate) {
      end = new Date(endDate)
      end.setFullYear(year);
    }
    handleDateSelect([start, end]);
    setSelectedYear(year);
  }, [startDate, endDate, handleDateSelect]);

  return (
    <Box display="flex" maxHeight={468} sx={{ overflowY: 'auto' }}>
      <Box
        px={2}
        py={1.5}
        display="flex"
        flexDirection="column"
        overflow="auto"
      >
        {getYears().map((year: number, index: number) => (
          <YearButton
            key={year}
            variant="contained"
            selected={year === selectedYear}
            isLast={index === getYears().length - 1}
            onClick={() => handleSelectedYear(year)}
          >
            {year}
          </YearButton>
        ))}
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        borderLeft="1px solid #EAECF0"
      >
        <DatePicker
          inline
          selected={startDate}
          startDate={startDate}
          endDate={endDate}
          onChange={handleDateSelect}
          monthsShown={2}
          shouldCloseOnSelect={false}
          selectsRange
          calendarStartDay={1}
          adjustDateOnChange
        />
        <Box
          display="flex"
          p={2}
          justifyContent="space-between"
          borderTop="1px solid #EAECF0"
        >
          <Box display="flex" alignItems="center">
            <TextInput
              variant="outlined"
              value={startFormat}
              onChange={handleStartInput}
            />
            <Typography sx={{ mx: 1.5 }}>
              -
            </Typography>
            <TextInput
              variant="outlined"
              value={endFormat}
              onChange={handleEndInput}
            />
          </Box>
          <Box display="flex" alignItems="center">
            <TertiaryOutlinedButton onClick={handleClose}>
              Cancel
            </TertiaryOutlinedButton>
            <SecondaryButton variant="contained" onClick={handleApply}>
              Apply
            </SecondaryButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
