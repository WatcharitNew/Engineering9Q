// LocalStorageService.js
const LocalStorageService = (function () {
    var _service;
    function _getService() {
        if (!_service) {
            _service = this;
            return _service
        }
        return _service
    }

    function _setUserName(userName) {
        localStorage.setItem('userName', userName);
    }
    function _getUserName() {
        return localStorage.getItem('userName') || '';
    }
    function _clearUserName() {
        localStorage.removeItem('userName');
    }

    function _setScore(score) {
        localStorage.setItem('score', score);
    }
    function _getScore() {
        return localStorage.getItem('score') || '';
    }
    function _clearScore() {
        localStorage.removeItem('score');
    }

    function _setUserID(userID) {
        localStorage.setItem('userID', userID);
    }
    function _getUserID() {
        return localStorage.getItem('userID') || '';
    }
    function _clearUserID() {
        localStorage.removeItem('userID');
    }

    function _setMajor(major) {
        localStorage.setItem('major', major);
    }
    function _getMajor() {
        return localStorage.getItem('major') || '';
    }
    function _clearMajor() {
        localStorage.removeItem('major');
    }

    function _checkOut() {
        _clearUserName();
        _clearUserID();
        _clearScore();
        _clearMajor();
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
        checkOut: _checkOut
    }
})();
export default LocalStorageService;