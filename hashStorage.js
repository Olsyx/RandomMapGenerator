var hashStorage = (function(){

    function getHashContent() {
        return atob(decodeURIComponent(location.hash.substring(1)));
    }

    function generateHash(content) {
        return encodeURIComponent(btoa(content));
    }

    function get() {
        var content = getHashContent()
        if (content) {
            return JSON.parse(content)
        }
        return null
    }

    function set(object) {
        if (!object) {
            location.hash = ""
        } else {
            var content = JSON.stringify(object)
            location.hash = generateHash(content)
        }
    }

    return { get: get, set: set }

})()
