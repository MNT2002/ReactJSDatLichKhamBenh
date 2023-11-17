import actionTypes from './actionTypes';
import { getAllCodeService } from '../../services/userService';

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// })
export const fetchGenderStart = () => {
    return async(dispatch, getState) => {
        try {
            dispatch({
                type: actionTypes.FETCH_GENDER_START
            })

            let res = await getAllCodeService("GENDER")
            if (res && res.errCode === 0) {
                // console.log('check getState: ',getState())
                dispatch(fetchGenderSuccess(res.data))
                // console.log('check getState: ',getState())
            } else {
                dispatch(fetchGenderFailed())
            }
            
        } catch (error) {
            dispatch(fetchGenderFailed())
            console.log("fetchGenderFailed error", error)
        }
    }
   
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchPositionStart = () => {
    return async(dispatch, getState) => {
        try {
            let res = await getAllCodeService("POSITION")
            if (res && res.errCode === 0) {
                // console.log('check getState: ',getState())
                dispatch(fetchPositionSuccess(res.data))
                // console.log('check getState: ',getState())
            } else {
                dispatch(fetchPositionFailed())
            }
            
        } catch (error) {
            dispatch(fetchPositionFailed())
            console.log("fetchPositionFailed error", error)
        }
    }
}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED,
})

export const fetchRoleStart = () => {
    return async(dispatch, getState) => {
        try {
            let res = await getAllCodeService("ROLE")
            if (res && res.errCode === 0) {
                // console.log('check getState: ',getState())
                dispatch(fetchRoleSuccess(res.data))
                // console.log('check getState: ',getState())
            } else {
                dispatch(fetchRoleFailed())
            }
            
        } catch (error) {
            dispatch(fetchRoleFailed())
            console.log("fetchRoleFailed error", error)
        }
    }
}
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED,
})
