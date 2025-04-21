


exports.createLink = async(db, now, username, defaultLink, shortLink) => {
    // Define Collection Name
    const linkCollection = db.collection('Links');
    // Check shortLink is in use ?
    const checkAvailable = await linkCollection.findOne({ shortLink: shortLink });

    // If in use
    if(checkAvailable){
        return { code: 400, message: 'This short link is already in use.' };
    }

    // Function to check if the link is valid 
    function checkLink(param){
        try {
            const url = new URL(param);
            return url.protocol === "http:" || url.protocol === "https:";
        } catch {
            return false;
        }
    }

    // éCheck if the link is valid.
    if(!checkLink(defaultLink)){
        return { code: 400, message: 'Link is invalid' }
    }

    // define ShortLink data
    const newShortLink = {
        linkOwner: username,
        isActive: true,
        defaultLink: defaultLink,
        shortLink: shortLink,
        createdTime: now,
        visitors: 0
    }

    // Save shortLink
    const saveLink = await linkCollection.insertOne(newShortLink);

    // Check if it was saved.
    if(saveLink.insertedId){
        return { code: 200, message: 'The link has been shortened.'};
    }
    else{
        return { code: 400, message: 'The link could not be shortened.' };
    }
}

exports.deleteLink = async(db, username, shortLink) => {
    // Define collection name
    const linkCollection = db.collection('Links');
    // Check shortLink is in use ?
    const checkLink = await linkCollection.findOne({ linkOwner: username, shortLink: shortLink });

    // Check if the link exists.
    if(!checkLink){
        return { code: 400, message: 'Link not found.' };
    }

    // Delete shortLink
    const deleteLink = await linkCollection.deleteOne({ shortLink: shortLink });
    // Check if it was deleted.
    if(deleteLink.deletedCount){
        return { code: 200, message: 'Short link has been deleted.' };
    }
    else{
        return { code: 400, message: 'Short link could not be deleted.' };
    }
}

exports.deactiveLink = async(db, username, shortLink) => {
    //Define collection name
    const linkCollection = db.collection('Links');
    // Define filter for find shortLink
    const filter = { linkOwner: username, shortLink: shortLink }

    // Seacrh shortLink
    const linkDocument = await linkCollection.findOne(filter);

    // Check if the link is available.
    if(!linkDocument){
        return { code: 400, message: 'Link not found.' };
    }

    // Check if the link is active.
    if(!linkDocument.isActive){
        return { code: 400, message: 'The link is already inactive.' };
    }

    // Update to deactive.
    const inactiveLink = await linkCollection.updateOne(filter, {
        $set: {
            isActive: false
        }
        }, { upsert: false }
    )

    // Check if it has been updated.
    if(inactiveLink.modifiedCount){
        return { code: 200, message: 'The link has been deactivated.' };
    }
    else{
        return { code: 400, message: 'The link could not be deactivated.' };
    }
}


