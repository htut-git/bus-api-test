import models from "../models/index.mjs";

export function getSeatRawNumber(seatNumbers, formattedSeatPlan) {
    // If seatNumbers is a string, split it by comma and trim spaces
    if (typeof seatNumbers === 'string') {
        seatNumbers = seatNumbers.split(',').map(s => s.trim());
    }
    const seatRawArray = [];
    const seatMap = formattedSeatPlan.seatMap;
    for (const row of seatMap) {
        for (const seat of row) {
            for (const [rawNo, seatNo] of Object.entries(seat)) {
                if (seatNumbers.includes(seatNo)) {
                    seatRawArray.push(rawNo);
                }
            }
        }
    }
    return seatRawArray;
}

export async function getNewBookingRef() {
    // Get the latest booking by ref in descending order
    const latestBooking = await models.Booking.findOne({
        order: [['id', 'DESC']],
        paranoid: false,
    });
    let newRef = 'AAAAA';
    if (latestBooking && latestBooking.b_ref) {
        // Increment the ref string (e.g., AAA -> AAB, AAZ -> ABA)
        newRef = incrementRef(latestBooking.b_ref);
        console.log(`Latest booking reference found: ${latestBooking.b_ref}`);
        console.log(`New booking reference generated: ${newRef}`);

    }
    return newRef;
}

// Helper function to increment a string ref (A-Z only)
function incrementRef(ref) {
    const chars = ref.split('');
    let i = chars.length - 1;
    while (i >= 0) {
        if (chars[i] === 'Z') {
            chars[i] = 'A';
            i--;
        } else {
            chars[i] = String.fromCharCode(chars[i].charCodeAt(0) + 1);
            // Set all characters to the right to 'A'
            for (let j = i + 1; j < chars.length; j++) {
                chars[j] = 'A';
            }
            return chars.join('');
        }
    }
    // If all characters were 'Z', add an extra 'A' at the beginning
    return 'A' + chars.join('');
}

export function getRawBookingRef(b_ref, bus_id, member_id = 0) {
    // Booking REF (Alpha) - pad with 'A' to the left, to 5 characters, then uppercase
    b_ref = b_ref.toString().padStart(5, 'A').toUpperCase();

    // Member REF
    const memberInc = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

    // Ensure member_id is a string of at least 5 digits, padded with 0
    let memberIdStr = member_id.toString().padStart(5, '0');
    const memberIdLength = Math.max(memberIdStr.length - 4, 0);

    // Remove the first digit and append the character from memberInc
    let memberIdArr = memberIdStr.split('');
    memberIdArr.shift(); // remove first digit
    const memberRef = memberIdArr.join('') + memberInc[memberIdLength];

    // Bus REF
    const busRef = 'B' + bus_id.toString().padStart(3, '0');

    return b_ref + memberRef + busRef;
}
