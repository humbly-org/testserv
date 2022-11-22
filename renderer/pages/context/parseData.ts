export const parseMessage = (message: string) => {
  const parsed = message.toString().replace(/^.{3}/g, '');
  if (JSONTryParse(parsed)) {
    return JSON.parse(parsed);
  }
  return false;
};

export function JSONTryParse(input: any) {
  try {
    //check if the string exists
    if (input) {
      var o = JSON.parse(input);

      //validate the result too
      if (o && o.constructor === Object) {
        return o;
      }
    }
  } catch (e: any) {}

  return false;
}
