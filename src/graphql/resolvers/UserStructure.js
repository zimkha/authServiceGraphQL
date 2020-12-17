const bcrypt      = require('bcrypt-nodejs');
const tokenAccess = require('./token')
const UserModel = require('../types/StructureUserType')

class UserController {
    constructor(model){
        this.model = UserModel();
    }
     authenticate(options){
        return this.model.findOne({phone: options.phone})
                .exec()
                    .then((user) => {
                        if(!user)  return new Error('Invalid login credentials.');
                        if(bcrypt.compareSync(options.password, patient.password)){
                            return tokenAccess.includeAccessToken(user)
                        }
                        else{
                            return new Error('Invalid login credentials.');
                        }
                    }).catch(error => {
                        return error;
                    });
    }
     create(data){
        const record = new this.model(data);
        return record.save()
            .then((patient) => {
                return patient.save()
                    .then(updated => {
                        return includeAccessToken(updated);
                    })
                    .catch((error) => {
                        return error;
                    });
            })
            .catch((error) => {
                return error;
            });
    }
     all(){
        return this.model.find()
        .sort('createdAt')
        .exec()
        .then(records => {
            return records;
        })
        .catch(error => {
            return error;
        });
    }
     update(user, data) {
        return this.model.findOne({_id: user.id})
            .exec()
            .then((record) => {
                 if(data.password != null){
                     record.password = password;
                 }
                 this.updateData(record, data);
                return record.save()
                    .then(user => {
                        return user
                    })
                    .catch((error) => {
                        return error;
                    });

            })
            .catch((error) => {
                return error;
            });
    }

    updateData(record, data) 
    {
                 if(data.phone) record.phone = data.phone;
                 if(data.email) record.email = data.email;
                 if(data.role) record.role = data.role;
                 if(data.firstname) record.firstname = data.firstname;
                 if(data.lastname) record.lastname = data.lastname;
    }

}

const user_controller = new UserController;

module.exports = user_controller;