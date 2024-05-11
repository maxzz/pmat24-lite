export function getPolicyExplanation(policy: string | undefined, policy2: string | undefined) {
    if (!policy && !policy2) {
        return 'n/a';
    }
    return 'defined';
}
