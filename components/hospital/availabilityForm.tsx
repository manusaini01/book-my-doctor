'use client'
import React, { useState } from 'react';

interface AvailabilityFormProps {
  doctorId: string;
  onSave: () => void;
}

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const AvailabilityForm: React.FC<AvailabilityFormProps> = ({ doctorId, onSave }) => {
  const [availableDays, setAvailableDays] = useState<string[]>([]);
  const [availableHours, setAvailableHours] = useState<Record<string, string>>({});

  const handleDayChange = (day: string) => {
    setAvailableDays(prevDays => 
      prevDays.includes(day) ? prevDays.filter(d => d !== day) : [...prevDays, day]
    );
  };

  const handleHourChange = (day: string, hours: string) => {
    setAvailableHours(prevHours => ({
      ...prevHours,
      [day]: hours,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/doctors/availability', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ doctorId, availableDays, availableHours }),
    });

    if (response.ok) {
      alert('Availability updated successfully!');
      onSave();
    } else {
      alert('Failed to update availability.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Select Available Days</h3>
      <div>
        {daysOfWeek.map(day => (
          <label key={day} style={{ display: 'block', marginBottom: '10px' }}>
            <input
              type="checkbox"
              value={day}
              checked={availableDays.includes(day)}
              onChange={() => handleDayChange(day)}
            />
            {day}
            {availableDays.includes(day) && (
              <input
                type="text"
                placeholder="Enter hours (e.g., 09:00-12:00, 14:00-18:00)"
                value={availableHours[day] || ''}
                onChange={(e) => handleHourChange(day, e.target.value)}
                style={{ marginLeft: '10px' }}
              />
            )}
          </label>
        ))}
      </div>
      <button type="submit" style={{ marginTop: '20px' }}>
        Save Availability
      </button>
    </form>
  );
};

export default AvailabilityForm;
