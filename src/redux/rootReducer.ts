import {combineReducers} from 'redux';
import authState from '../containers/Authentication/store/reducers';
import gameState from '../containers/Game/store/reducers';
import libraryState from '../containers/Library/store/reducers';
import pathsState from '../containers/Paths/store/reducers';
import performanceState from '../containers/Performance/store/reducers';
import settingsState from '../containers/Settings/store/reducers';

export default combineReducers({
    authState,
    gameState,
    libraryState,
    pathsState,
    performanceState,
    settingsState
});
