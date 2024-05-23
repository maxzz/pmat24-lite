import { policy_t } from "../1-policy";
import { ParseError, ParseErrorType, RulesExtra } from "../2-adv-psw-policy";
import { PolicyParser } from "./psrser";

export type ParseAdvPolicyResult = {
    rulesExtra: RulesExtra;
    error: ParseError;
};

export function parse_advpolicy(advPolicy: string): ParseAdvPolicyResult {

    const rv: ParseAdvPolicyResult = {
        rulesExtra: new RulesExtra(),
        error: new ParseError("", ParseErrorType.errNone)
    };

    rv.error.type = ParseErrorType.errNone;

    const apparser = new PolicyParser();
    apparser.sourceText = advPolicy;

    try {
        apparser.doParse();
    } catch (error) {
        rv.error = error instanceof ParseError ? error : new ParseError('unknown', ParseErrorType.errUnexpected);
        rv.error.pos = apparser.sourceTextPos;

        console.error(`parse error: ${rv.error.what} at ${rv.error.pos}`);
    }

    if (rv.error.type == ParseErrorType.errNone) {
        rv.rulesExtra = apparser.rulesExtra;
    } else {
        rv.rulesExtra.rules = [];
    }

    return rv;
}

function parseExtPattern2RulesSet(pattern: string): ParseAdvPolicyResult
{
    let rv = parse_advpolicy(pattern);
    
    // if (rv.error.m_errorType !== ParseerrorType_t.errNone) { return; }

    //resolveRulesSetBounds(rv_rulesSet_);

    return rv;
}

export function parseExtPolicy2RulesSet(policy: policy_t): ParseAdvPolicyResult {
    let patternWithMinMaxRange = `${policy.policyExt}<${policy.minLength}, ${policy.maxLength}>`;
    return parseExtPattern2RulesSet(patternWithMinMaxRange);
}
