(function () {
    const orginalInfo = console.info;
    console.info = function (...rest: any[]) {
        // console.log(...rest, 'qq');
        if (!/Download the React DevTools/.test(rest[0])) {
            // console.log('info match', ...rest);
            orginalInfo.apply(console, rest);
        }
    };
})();
