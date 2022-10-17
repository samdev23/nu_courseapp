const isTermConflict = (termOne, termTwo) => {termOne == termTwo};

const isDayConflict = (daysOne, daysTwo) => {daysOne.includes(daysTwo)};

const isTimeConflict = (timesOne, timesTwo) => { //TODO

};


export const isMeetingConflict = (courseOne, courseTwo) => {
    isTermConflict(courseOne.term, courseTwo.term);

    //Slice days from time in the meets variable
    isDayConflict();
    isTimeConflict();

    //TODO
};