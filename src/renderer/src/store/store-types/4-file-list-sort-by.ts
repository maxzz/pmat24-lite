// Sort by

export const enum SortBy {
    index,// load order, i.e. unsorted
    url,// domain, and then the rest: winapps, non manifest
    group
}

export const sortByNames = ["File index", "Website domain", /*"Group"*/];

export const enum Order {
    lowToHigh,// ascending
    highToLow
}

export const orderNames = ["Ascending", "Descending"];
