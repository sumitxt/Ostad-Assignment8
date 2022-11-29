const listModel = require('../models/listModel')
exports.toDoer = (req, res) => {
    let userName = req.headers['userName']
    // let reqBody=req.body;
    // let subject=reqBody['subject'];
    // let description=reqBody['description'];
    // let status=reqBody['status'];

    let { subject, description, status } = req.body
    let creationDate = Date.now()
    let updateDate = Date.now()
    let postBody = {
        userName: userName,
        subject: subject,
        description: description,
        status: status,
        creationDate: creationDate,
        updateDate: updateDate
    }
    listModel.create(postBody, (error, data) => {
        if (error) {
            res.status(402).json({ status: "Unsuccessful", data: error })
        } else {
            res.status(200).json({ staus: "Success", data: data })
        }
    })
}

exports.view = (req, res) => {
    let userName = req.headers['userName']
    listModel.find({ userName: userName }, { upsert: false }, (error, data) => {
        if (error) {
            res.status(401).json({ status: "Unauthorized", data: error })
        } else {
            res.status(200).json({ status: "Success", data: data })
        }
    }
    )
}


exports.updater = (req, res) => {
    let userName = req.headers['userName']
    let { subject, description, status, id } = req.body
    let updateDate = Date.now()
    updateBody = {
        subject: subject,
        description: description,
        status: status,
        updateDate: updateDate
    }
    listModel.updateOne({$and:[{_id:id},{userName:userName}]}, { $set: updateBody }, (error, data) => {
        if (error) {
            res.status(404).json({ status: 'Failed', data: error })
        }
        else if (data.acknowledged === false) {
            res.status(401).json({ status: 'Failed', data: "Could not modify" })

        } else if (data.modifiedCount == 0) {
            res.status(401).json({ status: 'Failed', data: "Modification failed" })

        } else if (data.modifiedCount == 1) {
            res.status(202).json({ status: 'Congratulations!', data: "Successfully modified" })  //We will get this result for almost everytime because of updateDate
        }
        else {
            res.status(200).json({ status: 'Updated', data: data })

        }
    })
}

exports.status = (req, res) => {
    let userName = req.headers['userName']
    let { status, id } = req.body
    let updateDate = Date.now()
    updateStatus = {
        status: status,
        updateDate: updateDate
    }
    listModel.updateOne({$and:[{_id:id},{userName:userName}]}, { $set: updateStatus }, (error, data) => {
        if (error) {
            res.status(404).json({ status: 'Failed', data: error })
        }
        else if (data.acknowledged === false) {
            res.status(401).json({ status: 'Failed', data: "Could not modify" })

        } else if (data.modifiedCount == 0) {
            res.status(401).json({ status: 'Failed', data: "Modification failed or Wrong User" })

        } else if (data.modifiedCount == 1) {
            res.status(202).json({ status: 'Congratulations!', data: "Successfully modified" })
        }
        else {
            res.status(200).json({ status: 'Updated', data: data })

        }
    })
}

exports.deleter = (req, res) => {
    let userName = req.headers['userName']
    let id = req.body['id']
    listModel.deleteOne({$and:[{_id:id},{userName:userName}]}, (error, data) => {
        if (error) {
            res.status(404).json({ status: 'Failed', data: error })
        } else if (data.deletedCount == 0) {
            res.status(401).json({ status: 'Failed', data: "Already deleted or Doesn't exist or Wrong User" })

        } else if (data.deletedCount == 1) {
            res.status(202).json({ status: 'Congratulations!', data: "Successfully deleted" })  
        } else {
            res.status(200).json({ status: 'Deleted', data: data })

        }
    })
}


exports.statusFilter = (req, res) => {
    let userName = req.headers['userName']
    //console.log(userName)
    let status = req.body['status']
    //console.log(status)
    const todo = listModel.find({ userName: userName, status: status }, (error, data) => {
        if (error) {
            res.status(400).json({ status: 'Failed', data: error })
        } 
        else {
            res.status(200).json({ status: 'Filtered', data: data })
        }
    })

}

exports.dateFilter = (req, res) => {
    let userName = req.headers['userName']
    let { lowRange, highRange } = req.body
    const todo = listModel.find({ userName: userName, creationDate: { $gte: new Date(lowRange), $lte: new Date(highRange) } }, (error, data) => {
        if (error) {
            res.status(400).json({ status: 'Failed', data: error })
        } else {
            res.status(200).json({ status: 'Successful', data: data })
        }
    })
}