import React from 'react';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { useApp } from '../../context/AppContext';
import dayjs from 'dayjs';

function Calendar() {
  const { state } = useApp();
  
  // Get all dates that have todos (convert to YYYY-MM-DD format)
  const todoDates = state.importantDates.map(todo => todo.date);
  
  // Custom day component with dots
  const CustomDay = (props) => {
    const { day, outsideCurrentMonth, ...other } = props;
    
    // Check if this day has todos
    const dayString = day.format('YYYY-MM-DD');
    const hasTodos = todoDates.includes(dayString);
    
    return (
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <PickersDay
          {...other}
          day={day}
          outsideCurrentMonth={outsideCurrentMonth}
          sx={{
            fontSize: '12px',
            width: '32px',
            height: '32px',
            '&:hover': {
              backgroundColor: '#f3f4f6'
            }
          }}
        />
        {hasTodos && (
          <div
            style={{
              position: 'absolute',
              bottom: '2px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '6px',
              height: '6px',
              backgroundColor: '#ef4444',
              borderRadius: '50%',
              pointerEvents: 'none'
            }}
          />
        )}
      </div>
    );
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      padding: '8px',
      backgroundColor: '#f9fafb',
      borderRadius: '8px',
      marginBottom: '12px'
    }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar
          readOnly
          showDaysOutsideCurrentMonth
          slots={{
            day: CustomDay
          }}
          sx={{
            '& .MuiPickersCalendarHeader-root': {
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#374151',
              paddingLeft: '8px',
              paddingRight: '8px'
            },
            '& .MuiYearCalendar-root': {
              '& .MuiPickersYear-yearButton': {
                color: '#374151 !important', // Force override with !important
                fontSize: '14px',
                backgroundColor: 'white !important',
                '&:hover': {
                  backgroundColor: '#f3f4f6 !important'
                },
                '&.Mui-selected': {
                  backgroundColor: '#3b82f6 !important',
                  color: 'white !important'
                }
              }
            },
            '& .MuiPickersCalendarHeader-label': {
              fontSize: '14px',
              fontWeight: '600'
            },
            '& .MuiPickersArrowSwitcher-root': {
              '& .MuiIconButton-root': {
                padding: '4px',
                '& .MuiSvgIcon-root': {
                  fontSize: '18px'
                }
              }
            },
            '& .MuiDayCalendar-header': {
              '& .MuiTypography-root': {
                fontSize: '11px',
                fontWeight: '600',
                color: '#6b7280'
              }
            },
            '& .MuiPickersDay-root': {
              fontSize: '12px',
              fontWeight: '500',
              color: '#374151',
              '&.Mui-selected': {
                backgroundColor: '#3b82f6',
                '&:hover': {
                  backgroundColor: '#2563eb'
                }
              }
            },
            width: '280px',
            '& .MuiPickersCalendarHeader-root, & .MuiDayCalendar-header, & .MuiDayCalendar-weekContainer': {
              justifyContent: 'space-around'
            }
          }}
        />
      </LocalizationProvider>
    </div>
  );
}

export default Calendar;