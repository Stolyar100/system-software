const BracketError = require('./bracket-error');

class BracketService {
  checkBrackets(sourceString) {
    const openedBracketsPairs = {
      '(': ')',
      '[': ']',
      '{': '}',
    };

    const bracketsSequence = sourceString.match(/[\(\){}\[\]]/g);
    let openedBlocks = [];
    let errorBracketIndex = -1;

    iFor: for (let i = 0; i < bracketsSequence.length; i++) {
      if (bracketsSequence[i] in openedBracketsPairs) {
        openedBlocks.push({ bracket: bracketsSequence[i], position: i });
      } else {
        for (let j = i - 1; j > -1; j--) {
          if (openedBlocks.find((block) => block.position === j)) {
            if (
              openedBracketsPairs[bracketsSequence[j]] === bracketsSequence[i]
            ) {
              openedBlocks.pop();
              break;
            } else {
              errorBracketIndex = i;
              break iFor;
            }
          }
        }
      }
    }

    return this.handleCheckResult({
      errorBracketIndex,
      openedBlocks,
      sourceString,
      bracketsSequence,
      openedBracketsPairs,
    });
  }

  findErrorBracketOrder(bracketsSequence, errorBracketIndex) {
    const errorBracketOrder = bracketsSequence
      .slice(0, errorBracketIndex + 1)
      .filter(
        (bracket) => bracket === bracketsSequence[errorBracketIndex]
      ).length;
    return errorBracketOrder;
  }

  findErrorLine(sourceString, ErrorBracket, errorBracketOrder) {
    const errorLine = sourceString
      .split('\n')
      .filter((line) => line.includes(ErrorBracket))[errorBracketOrder - 1];
    return errorLine;
  }

  findErrorLineIndex(sourceString, errorLine) {
    const errorLineIndex = sourceString.split('\n').indexOf(errorLine);
    return errorLineIndex;
  }

  handleCheckResult({
    errorBracketIndex,
    openedBlocks,
    sourceString,
    bracketsSequence,
    openedBracketsPairs,
  }) {
    if (errorBracketIndex === -1 && openedBlocks.length > 0) {
      const { bracket, position } = openedBlocks.pop();
      const errorBracketOrder = this.findErrorBracketOrder(
        bracketsSequence,
        position
      );
      const errorLine = this.findErrorLine(
        sourceString,
        bracket,
        errorBracketOrder
      );
      const errorLineIndex = this.findErrorLineIndex(sourceString, errorLine);

      throw BracketError.unclosedBracket({
        errorLine,
        errorLineIndex,
        unclosedBracket: bracket,
      });
    } else if (errorBracketIndex !== -1) {
      const errorBracketOrder = this.findErrorBracketOrder(
        bracketsSequence,
        errorBracketIndex
      );
      const errorLine = this.findErrorLine(
        sourceString,
        bracketsSequence[errorBracketIndex],
        errorBracketOrder
      );
      const errorLineIndex = this.findErrorLineIndex(sourceString, errorLine);
      const errorBracket = bracketsSequence[errorBracketIndex];
      const expectedBracket = openedBracketsPairs[openedBlocks.pop().bracket];

      throw BracketError.unexpectedBracket({
        errorLine,
        errorLineIndex,
        errorBracket,
        expectedBracket,
      });
    }
  }
}

module.exports = new BracketService()
