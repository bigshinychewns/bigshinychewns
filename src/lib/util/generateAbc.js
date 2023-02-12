export default (tune) =>
`
T: ${tune.name}
R: ${tune.type}
M: ${tune.meter}
L: 1/8
K: ${tune.mode}
${tune.abc}
`
