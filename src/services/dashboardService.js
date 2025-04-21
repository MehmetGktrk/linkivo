exports.getAllShortLink = async(db, username) => {
    const linkCollection = db.collection('Links')

    const findShortLinks = await linkCollection.find({ linkOwner: username }).toArray();

    return { code: 200, message: 'success', links: findShortLinks }
}

exports.getShortLinkData = async(db, username, shortLink) => {
    const linkCollection = db.collection('Links')
    
    const findShortLink = await linkCollection.findOne({ linkOwner: username, shortLink: shortLink });

    if(!findShortLink){
        return { code: 400, message: 'Link not found.' }
    }

    return { code: 200, message: 'success', linkData: findShortLink }
}