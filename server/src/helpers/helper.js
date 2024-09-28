function convertToSlots(timeSlots, shiftLength) {
    const slots = [];
    const shiftMinutes = shiftLength * 60; // Convert shift length to minutes

    for (const { start, end } of timeSlots) {
        const startTime = new Date(`1970-01-01T${start}:00`);
        const endTime = new Date(`1970-01-01T${end}:00`);

        // Loop to create slots
        while (startTime < endTime) {
            const nextSlotEnd = new Date(startTime.getTime() + shiftMinutes * 60 * 1000);
            if (nextSlotEnd > endTime) break; // Stop if the next slot goes beyond the end time
            slots.push({
                start: startTime.toTimeString().slice(0, 5), // Get HH:MM format
                end: nextSlotEnd.toTimeString().slice(0, 5), // Get HH:MM format
                length: shiftLength
            });
            startTime.setMinutes(startTime.getMinutes() + shiftMinutes); // Move to the next slot
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

    // Calculate total available slots
    for (const day in availableHours) {
        const slots = convertToSlots(availableHours[day], shiftLength);
        totalAvailableSlots += slots.length;
        console.log(`Available slots on ${day}:`, slots.length); // Debugging line
    }

    console.log(`Total available slots: ${totalAvailableSlots}`); // Debugging line

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

// Example usage



module.exports = distributeShifts;
