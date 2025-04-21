const linkService = require('../services/linkService');


exports.createLink = async(req, res) => {
    try {
        // Get parameters from request body.
        const { username, defaultLink, shortLink } = req.body;
        // Call linkService.createLink function
        const result = await linkService.createLink(req.db, req.time, username, defaultLink, shortLink);
        // Return response to user.
        return res.status(result.code).json({ code: result.code, message: result.message });
    } catch (err) {
        // If catch error
        console.error(err);
        return res.status(500).json({ type: 'error', message: 'An Unexpected Error Occurred' });
    }
} 

exports.deleteLink = async(req,res) => {
    try {
        // Get parameters from request body.
        const { username, shortLink } = req.body;
        // Call linkService.deleteLink function
        const result = await linkService.deleteLink(req.db, username, shortLink);
        // Return response to user.
        return res.status(result.code).json({ code: result.code, message: result.message });
    } catch (err) {
        // If catch error
        console.error(err);
        return res.status.json({ type: 'error', message: 'An Unexpected Error Occurred' });
    }
}

exports.deactiveLink = async(req, res) => {
    try {
        // Get parameters from request body.
        const { username, shortLink } = req.body;
        // Call linkService.deactiveLink function
        const result = await linkService.deactiveLink(req.db, username, shortLink);
        // Return response to user.
        return res.status(result.code).json({ code: result.code, message: result.message });
    } catch (err) {
        // If catch error   
        console.error(err);
        return res.status(500).json({ type: 'error', message: 'An Unexpected Error Occurred' });
    }
}


