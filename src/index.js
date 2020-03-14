module.exports = function check(str, bracketsConfig) {
  const openedBrackets = [];
  const closedBrackets = [];
  const brackets = [];

  const bracketType = {
    opened: 0,
    closed: 1
  }

  bracketsConfig.forEach(element => {
    openedBrackets.push(element[0]);
    closedBrackets.push(element[1]);  
  });

  function getBracketType(bracket){
    if(openedBrackets.includes(bracket) && closedBrackets.includes(bracket) && !brackets.includes(bracket))
      return bracketType.opened;
    else if(openedBrackets.includes(bracket) && closedBrackets.includes(bracket) && brackets.includes(bracket))
      return bracketType.closed;
    else if(openedBrackets.includes(bracket))
      return bracketType.opened;
    else
      return bracketType.closed;
  }

  function checkString(str){
    for(let i = 0; i < str.length; i++) {
      if(getBracketType(str[i]) === bracketType.opened)
        brackets.push(str[i]);
      else {
        let last = brackets.pop();

        if(!last)
          return false;
        else{
          let element = bracketsConfig.find(element => {
            return element[0] === last;
          });

          if(!element || element[1] !== str[i])
            return false;
        }
      }      
    }

    return brackets.length === 0;
  }

  return checkString(str);
} 