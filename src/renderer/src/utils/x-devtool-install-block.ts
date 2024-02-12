(function () {
    const orginalInfo = console.info;
    console.info = function (...rest: any[]) {
        if (!/Download the React DevTools/.test(rest[0])) {
            orginalInfo.apply(console, rest);
        }
    };
})();
