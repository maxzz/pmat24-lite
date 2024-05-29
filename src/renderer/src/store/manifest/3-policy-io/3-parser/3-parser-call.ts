import { PolicyIo } from "../../3-policy-io/1-policy";
import { ParseError, ParseErrorType, RulesExtra } from "./1-parser-types";
import { PolicyParser } from "./2-parser";

export type ParseAdvPolicyResult = {
    rulesExtra: RulesExtra;
    error: ParseError;
};

export function parse_advpolicy(advPolicy: string): ParseAdvPolicyResult {

    const rv: ParseAdvPolicyResult = {
        rulesExtra: new RulesExtra(),
        error: new ParseError("", ParseErrorType.none)
    };

    rv.error.type = ParseErrorType.none;

    const apparser = new PolicyParser();
    apparser.sourceText = advPolicy;

    try {
        apparser.doParse();
    } catch (error) {
        rv.error = error instanceof ParseError ? error : new ParseError('unknown', ParseErrorType.unexpected);
        rv.error.pos = apparser.sourceTextPos;

        console.error(`parse error: ${rv.error.what} at ${rv.error.pos}`);
    }

    if (rv.error.type == ParseErrorType.none) {
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

export function parseExtPolicy2RulesSet(policy: PolicyIo): ParseAdvPolicyResult {
    let patternWithMinMaxRange = `${policy.policyExt}<${policy.minLength}, ${policy.maxLength}>`;
    return parseExtPattern2RulesSet(patternWithMinMaxRange);
}
