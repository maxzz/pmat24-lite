/**
 * Specifies a repetition range like {n,m}. // default is { -1, -1 }
 * 
 * min and max - minimum and maximum length of repetition
 * 
 * We have four possible cases: missing both; {n}; {n,}; {n,m}.
 * 
 * * missing both -> {-1,-1} -> min = 1; max = 1;
 * * {n}          -> {n,-1}  -> min = n, max = n;
 * * {n,}         -> {n,-2}  -> min = n and max is determined using the final password length and other open ranges in rule.
 * * {n,m}        -> {n,m}   -> min = n, max = m;
 * 
 * min and max are min and max length of repetition and also can be:
 * * -1 if value is undefined by rule;
 * * -2 if value is ommited by rule.
 */
export type Range = {                                   // Repetition range. array of rules is a sequence like: a{1,2}A{1,1}[0-9]{1,1}
    min: number;
    max: number;
};

export class ChSet {                                    // Character set element as a simplest rule like: [a-z]{1,} with repetition.
    chars: string = '';                                 // A set of characters.
    min: number = -1;                                   // Minimum length of the set.
    max: number = -1;                                   // Maximum length of the set.
};

export class Group {                                    // Group element as a complex rule like: ([a-z]{1,}\A{3}\d{1,3}) with repetition.
    rules: Rule[] = [];                                 // Rules inside this group.
    min: number = -1;                                   // Minimum length of the set.
    max: number = -1;                                   // Maximum length of the set.
    mix: boolean = true;                                // True if permutation (rearranging) is allowed for this set.
};
//TODO: nested level. 0 for the lowest level, i.e. most nested group.
//TODO: group start in source text.

export class Rule {                                     // Element that has either chsetEntry_t or groupEntry_t.
    chSet: ChSet = new ChSet();                         // Character set element.
    group: Group = new Group();                         // Group element.
    isGroup: boolean = false;                           // True if group element.
};

export class RulesAndMeta {
    rules: Rule[] = [];
    targetMin: number = -1;                             // Targeted password length is set conditionally from UI if not set by custom rule (this case was used by C++ but not used in JS).
    targetMax: number = -1;                             // Total maximum length of password.

    noRepeat: boolean = false;                          // Whether to disallow repetition of same character consecutively. former: avoidConsecutiveChars
    noPrevPos: boolean = false;                         // Avoid same character in the same position as its recent (predecessor) value. former: avoidSamePositionChars
};
