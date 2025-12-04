export const SET_AlphaLower = "abcdefghikjlmnopqrstuvwxyz";
export const SET_AlphaUpper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const SET_AlphaBoth = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghikjlmnopqrstuvwxyz";
export const SET_Numeric = "0123456789";
export const SET_Special = "!\"#$%&'()*+,-./:;<=>?[\\]^_`{|}~@";
export const SET_AlphaNumeric = SET_AlphaBoth + SET_Numeric;
export const SET_AlphaNumericSpecial = SET_AlphaNumeric + SET_Special;

export const setSET_AlphaLower = new Set(SET_AlphaLower);
export const setSET_AlphaUpper = new Set(SET_AlphaUpper);
export const setSET_AlphaBoth = new Set(SET_AlphaBoth);
export const setSET_Numeric = new Set(SET_Numeric);
export const setSET_Special = new Set(SET_Special);
export const setSET_AlphaNumeric = new Set(SET_AlphaNumeric);
export const setSET_AlphaNumericSpecial = new Set(SET_AlphaNumericSpecial);
