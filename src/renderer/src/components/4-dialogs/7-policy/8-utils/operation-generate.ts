import { password } from "./types";
import { utils } from "./utils";

// class generate_t
export function operator_generate(policy_: password.policy_t): string {

    // Check whether min is lower than max.
    if (policy_.minLength > policy_.maxLength) {
        return "";
    }

    //utils::reinitRandom();
    let finalPswLength = utils.getRandomInRange(policy_.minLength, policy_.maxLength);

    let rv_psw = '';

    // We skip duplicate check if the password length is more than the character set length.
    // To avoid exception when there are no unique characters within a set.
    let skipDuplicates = false;

    switch (policy_.simpleChSet) {
        case password.CHARSETTYPE.alphanumeric:
            rv_psw = utils.genAlphaNumeric(finalPswLength); // Initially, generate alpha numeric string.
            //rv_psw = utils::removeAdjacentDigits(rv_psw); //// Next, resolve adjacent digits.
            skipDuplicates = finalPswLength > utils.SET_AlphaNumeric.length;
            break;

        case password.CHARSETTYPE.alpha:
            rv_psw = utils.genAlpha(finalPswLength);
            skipDuplicates = finalPswLength > utils.SET_AlphaBoth.length;
            break;

        case password.CHARSETTYPE.numeric:
            rv_psw = utils.genNumeric(finalPswLength);
            skipDuplicates = finalPswLength > utils.SET_Numeric.length;
            break;

        case password.CHARSETTYPE.withspecial:
            rv_psw = utils.genAlphaNumSpecial(finalPswLength);
            skipDuplicates = finalPswLength > utils.SET_AlphaNumericSpecial.length;
            break;

        case password.CHARSETTYPE.atleastonenumber:
            rv_psw = utils.genAlphaNumeric(finalPswLength); // generate N alphanumeric characters

            if (finalPswLength == 1) // If the password length is 1 then we should ignore above generated value and use the below one.
                rv_psw = utils.genNumeric(1); //generate 1 numeric character

            //string_t num = utils::genNumeric(1); //generate 1 numeric character
            //char currentChar = num[0];

            //// AndreyB: see a note above.
            //rv_psw.insert(utils::getRandom(rv_psw.length() + 1), 1, currentChar); //insert it to the random place
            skipDuplicates = finalPswLength > utils.SET_AlphaNumeric.length;
            break;

        default:
            console.log('generate: Inv.pol.mix=%d', policy_.simpleChSet);

            rv_psw = utils.genAlphaNumeric(finalPswLength);
            skipDuplicates = finalPswLength > utils.SET_AlphaNumeric.length;
    }

    if (!skipDuplicates) {// Next, always remove duplicate characters.
        rv_psw = utils.removeDuplicateChars(rv_psw);
    }

    return rv_psw;
}