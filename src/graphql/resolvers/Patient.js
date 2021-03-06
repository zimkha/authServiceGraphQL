const Patient = require('../../models/PatientModel');
const bcrypt      = require('bcrypt-nodejs');
const {includeAccessToken} = require('./token')


class PatientController {
    constructor(model){
        this.model = Patient();
    }


    authenticate(options){
        return Patient.findOne({phone: options.phone})
                .exec()
                    .then((patient) => {
                        if(!patient)  return new Error('Invalid login credentials.');
                        if(bcrypt.compareSync(options.password, patient.password)){
                            return includeAccessToken(patient)
                        }
                        else{
                            return new Error('Invalid login credentials.');
                        }
                    }).catch(error => {
                        return error;
                    });
    }

      allPatients() {
        return Patient.find()
            .sort('createdAt')
            .exec()
            .then(records => {
                return records;
            })
            .catch(error => {
                return error;
            });
    }
     create(data) {
        const record = new Patient(data);
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
     hashPassword (password, saltRounds = 10){
        try {
            // Generate a salt
            const salt =  bcrypt.genSalt(saltRounds);
    
            // Hash password
            return  bcrypt.hash(password, salt);
        } catch (error) {
            console.log(error);
        }
    
        // Return null if error
        return null;
    }
     update(user, data) {
        return Patient.findOne({_id: user.id})
            .exec()
            .then((record) => {
                 if(data.password != null){
                     record.password = password;
                 }
                 if(data.phone) record.phone = data.phone;
                 if(data.email) record.email = data.email
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
    getOne(user){
        return Patient.findOne({_id: user.id})
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
        return Patient.findOne({phone : data.phone})
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

const patient_ctrl  = new PatientController();
module.exports = patient_ctrl;




