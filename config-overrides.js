const {
    override,
    disableEsLint,
    addDecoratorsLegacy,
} = require('customize-cra');

module.exports = override(
    addDecoratorsLegacy(),
    disableEsLint(),
);
