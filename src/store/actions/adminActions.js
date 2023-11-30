import actionTypes from './actionTypes';
import { getAllCodeService, createNewUserService, getAllUsers,
     deleteUserService, editUserService, getTopDoctorHomeService } from '../../services/userService';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

export const createNewUser = (data) => {
    return async(dispatch, getState) => {
        try {
            let res = await createNewUserService(data)
            if (res && res.errCode === 0) {
                toast.success("🦄 Create a new user succeed!")
                dispatch(saveUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                toast.error("🦄 Create a new user error!")
                dispatch(saveUserFailed())
            } 
        } catch (error) {
            toast.error("🦄 Create a new user error!")
            dispatch(fetchRoleFailed())
            console.log("saveUserFailed error", error)
        }
    }
}
export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
})
export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})


export const fetchAllUserStart = () => {
    return async(dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL")

            if (res && res.errCode === 0) {
                // console.log('check getState: ',getState())
                dispatch(fetchAllUserSuccess(res.users.reverse()))
                // console.log('check getState: ',getState())
            } else {
                toast.error("Fetch all user error!")
                dispatch(fetchAllUserFailed())
            }
            
        } catch (error) {
            dispatch(fetchAllUserFailed())
            console.log("fetchRoleFailed error", error)
        }
    }
}

export const fetchAllUserSuccess= (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data
})
export const fetchAllUserFailed= () => ({
    type: actionTypes.FETCH_ALL_USER_FAILED
})

export const deleteAUser = (userId) => {
    return async(dispatch, getState) => {
        try {
            let res = await deleteUserService(userId)
            if (res && res.errCode === 0) {
                toast.success("🦄 Delete the user succeed!")
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                toast.error("🦄 Delete the user error!")
                dispatch(deleteUserFailed())
            } 
        } catch (error) {
            toast.error("🦄 Delete the user error!")
            dispatch(deleteUserFailed())
            console.log("saveUserFailed error", error)
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})

export const editAUser = (data) => {
    return async(dispatch, getState) => {
        try {
            let res = await editUserService(data)
            if (res && res.errCode === 0) {
                toast.success("🦄 Update the user succeed!")
                dispatch(editUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                toast.error("🦄 update the user error!")
                dispatch(editUserFailed())
            } 
        } catch (error) {
            toast.error("🦄 Update the user error!")
            dispatch(editUserFailed())
            console.log("saveUserFailed error", error)
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})
export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED
})


export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('')
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctors: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
                }) 
            }
        } catch (error) {
            console.log('FETCH_TOP_DOCTORS_FAILED: ', error)
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
            }) 
        }
    }
}