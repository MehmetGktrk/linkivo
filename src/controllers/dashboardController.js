const dashboardService = require("../services/dashboardService")

exports.getAllShortLink = async(req, res) => {
    try {
        const { username } = req.params;
        const result = await dashboardService.getAllShortLink(req.db, username);
        return res.status(result.code).json({ code: result.code, message: result.message, links: result.links })
    } catch (err) {
        console.error(err);
        return res.status(500).json({ type: 'error', message: 'An Unexpected Error Occurred' })
    }
}

exports.getShortLinkData = async(req, res) => {
    try {
        const { username, shortLink } = req.params;
        const result = await dashboardService.getShortLinkData(req.db, username, shortLink);
        return res.status(result.code).json({ code: result.code, message: result.message, linkData: result.linkData })
    } catch (err) {
        console.error(err);
        return res.status(500).json({ type: 'error', message: 'An Unexpected Error Occurred' })
    }
}