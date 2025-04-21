const getLinkService = require('../services/getLinkService')

exports.getShortLink = async(req, res) => {
    try {
        // Get parameter from req.params.
        const { shortLink } = req.params;
        // Call getLinkService.getShortLink function.
        const result = await getLinkService.getShortLink(req.db, shortLink);
        // Return response to user.
        return res.status(result.code).json({ code: result.code, message: result.message, link: result.link, qr: result.qr });
    } catch (err) {
        // If catch error.
        console.error(err);
        return res.status(500).json({ type: 'error', message: 'An Unexpected Error Occurred' });
        
    }
}