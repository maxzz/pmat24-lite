class generate_t
{
public:
    string_t operator()(__in const policy_t& policy_) {
        //srand(GetTickCount());
        //int pwdlen = static_cast<int>((policy_.maxlength - policy_.minlength + 1) * rand() / (RAND_MAX + 1) + policy_.minlength);

        // Check whether min is lower than max.
        if (policy_.GetMinLength() > policy_.GetMaxLength())
            return "";

        //utils::reinitRandom();
        size_t finalPswLength = utils::getRandomInRange(policy_.GetMinLength(), policy_.GetMaxLength());

        string_t rv_psw;
        // We skip duplicate check if the password length is more than the character set length.
        // To avoid exception when there are no unique characters within a set.
        bool skipDuplicates = false;

        switch (policy_.GetSimpleCharSet()) {
            case CHARSETTYPE::alphanumeric:
                rv_psw = utils::genAlphaNumeric(finalPswLength); // Initially, generate alpha numeric string.
                //rv_psw = utils::removeAdjacentDigits(rv_psw); //// Next, resolve adjacent digits.
                skipDuplicates = finalPswLength > utils::SET_AlphaNumeric.length();
                break;
            case CHARSETTYPE::alpha:
                rv_psw = utils::genAlpha(finalPswLength);
                skipDuplicates = finalPswLength > utils::SET_AlphaBoth.length();
                break;
            case CHARSETTYPE::numeric:
                rv_psw = utils::genNumeric(finalPswLength);
                skipDuplicates = finalPswLength > utils::SET_Numeric.length();
                break;
            case CHARSETTYPE::withspecial:
                rv_psw = utils::genAlphaNumSpecial(finalPswLength);
                skipDuplicates = finalPswLength > utils::SET_AlphaNumericSpecial.length();
                break;
            case CHARSETTYPE::atleastonenumber:
                rv_psw = utils::genAlphaNumeric(finalPswLength); // generate N alphanumeric characters

                if (finalPswLength == 1) // If the password length is 1 then we should ignore above generated value and use the below one.
                    rv_psw = utils::genNumeric(1); //generate 1 numeric character

                //string_t num = utils::genNumeric(1); //generate 1 numeric character
                //char currentChar = num[0];

                //// AndreyB: see a note above.
                //rv_psw.insert(utils::getRandom(rv_psw.length() + 1), 1, currentChar); //insert it to the random place
                skipDuplicates = finalPswLength > utils::SET_AlphaNumeric.length();
                break;
            default:
                console.log(wformat(L"generate: Inv.pol.mix=%d", (int)policy_.GetSimpleCharSet()));
                rv_psw = utils::genAlphaNumeric(finalPswLength);
                skipDuplicates = finalPswLength > utils::SET_AlphaNumeric.length();
        }

        if (!skipDuplicates) // Next, always remove duplicate characters.
            rv_psw = utils::removeDuplicateChars(rv_psw);

        return rv_psw;
    } //operator()(const policy_t& policy_)

}; //class generate_t
