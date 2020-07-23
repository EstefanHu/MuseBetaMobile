exports.useDateFormat = date => {
  try {
    const now = new Date(Date.now()).toString().split('T');
    const splitDate = date.split('T');

    if (now[0] === splitDate[0]) {
      if (+now[1].slice(2) < +splitDate[1].slice(2)) {
        return `${splitDate[1].slice(2) - +now[1].slice(2)} hours ago`;
      } else if (+now[1].slice(3, 5) < +splitDate[1].slice(3, 5)) {
        return `${splitDate[1].slice(2) - +now[1].slice(3, 5)} minutes ago`;
      } else {
        return 'Less than a minute ago';
      }
    } else {
      const destruct = splitDate[0].split('-');
      let month;
      switch (destruct[1]) {
        case '01':
          month = 'Jan';
          break;
        case '02':
          month = 'Feb'
          break;
        case '03':
          month = 'Mar';
          break;
        case '04':
          month = 'Apr';
          break;
        case '05':
          month = 'May';
          break;
        case '06':
          month = 'Jun';
          break;
        case '07':
          month = 'Jul';
          break;
        case '08':
          month = 'Aug';
          break;
        case '09':
          month = 'Sep';
          break;
        case '10':
          month = 'Oct';
          break;
        case '11':
          month = 'Nov';
          break;
        case '12':
          month = 'Dec';
          break;
        default:
          break;
      }
      return `${month} ${destruct[2]}, '${destruct[0].slice(-2)}`;
    }
  } catch (error) {
    return error;
  };
};