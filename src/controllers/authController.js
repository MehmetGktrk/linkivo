const authService = require('../services/authService');

exports.register = async(req, res) => {
    try {
        // Get parameters from request body
        const { username, email, password } = req.body;
        // Call authService.register function
        const result = await authService.register(req.db, req.time, username, email, password);
        // Return response
        return res.status(result.code).json({ code: result.code, message: result.message });
    } catch (err) {
        // If catch error
        console.error(err)
        return res.status(500).json({ type: 'error', message: 'An Unexpected Error Occurred' });
    }
}

exports.login = async(req, res) => {
    try {
        // Get parameters from request body
        const { username, password } = req.body;
        // Call authService.login function
        const result = await authService.login(req.db, username, password)
        // Return response
        return res.status(result.code).json({ code: result.code, message: result.message });
    } catch (err) {
        //If catch error
        console.error(err);
        return res.status(500).json({ type: 'error', message: 'An Unexpected Error Occurred' });        
    }
}