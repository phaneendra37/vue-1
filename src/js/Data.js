import axios from 'axios';

/**
 * Custom hook for making HTTP requests using Axios.
 * @param {string} method - HTTP method (get, put, post, delete)
 * @param {string} api - API endpoint
 * @param {object} data - Data to be sent with the request (optional)
 * @returns {Promise} Promise object representing the HTTP response
 */
export async function useData(method, api, data) {
    try {
        // API supported methods
        const supportedMethods = ['get', 'put', 'post', 'delete'];

        // API methods that need data to do operation
        const methodsRequiringData = ['put', 'post'];

        // API is not there will return error handler
        if (!api) throw new Error('API must need to specify');

        // if the provided method name is not support will return error handler
        if (!method || !supportedMethods.includes(method)) {
            throw Error('Method name needs to be specified and must be one of: get, put, post, delete')
        }

        // if the provided method empty or not specified will return error handler
        if (methodsRequiringData.includes(method) && (!data && !Object.keys(data)?.length)) {
            throw new Error("Data must be specified and it should not empty");
        }

        // if all params and method names are okay will make server request
        var response;

        // will make server request for the POST and PUT 
        if (methodsRequiringData.includes(method)) {
            response = await axios[method](api, data);
        }
        else {
            response = await axios[method](api);
        }
        // if the response data will contains the data will return it
        if (response && response?.data) return response.data;
        else response
    }
    // if any runtime or server errors will handle here
    catch (error) {

        // let initialize the error message
        var error_message = 'An error occurred';

        // if any server errors will handle here
        if (error?.response?.data?.data?.message) {
            error_message = error?.response?.data?.data?.message
        }
        // if ant internal or network errors will handle here
        else if (error?.message) error_message = error?.message

        // if not above two will return normal error message
        throw new Error(error_message)
    }
}
