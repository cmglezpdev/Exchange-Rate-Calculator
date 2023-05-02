
export interface ConvertResult {
    currencyFrom: string;
    currencyTo: string;
    amount: string;
    result: string;
}


export interface ConvertResponseAPI {
    from: string, 
    to: string, 
    amount: number, 
    result: number
}



export interface ResultApiLAyerToConvert {
    // ...
  
    info : {
      rate: number;
      timestamp: number;
    };
  
    query: {
      amount: number;
      from:   string;
      to:     string;
    };
  
    result:     number;
    // ...
  }
