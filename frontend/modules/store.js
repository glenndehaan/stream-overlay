import createUnistore from 'unistore';
import devtools from 'unistore/devtools';

/**
 * Exports the store with the default state
 *
 * @return {any}
 */
const createStore = () => {
    const initialState = {
        news: [],
        weather: {}
    };

    return process.env.NODE_ENV === 'production' ?  createUnistore(initialState) : devtools(createUnistore(initialState));
};

/**
 * All action for mutating the store
 *
 * @return {*}
 */
const actions = () => {
    return {
        setSocketData(state, payload) {
            return {
                news: payload.news
            };
        }
    };
};

export { actions };
export default createStore();
