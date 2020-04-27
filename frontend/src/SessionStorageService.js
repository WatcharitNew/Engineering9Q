// sessionStorageService.js
const SessionStorageService = (function () {
    var _service;
    function _getService() {
        if (!_service) {
            _service = this;
            return _service
        }
        return _service
    }

    function _setUserName(userName) {
        sessionStorage.setItem('userName', userName);
    }
    function _getUserName() {
        return sessionStorage.getItem('userName') || '';
    }
    function _clearUserName() {
        sessionStorage.removeItem('userName');
    }

    function _setScore(score) {
        sessionStorage.setItem('score', score);
    }
    function _getScore() {
        return sessionStorage.getItem('score') || '';
    }
    function _clearScore() {
        sessionStorage.removeItem('score');
    }

    function _setUserID(userID) {
        sessionStorage.setItem('userID', userID);
    }
    function _getUserID() {
        return sessionStorage.getItem('userID') || '';
    }
    function _clearUserID() {
        sessionStorage.removeItem('userID');
    }

    function _setMajor(major) {
        sessionStorage.setItem('major', major);
    }
    function _getMajor() {
        return sessionStorage.getItem('major') || '';
    }
    function _clearMajor() {
        sessionStorage.removeItem('major');
    }

    function _setMode(mode) {
        sessionStorage.setItem('mode', mode);
    }
    function _getMode() {
        return sessionStorage.getItem('mode') || '';
    }
    function _clearMode() {
        sessionStorage.removeItem('mode');
    }

    function _setFilter(filter) {
        sessionStorage.setItem('filter', filter);
    }
    function _getFilter() {
        return sessionStorage.getItem('filter') || '';
    }
    function _clearFilter() {
        sessionStorage.removeItem('filter');
    }

    function _setFinish(finish) {
        sessionStorage.setItem('finish', finish);
    }
    function _getFinish() {
        return sessionStorage.getItem('finish') || '';
    }
    function _clearFinish() {
        sessionStorage.removeItem('finish');
    }

    function _setToken(token) {
        sessionStorage.setItem('token', token);
    }
    function _getToken() {
        return sessionStorage.getItem('token') || '';
    }
    function _clearToken() {
        sessionStorage.removeItem('token');
    }

    function _checkOut() {
        _clearUserName();
        _clearUserID();
        _clearScore();
        _clearMajor();
        _clearMode();
        _clearFilter();
        _clearFinish();
        _clearToken();
    }

    return {
        getService: _getService,
        setUserID: _setUserID,
        getUserID: _getUserID,
        clearUserID: _clearUserID,
        setUserName: _setUserName,
        getUserName: _getUserName,
        clearUserName: _clearUserName,
        setScore: _setScore,
        getScore: _getScore,
        clearScore: _clearScore,
        setMajor: _setMajor,
        getMajor: _getMajor,
        clearMajor: _clearMajor,
        setMode: _setMode,
        getMode: _getMode,
        clearMode: _clearMode,
        setFilter: _setFilter,
        getFilter: _getFilter,
        clearFilter: _clearFilter,
        setFinish: _setFinish,
        getFinish: _getFinish,
        clearFinish: _clearFinish,
        setToken: _setToken,
        getToken: _getToken,
        clearToken: _clearToken,
        checkOut: _checkOut
    }
})();
export default SessionStorageService;