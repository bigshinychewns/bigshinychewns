import abcjs from 'abcjs';

const keyFromAbc = (abc) => {
  const renderObj = abcjs.renderAbc("*", abc)[0];
  const keySignature = renderObj.getKeySignature();
  return `${keySignature.root}${keySignature.mode}`
};

export default keyFromAbc;
