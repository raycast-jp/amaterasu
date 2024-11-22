export const photoGraph = {
  version: 0.5,
  loop: {
    while: ":checkInput",
  },
  nodes: {
    userInput: {
      // Asks the user to enter the name of the person to interview.
      agent: "textInputAgent",
      params: {
        message: "写真を見るループ",
      },
    },
    checkInput: {
      // Checks if the user wants to terminate the chat or not.
      agent: "compareAgent",
      inputs: { array: [":userInput.text", "!=", "/bye"] },
    },
  },
};