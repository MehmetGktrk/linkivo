
exports.register = async(db, now, username, email, password) => {
    // Define Users collection
    const userCollection = db.collection('Users');

    // Check if the user is already registered.
    const checkUser = await userCollection.findOne({
        $or: [
            { username: username },
            { email: email }
        ]
    })

    // If the user is already registered
    if(checkUser){
        // If the username matches
        if(checkUser.username == username && checkUser.email != email){
            return { code: 409, message: 'This username is already in use.' };
        }
        // If the email matches
        else if(checkUser.email == email && checkUser.username != username){
            return { code: 409, message: 'This email is already in use.' };
        }
        // If the email and username matches
        else{
            return { code: 409, message: "Username and email are already in use."}
        }
    }

    // Create new user data
    const newUser = {
        username: username,
        email: email,
        password: password,
        registerDate: now,
        activeURL: 0
    }

    // Insert new user to "Users" collection
    const registerUser = await userCollection.insertOne(newUser);

    // Check if the user was inserted 
    if(registerUser.insertedId){
        return { code: 200, message: 'The user has been registered' };
    }
    else{
        return { code: 400, message: 'An error occurred while registering the user.' };
    }
}


exports.login = async(db, username, password) => {
    // Define Users Collection
    const userCollection = db.collection('Users');

    // Find user
    // Note: The "username" parameter can also accept an email.
    const user = await userCollection.findOne({
        $or: [
            { username: username },
            { email: username },
        ]
    });


    // If user not found
    if(!user){
        return { code: 401, message: 'User not found.' }
    }
    // If user found
    else{
        // Check password
        if(user.password == password){
            return { code: 200, message: 'Login Successful'}
        }
        else{
            return { code: 400, message: 'Incorrect password.' }
        }
    }
}