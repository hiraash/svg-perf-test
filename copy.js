module.exports = {
    copyScripts: {
        src: [
            '{{ROOT}}/src/stats.min.js',
            '{{ROOT}}/node_modules/snapsvg/dist/snap.svg.js',
        ],
        dest: '{{WWW}}/build/'
    }
}
