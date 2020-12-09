
// sign up
export const postUser = (user) => {
    return $.ajax({
        url: '/api/users',
        method: 'POST',
        data: { user }
    })
}

// log in
export const postSession = (user) => {
    return $.ajax({
        url: '/api/session',
        method: 'POST',
        data: { user }
    })
}

// log out
export const deleteSession = () => {
    return $.ajax({
        url: '/api/session',
        method: 'DELETE',
    })
}

//update

export const updateUser = (user) => {
    return $.ajax({
        url: `/api/users/${user.id}`,
        method: 'PATCH',
        data: { user }
    })
}

export const fetchUser = (userId) => {
    return $.ajax({
        url: `/api/users/${userId}`,
        method: 'GET'
    })
}