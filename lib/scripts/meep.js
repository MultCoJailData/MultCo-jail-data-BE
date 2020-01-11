// This is a demo script I (Ali) wrote as a proof of concept for page requests with a delay in between.
// We can throw it away any time, but I thought it was funny because it goes "meep."

const delay = (ms) => new Promise(_ => setTimeout(_, ms));

const arr = Array(15).fill('meep');

const meep = async() => {
  await Promise.all(arr.map(async(meep, i) => {
    await delay(i * 1000);
    console.log(meep);
  }));
};

meep()
  .then(() => console.log('done meeping'));