const verb = process.env.VERB && process.env.VERB.toLowerCase() === 'true';

export default checkVerb;

function checkVerb(log) {
  if (verb) {
    console.log(log);
  }
}
