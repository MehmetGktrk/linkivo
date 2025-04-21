exports.getShortLink = async(db, shortLink) => {
    // Define collection name
    const linkCollection = db.collection('Links');

    // Find shortLink
    const findShortLink = await linkCollection.findOne({ shortLink: shortLink });

    // Check if the link exists.
    if(!findShortLink){
        console.log(findShortLink)
        return { code: 400, message: 'Link not found.' }
    }

    // Check if the link is active.
    if(!findShortLink.isActive){
        return { code: 400, message: 'This link has been deactivated.' }
    }

    // Update visitors count
    const updateVisitors = await linkCollection.updateOne({ shortLink: shortLink }, {
        $inc: {
            visitors: +1
        }
    })

    // Return response
    return { code: 200, message: 'Link access successful.', link: findShortLink.defaultLink, qr: findShortLink.qrLink };


} 