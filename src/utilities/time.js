const conflicts = [];

const isTermConflict = (termOne, termTwo) => {return termOne == termTwo};

const isDayConflict = (daysOne, daysTwo) => {return daysOne.includes(daysTwo)};

const isTimeConflict = (timesOne, timesTwo) => { 

    if ((timesOne[0] <= timesTwo[0]) && (timesTwo[0] <= timesOne[1])){
        // console.log((timesOne[0] < timesTwo[0]) && (timesTwo[0] < timesOne[1]));
        // console.log(timesOne);
        // console.log(timesTwo);
        return true;
    }

    if ((timesOne[0] <= timesTwo[1]) && (timesTwo[1] <= timesOne[1])){
        // console.log((timesOne[0] < timesTwo[1]) && (timesTwo[1] < timesOne[1]));
        // console.log(timesOne);
        // console.log(timesTwo);
        return true;
    }

    return false;
};


export const isMeetingConflict = (courseOne, courseTwo) => {
    if (courseOne == courseTwo) {
        return false;
    }
    
    if (isTermConflict(courseOne.term, courseTwo.term) == false){
        return false
    }

    const courseOne_meets = courseOne.meets.trim().split(/\s+/);
    const courseTwo_meets = courseTwo.meets.trim().split(/\s+/);

    const courseOne_days = courseOne_meets[0];
    const courseTwo_days = courseOne_meets[0];

    if (isDayConflict(courseOne_days, courseTwo_days) == false){
        return false;
    }

    const courseOne_time = courseOne_meets[1].trim().split("-");
    const courseTwo_time = courseTwo_meets[1].trim().split("-");

    const courseOne_begin = Number(courseOne_time[0].replace(':', ''));
    const courseOne_end = Number(courseOne_time[1].replace(':', ''))

    const courseTwo_begin = Number(courseTwo_time[0].replace(':', ''))
    const courseTwo_end = Number(courseTwo_time[1].replace(':', ''))
     
    return isTimeConflict([courseOne_begin, courseOne_end], [courseTwo_begin, courseTwo_end]);
};

export const createTimeConflictList = (course, courses) => {

    for (const [key, value] of Object.entries(courses)){
        if (isMeetingConflict(course, value)){
            conflicts.includes(value) 
            ? conflicts.splice(conflicts.indexOf(value), 1)
            : conflicts.push(value);
        }
    }

    return conflicts;
}