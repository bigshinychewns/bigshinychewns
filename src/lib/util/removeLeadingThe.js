const removeLeadingThe = (string) =>
  string.indexOf('The ') === 0 || string.indexOf('the ') === 0
    ? string.slice(4)
    : string;

export default removeLeadingThe;
