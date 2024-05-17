class verify_t {
    //TODO: We need to generate explanation to user why policy verification failed. Later.
public:
    bool operator()(__in const policy_t& policy_, __in const string_t& psw_) {
        atltrace::scope_t scope("verPol");
        
        if (psw_.length() < policy_.GetMinLength() || psw_.length() > policy_.GetMaxLength()) {
            atltrace::error("inv.pol.length");
            return false;
        }

        // Never check duplication of characters during password verification.
        //if (policy_.m_noduplicate && utils::hasDuplicateChars(psw_))
        //{
        //	atltrace::error("Password with duplicate chars.");
        //	return false;
        //}

        switch (policy_.GetSimpleCharSet()) {
            case CHARSETTYPE::alphanumeric:
                if (psw_.find_first_not_of(utils::SET_AlphaNumeric) != -1) { // 1. We should validate whether the input string contains any characters other than alpha and numberic.
                    atltrace::error("utils::SET_AlphaNumeric");
                    return false;
                }

                if (psw_.find_first_of(utils::SET_AlphaBoth) == -1) { // 2. Should also validate whether the input string has both: alpha and numeric characters.
                    atltrace::error("no letter in the password");
                    return false;
                }

                if (psw_.find_first_of(utils::SET_Numeric) == -1) {
                    atltrace::error("no number in the password");
                    return false;
                }

                //if (utils::hasAdjacentDigits(psw_)) {
                //	atltrace::error("Password with adjacent digits.");
                //	return false;
                //}
                break;
            case CHARSETTYPE::alpha:
                if (psw_.find_first_not_of(utils::SET_AlphaBoth) != -1) {
                    atltrace::error("alpha/utils::SET_AlphaBoth");
                    return false;
                }
                break;
            case CHARSETTYPE::numeric:
                if (psw_.find_first_not_of(utils::SET_Numeric) != -1) {
                    atltrace::error("numeric/utils::SET_Numeric");
                    return false;
                }
                break;
            case CHARSETTYPE::withspecial:
                if (psw_.find_first_not_of(utils::SET_AlphaNumericSpecial) != -1) {
                    atltrace::error("withspecial/utils::SET_AlphaNumericSpecial");
                    return false;
                }

                if (psw_.find_first_of(utils::SET_Special) == -1) {
                    atltrace::error("no spec character in the password");
                    return false;
                }
                break;
            case CHARSETTYPE::atleastonenumber:
                if (psw_.find_first_not_of(utils::SET_AlphaNumeric) != -1) {
                    atltrace::error("atleastonenumber/utils::SET_AlphaNumeric");
                    return false;
                }

                if (psw_.find_first_of(utils::SET_AlphaBoth) == -1) {
                    atltrace::error("no letter in the password");
                    return false;
                }

                if (psw_.find_first_of(utils::SET_Numeric) == -1) {
                    atltrace::error("no digit in the password");
                    return false;
                }
                break;
            default:
                atltrace::error(wformat(L"Inv.pol.mix=%d", (int)policy_.GetSimpleCharSet()));
        }

        scope.text("ok");
        return true;
    }

}; //class verify_t
