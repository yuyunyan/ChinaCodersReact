var authenticated = false;

export const PORT = 8111;
export const BASE_URL = 'http://'+ location.hostname + ':' + PORT;
export const EMAIL_REGEX = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

export function getErrorMessage(errorCode) {
    let errorText = errorCode == 'BAD_PAYLOAD'			    ? 	'Bad data sent to server' 					:
                    errorCode == 'BAD_LOGIN_DATA'		    ? 	'Email address or password is incorrect'	:
                    errorCode == 'BAD_EMAIL_PROVIDED'		?	'Please enter a proper email address'		:
                    errorCode == 'INTERNAL_ERROR'		    ? 	'Internal error. Please try again'			:
                    errorCode == 'USER_EXISTS'				?	'User already exists with this email'		:
                    errorCode == 'NOT_CONNECT_TO_SERVER'	? 	'Cannot connect to server'					:
										                        ''                  						;
    return errorText;
}

export function getAuthenticated() {
    let web_user = getCookie("web_user");
    return Boolean(web_user)
}

export function ajax(method, url, payload, successCB, errorCB) {
    var request = new Request(url, {
        method: method, 
        mode: 'cors', 
        redirect: 'follow',
        credentials: 'include', 
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(payload)
    });

    fetch(request)
    .then((response)=>{return response.json()})
    .then(successCB)
    .catch(errorCB)
}

function getCookie(name)  {
    var r = document.cookie.match("\\b" + name + "=([^;]*)\\b");
    return r ? r[1] : undefined;
}