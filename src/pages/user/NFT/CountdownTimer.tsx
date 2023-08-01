import React from 'react';
import { getReturnValues, useCountdown } from '../../../hooks/useCountDown';

const ExpiredNotice = () => {
    return (
        <div className="expired-notice">
            <span>Expired!!!</span>
        </div>
    );
};
interface date {
    days: any
    hours: any
    minutes: any
    seconds: any
}
export const showDate = (days: any, hours: any, minutes: any, senconds: any) => {
    const d = days ? `${days}d ` : "";
    const h = hours ? `${hours}h ` : "";
    const m = minutes ? `${minutes}m ` : "";
    const s = senconds ? `${senconds}s ` : "";
    const res = d + h + m + s;
    if (res === "") return "Expired"
    return res;
}
const ShowCounter = ({ days, hours, minutes, seconds }: date) => {

    return (
        <div>{showDate(days, hours, minutes, seconds)}</div>
    );
};

const CountdownTimer = ({ targetDate }: { targetDate: any }) => {
    const [days, hours, minutes, seconds] = useCountdown(targetDate);

    if (days + hours + minutes + seconds <= 0) {
        return <ExpiredNotice />;
    } else {
        return (
            <ShowCounter
                days={days}
                hours={hours}
                minutes={minutes}
                seconds={seconds}
            />
        );
    }
};

export const  calTimeLeft = (countTime: any) => {
  
    const [days, hours, minutes, seconds] = getReturnValues(countTime); 
    return showDate(days, hours, minutes, seconds);
}

export default CountdownTimer;
