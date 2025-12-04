import { Poli } from "@/store/manifest";
import { genUtils } from "../9-gen-utils";

// class generate_t
export function operator_generate(policy: Poli.Policy): string {

    // Check whether min is lower than max.
    if (policy.minLen > policy.maxLen) {
        return "";
    }

    //utils::reinitRandom();
    let finalPswLength = genUtils.getRandomInRange(policy.minLen, policy.maxLen);

    let rv_psw = '';

    // We skip duplicate check if the password length is more than the character set length.
    // To avoid exception when there are no unique characters within a set.
    let skipDuplicates = false;

    switch (policy.constrainSet) {
        case Poli.ConstrainSet.alphanumeric:
            rv_psw = genUtils.genAlphaNumeric(finalPswLength); // Initially, generate alpha numeric string.
            //rv_psw = utils::removeAdjacentDigits(rv_psw); //// Next, resolve adjacent digits.
            skipDuplicates = finalPswLength > genUtils.SET_AlphaNumeric.length;
            break;

        case Poli.ConstrainSet.alpha:
            rv_psw = genUtils.genAlpha(finalPswLength);
            skipDuplicates = finalPswLength > genUtils.SET_AlphaBoth.length;
            break;

        case Poli.ConstrainSet.numeric:
            rv_psw = genUtils.genNumeric(finalPswLength);
            skipDuplicates = finalPswLength > genUtils.SET_Numeric.length;
            break;

        case Poli.ConstrainSet.withspecial:
            rv_psw = genUtils.genAlphaNumSpecial(finalPswLength);
            skipDuplicates = finalPswLength > genUtils.SET_AlphaNumericSpecial.length;
            break;

        case Poli.ConstrainSet.atleastonenumber:
            rv_psw = genUtils.genAlphaNumeric(finalPswLength); // generate N alphanumeric characters

            if (finalPswLength == 1) // If the password length is 1 then we should ignore above generated value and use the below one.
                rv_psw = genUtils.genNumeric(1); //generate 1 numeric character

            //string_t num = utils::genNumeric(1); //generate 1 numeric character
            //char currentChar = num[0];

            //// AndreyB: see a note above.
            //rv_psw.insert(utils::getRandom(rv_psw.length() + 1), 1, currentChar); //insert it to the random place
            skipDuplicates = finalPswLength > genUtils.SET_AlphaNumeric.length;
            break;

        default: {
            console.log('generate: Inv.pol.mix=%d', policy.constrainSet);

            rv_psw = genUtils.genAlphaNumeric(finalPswLength);
            skipDuplicates = finalPswLength > genUtils.SET_AlphaNumeric.length;
        }
    }

    if (!skipDuplicates) {// Next, always remove duplicate characters.
        rv_psw = genUtils.removeDuplicateChars(rv_psw);
    }

    return rv_psw;
}
