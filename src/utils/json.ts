export const parseJsonString = (jsonString: string) => {
  try {
    if (jsonString) {
      if (jsonString.length > 0) {
        const parsedData = JSON.parse(jsonString);
        return parsedData;
      } else return {}
    } else return {}
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return {};
  }
};