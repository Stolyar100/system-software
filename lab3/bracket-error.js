module.exports = class BracketError {
  static unexpectedBracket({
    errorLine,
    errorLineIndex,
    errorBracket,
    expectedBracket,
  }) {
    const ErrorMessage = `unexpected '${errorBracket}' at line ${errorLineIndex}, expected '${expectedBracket}'
    ${errorLine}`;
    return new Error(ErrorMessage);
  }

  static unclosedBracket({ errorLine, errorLineIndex, unclosedBracket }) {
    const ErrorMessage = `unclosed '${unclosedBracket}' at line ${errorLineIndex}
    ${errorLine}`;
    return new Error(ErrorMessage);
  }
};
