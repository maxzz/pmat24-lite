// Sort by

export const enum SortBy {
    index,              // load order, i.e. unsorted
    url,                // domain, and then the rest: winapps, non manifest
    loginName,          // login form choose name, i.e. mandatory login name provided by the user
    //group,              // group by domain; TODO: not implemented yet
}

export const sortByNames = ["File index", "Website domain", "Login name", /*"Group"*/];

export const enum Order {
    lowToHigh,          // ascending
    highToLow
}

export const orderNames = ["Ascending", "Descending"];
