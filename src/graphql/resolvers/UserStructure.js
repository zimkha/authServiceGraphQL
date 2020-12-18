const bcrypt      = require('bcrypt-nodejs');
const tokenAccess = require('./token')
const User = require('../../models/UserStructureModel')

class UserController {
    constructor(model){
        this.model = User();
    }
     authenticate(options){
        return User.findOne({phone: options.phone})
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
        const record = new User(data);
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
        return User.find()
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
        return User.findOne({_id: user.id})
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
    getOne(user){
        return User.findOne({_id: user.id})
        .exec()
        .then((record) => {
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
    resetPassword(data){
        if(!data.password || !data.phone){
            return "unexpected data, please check the password or the number phone";
        }
        return this.model.findOne({phone : data.phone})
            .exec()
                .then((record) => {
                    record.password = data.password
                    return record.save()
                        .then(user => {
                            return user
                        })
                         .catch((err) => {
                             return err
                         })
                })
                .catch((err) => {
                    return err
                })
    }

}

const user_controller = new UserController;

module.exports = user_controller;