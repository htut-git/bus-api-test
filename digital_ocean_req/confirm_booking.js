import axios from 'axios';

async function main (args){
    const url = 'https://busapi.official-crystal.com/api/buses/confirm-booking';
    const payload = {
        boardingPoint: args.boardingPoint,
        droppingPoint: args.droppingPoint,
        seatNo: args.seatNo,
        seatId: args.seatId,
        foreigner: args.foreigner,
        paymentMethod: args.paymentMethod,
        guestMobile: args.guestMobile,
        passengerName: args.passengerName,
        passengerType: args.passengerType,
        nrcNo: args.nrcNo,
        note: args.note
    };
    try {
        const response = await axios.post(url, payload);
        return response.data;
    } catch (error) {
        console.error('Error confirming booking:', error);
        throw error;
    }
}