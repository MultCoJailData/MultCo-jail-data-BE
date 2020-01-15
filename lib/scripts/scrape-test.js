let numArray = ['19CR20202', '18CR12345', '20CR12345', '19CR12345'];
const testFunction = () => {
  let slicedArray = [];
  numArray.forEach(number => {
    slicedArray.push((number.slice(0, 2)) + (number.slice(4)));
  });
  console.log(slicedArray);
  console.log(Math.max.apply(null, slicedArray));
};
testFunction();


// $('#charge-info > h3').each(function() {
//     let caseNumber = $('.court-case-number > b', this).text().slice(2, 4);
//     console.log(caseNumber);
//     let numberArray = [];
//     numberArray.push(caseNumber);
//     const caseInfo = {
//       charges: []
//     };

//     $(this).next().find('li').each(function() {
//       const charge = {

//         description: $('.charge-description-display', this).text(),
//         bail: $('.charge-bail-display > span', this).text(),
//         status: $('.charge-status-display > span', this).text()
//       };
//       caseInfo.charges.push(charge);
//     });
//     if(caseNumber === (Math.max.apply(null, numberArray))){
//       caseInfo.courtCaseNumber = caseNumber;
//     }
//     cases.push(caseInfo);
//   });
//   booking.cases = cases;
//   return booking;
// };
