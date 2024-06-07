export const helpRules: { c1: string; c2: string; }[] = [
    
    { c1: 'A', c2: 'Uppercase letters, i.e. A through Z' },
    { c1: 'a', c2: 'Lowercase letters, i.e. a through z ' },
    { c1: 'd', c2: 'Digits, i.e. 0 through 9' },
    { c1: 's', c2: 'Special characters, i.e. !”#$%&’()*+,?./:;??@[\]^_`{|}~' },

    {
        c1: '( )',
        c2: 'Use the enclosed indicators in random order. \
        For example: \
        (asd) would require or generate a password with a lower case letter, a special character and a digit in any order, i.e. b$3, #1f or 0z! \
        But the use of asd without the parentheses would always have a lowercase character first, a special character second and then a number.'
    },
    {
        c1: '[ ]',
        c2: 'Define a custom character set i.e. [abcdef] would limit the user to only those letters in the specified position. \
        For example: \
        A custom rule of [abcd]ds would generate only passwords with a, b, c or d in the first position, \
        a digit in the second position and a special character in the third position.'
    },
    {
        c1: '{n,m}',
        c2: 'Define a range of acceptable occurrences of the previously indicated character set. \
        For example: \
        d{2,4}a{2,}s{3} indicates 2 to 4 digits followed by 2 or more lower case letters and 3 special characters. \
        \
        Note that when there is a comma but no upper range defined, as in {2,}, then the upper limit is only \
        constrained by the maximum length of the password as specified in the field described below. \
        When only one value is specified - without the comma, as in {3}, then the lower and upper \
        range are the same, i.e. in this case, exactly 3 special characters.'
    },
    {
        c1: '~', c2: 'Prevent two identical consecutive characters \
        For example: \
        This symbol would prevent passwords such as abCCd or fkiq&33.'
    },
    {
        c1: '&', c2: 'Prevent a character being in the same position as in the most recent password \
        For example: \
        This symbol would prevent using the password abc3def if the most recent previous password was dar3feg.'
    },
];
