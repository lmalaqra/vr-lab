function convertToSlots(timeSlots, shiftLength) {
    const slots = [];
    const minStartTime = new Date(`1970-01-01T08:00:00`);
    const maxEndTime = new Date(`1970-01-01T15:30:00`);

    for (const { start, end } of timeSlots) {
        const startTime = new Date(`1970-01-01T${start}:00`);
        const endTime = new Date(`1970-01-01T${end}:00`);

        // Ensure start and end times are within valid range
        if (startTime < minStartTime || endTime > maxEndTime || startTime >= endTime) {
            continue; // Skip invalid time slots
        }

        // Loop to create slots
        while (startTime < endTime) {
            const nextSlotEnd = new Date(startTime.getTime() + shiftLength * 60 * 60 * 1000);
            if (nextSlotEnd > endTime || nextSlotEnd > maxEndTime) break; // Stop if the next slot goes beyond the end time
            slots.push({
                start: startTime.toTimeString().slice(0, 5), // Get HH:MM format
                end: nextSlotEnd.toTimeString().slice(0, 5), // Get HH:MM format
                length: shiftLength
            });
            startTime.setHours(startTime.getHours() + shiftLength);
        }
    }

    return slots;
}

function formatDate(date) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

function distributeShifts(availableHours, shiftLength, totalShifts, startDate) {
    const shifts = [];
    
    let totalAvailableSlots = 0;
    const today = new Date(startDate); // Use the provided start date

    for (const day in availableHours) {
        const slots = convertToSlots(availableHours[day], shiftLength);
        totalAvailableSlots += slots.length;
    }

    if (totalAvailableSlots < totalShifts) {
        return "Not enough available hours to distribute the shifts.";
    }

    // Distributing shifts
    let remainingShifts = totalShifts;

    for (const day in availableHours) {
        const slots = convertToSlots(availableHours[day], shiftLength);

        for (let i = 0; i < slots.length; i++) {
            if (remainingShifts <= 0) break;
            shifts.push({
                session_id: shifts.length, // Use the current length as session_id
                day: day,
                date: formatDate(today),
                start: slots[i].start,
                end: slots[i].end,
                length: slots[i].length
            });
            remainingShifts--;
        }
        if (remainingShifts <= 0) break;

        // Increment the date for the next day
        today.setDate(today.getDate() + 1);
    }

    return shifts;
}

// Example Usage




// Example Usage





module.exports= distributeShifts;



