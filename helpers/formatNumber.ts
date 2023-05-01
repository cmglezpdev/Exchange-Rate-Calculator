
export const formatNumber = (number: string, roundDecimal?: number) : string => {
    if( !number ) return "";
    const value = number.replaceAll(",", "");
    const n = value.length;
    let pointIndex = value.split("").findIndex(c => c === ".");
    pointIndex = pointIndex === -1 ? n : pointIndex;
    let newvalue = "";

    if( !roundDecimal ) roundDecimal = n - pointIndex;
    for(let i = pointIndex, d = 0; i < n && d < roundDecimal; i ++, d ++) newvalue += value[i];
    for(let j = 0, i = pointIndex - 1; i >= 0; i --, j ++) {
      newvalue = value[i] + ((j !== 0 && (j%3) === 0) ? "," : "") + newvalue;
    }

    return newvalue;
}