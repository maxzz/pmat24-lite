import { PolicyIo } from "../../3-policy-io/1-policy";
import { ParseError, ParseErrorType, RulesAndMeta } from "./1-parser-types";
import { PolicyParser } from "./2-parser";

export type ParseAdvPolicyResult = {
    rulesAndMeta: RulesAndMeta;
    error: ParseError;
};

export function parse_advpolicy(advPolicy: string): ParseAdvPolicyResult {

    const rv: ParseAdvPolicyResult = {
        rulesAndMeta: new RulesAndMeta(),
        error: new ParseError('', ParseErrorType.none)
    };

    const parser = new PolicyParser();
    parser.sourceText = advPolicy;

    try {
        parser.doParse();
    } catch (error) {
        rv.error = error instanceof ParseError ? error : new ParseError('unknown', ParseErrorType.unexpected);
        rv.error.pos = parser.sourceTextPos;

        console.error(`parse error: ${rv.error.what} at ${rv.error.pos}`);
    }

    if (rv.error.type === ParseErrorType.none) {
        rv.rulesAndMeta = parser.rulesAndMeta;
    } else {
        rv.rulesAndMeta.rules = [];
    }

    return rv;
}

function parseExtPattern2RulesSet(pattern: string): ParseAdvPolicyResult
{
    const rv = parse_advpolicy(pattern);
    
    // if (rv.error.m_errorType !== ParseerrorType_t.errNone) { return; }

    //resolveRulesSetBounds(rv_rulesSet_);

    return rv;
}

export function parseExtPolicy2RulesSet(policy: PolicyIo): ParseAdvPolicyResult {
    const patternWithMinMaxRange = `${policy.policyExt}<${policy.minLength}, ${policy.maxLength}>`;
    return parseExtPattern2RulesSet(patternWithMinMaxRange);
}
