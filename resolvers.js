const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const HospitalModel = require('./models/hospital')
const Wards = require('./models/wards')
const Doctors = require('./models/doctors')
const Beds = require('./models/beds')
const Admins = require('./models/admins')
const User = require('./models/user')
const TempUser = require('./models/tempUser')
const PatientAdmit = require('./models/patientAdmit')
const PatientDischarge = require('./models/patientDischarge')

const resolvers = {

    getHospital: () => {
        return HospitalModel.find()
    },

    getSingleHospital: args => {
        return HospitalModel.findById({ _id: args.id })
    },

    getPendingHospitals: args => {
        return HospitalModel.find({ status: "Pending" })
    },

    getActiveHospital: args => {
        return HospitalModel.find({ status: "Active" })
    },


    createHospital: args => {

        return bcrypt.hash(args.input.password, 12)
            .then(hashedpassword => {
                const hospital = new HospitalModel({
                    hospitalName: args.input.hospitalName,
                    hospitalRegistrationNo: args.input.hospitalRegistrationNo,
                    hospitalType: args.input.hospitalType,
                    government: args.input.government,
                    address: args.input.address,
                    state: args.input.state,
                    district: args.input.district,
                    pincode: args.input.pincode,
                    website: args.input.website,
                    lognitude: args.input.lognitude,
                    latitude: args.input.latitude,
                    ownerName: args.input.ownerName,
                    ownerContactNo: args.input.ownerContactNo,
                    ownerEmail: args.input.ownerEmail,
                    password: hashedpassword,
                    status: args.input.status
                })
                return hospital.save()
            })
            .catch(err => {
                throw err;
            });

    },

    updateStatus: args => {
        return HospitalModel.findOneAndUpdate({ _id: args.id }, { status: args.status }, { new: true })
    },


    createWards: args => {
        return HospitalModel.findOne({ _id: args.id })
            .then(hospital => {
                if (!hospital) {
                    throw new Error('Hospital Not Found.');
                }
                const WardsData = new Wards({
                    hospitalId: args.id,
                    wardsName: args.WardInput.wardsName,
                    wardNo: args.WardInput.wardNo
                })
                return WardsData.save()
            })
    },

    createDoctors: args => {
        return HospitalModel.findOne({ _id: args.id })
            .then(hospital => {
                if (!hospital) {
                    throw new Error('Hospital Not Found.');
                }
                const DoctorsData = new Doctors({
                    hospitalId: args.id,
                    docName: args.DoctorInput.docName,
                    docReg: args.DoctorInput.docReg,
                    docSp: args.DoctorInput.docSp,
                    docWard: args.DoctorInput.docWard
                })
                return DoctorsData.save()
            })
    },


    createBeds: args => {
        return HospitalModel.findOne({ _id: args.id })
            .then(hospital => {
                if (!hospital) {
                    throw new Error('Hospital Not Found.');
                }
                const BedsData = new Beds({
                    hospitalId: args.id,
                    privateBeds: args.BedInput.privateBeds,
                    generalBeds: args.BedInput.generalBeds,
                    wardsName: args.BedInput.wardsName,
                })
                return BedsData.save()
            })
    },


    getWards: () => {
        return Wards.find()
    },

    getWardsById: args => {
        return Wards.find({ hospitalId: args.id })
    },

    getWardsByOwnId: args => {
        return Wards.findById({ _id: args.id })
    },
    getDoctorsByOwnId: args => {
        return Doctors.findById({ _id: args.id })
    },

    deleteWards: args => {
        return Wards.findByIdAndRemove(args.wardId)
    },

    getDoctors: () => {
        return Doctors.find()
    },

    deleteDoctor: args => {
        return Doctors.findByIdAndRemove(args.docId)
    },

    getBeds: () => {
        return Beds.find()
    },
    getBedsByOwnId: args => {
        return Beds.findById({ _id: args.id })
    },
    deleteBed: args => {
        return Beds.findByIdAndRemove(args.bedId)
    },

    getTempUser: () => {
        return TempUser.find()
    },

    otpVerify: (args) => {
        return TempUser.findOne({ hospitalId: args.hospitalId, otp: args.otp })
            .then(otp => {
                if (!otp) {
                    throw new Error('Otp Not Found.');
                }
                return otp

            })
    },

    getUser: args => {
        return User.find()
    },


    createAdmin: args => {
        return bcrypt.hash(args.AdminInput.password, 12)
            .then(hashedpassword => {
                const Admin = new Admins({
                    adminId: args.AdminInput.adminId,
                    password: hashedpassword,
                    role: args.AdminInput.role,
                });
                return Admin.save()
            })
            .catch(err => {
                throw err;
            });
    },

    adminLogin: async ({ loginId, password }) => {
        const admin = await Admins.findOne({ adminId: loginId });
        if (!admin) {
            throw new Error('Admin Not Exists');
        }

        const isEqual = await bcrypt.compare(password, admin.password);
        if (!isEqual) {
            throw new Error('Password Incorrect');
        }
        const token = jwt.sign({ adminUserId: admin.id, loginId: admin.adminId }, 'superAdminSecretKey', {
            expiresIn: '1h'
        })
        return {
            adminId: admin.adminId,
            token: token,
            tokenExpiration: '1h'
        }

    },

    hospitalLogin: async ({ hosId, password }) => {
        const hospital = await HospitalModel.findOne({ hospitalRegistrationNo: hosId });
        if (!hospital) {
            throw new Error('Hospital Not Exists');
        }

        const isEqual = await bcrypt.compare(password, hospital.password);
        if (!isEqual) {
            throw new Error('Password Incorrect');
        }
        const hosToken = jwt.sign({ hosUserId: hospital.id, hosId: hospital.hospitalRegistrationNo }, 'hospitalSecretKey', {
            expiresIn: '1h'
        })
        return {
            hosId: hospital.hospitalRegistrationNo,
            hosToken: hosToken,
            hosTokenExpiration: '1h'
        }

    },



    createUser: args => {
        const Users = new User({
            name: args.UserInput.name
        })
        return Users.save()

    },

    createTempUser: args => {
        return HospitalModel.findOne({ _id: args.id })
            .then(hospital => {
                if (!hospital) {
                    throw new Error('Hospital Not Found.');
                }
                const tempUserDetails = new TempUser({
                    hospitalId: args.id,
                    UserName: args.TempUserInput.UserName,
                    PatientName: args.TempUserInput.PatientName,
                    UserContect: args.TempUserInput.UserContect,
                    UserAadhar: args.TempUserInput.UserAadhar,
                    otp: args.TempUserInput.otp
                })
                return tempUserDetails.save()
            })


    },



    updateBeds: args => {
        return Beds.findOne({ hospitalId: args.hospitalId, wardsName: args.wardName })
            .then(wards => {
                if (!wards) {
                    const BedsData = new Beds({
                        hospitalId: args.hospitalId,
                        privateBeds: args.BedInput.privateBeds,
                        generalBeds: args.BedInput.generalBeds,
                        wardsName: args.BedInput.wardsName,
                    })
                    return BedsData.save()
                }
                const filter = { hospitalId: args.hospitalId, wardsName: args.wardName };
                const update = { privateBeds: args.BedInput.privateBeds, generalBeds: args.BedInput.generalBeds };
                return Beds.findOneAndUpdate(filter, update)

            })
    },

    updateDoctors: args => {
        return Doctors.findOne({ hospitalId: args.hospitalId, docId: args.docId })
            .then(docs => {
                if (!docs) {
                    const DocData = new Docs({
                        hospitalId: args.hospitalId,
                        docName: args.DoctorInput.docName,
                        docReg: args.DoctorInput.docReg,
                        docSp: args.DoctorInput.docSp,
                        docWard: args.DoctorInput.docWard
                    })
                    return DocData.save()
                }
                const filter = { hospitalId: args.hospitalId, wardsName: args.wardName };
                const update = { privateBeds: args.BedInput.privateBeds, generalBeds: args.BedInput.generalBeds };
                return Beds.findOneAndUpdate(filter, update)

            })
    },


    editWards: args => {
        return Wards.findOne({ _id: args.wardId })
            .then(wards => {
                if (!wards) {
                    throw new Error('Ward Not Found.');
                }
                const filter = { _id: args.wardId };
                const update = { wardsName: args.WardInput.wardsName, wardNo: args.WardInput.wardNo };
                return Wards.findOneAndUpdate(filter, update)

            })
    },

    editDoctors: args => {
        return Doctors.findOneAndUpdate({ _id: args.docId }, {
            docName: args.DoctorInput.docName,
            docReg: args.DoctorInput.docReg,
            docSp: args.DoctorInput.docSp,
            docWard: args.DoctorInput.docWard
        })
    },

    editBeds: args => {
        return Beds.findOneAndUpdate({ _id: args.bedId }, {
            privateBeds: args.BedInput.privateBeds,
            generalBeds: args.BedInput.generalBeds,
            wardsName: args.BedInput.wardsName,
        })
    },

    getWardsByHosId: (args) => {
        return Wards.find({ hospitalId: args.hospitalId })
            .then(ward => {
                if (!ward) {
                    throw new Error('Wards Not Found.');
                }
                return ward

            })
    },

    getBedsByHosId: (args) => {
        return Beds.find({ hospitalId: args.hospitalId })
            .then(bed => {
                if (!bed) {
                    throw new Error('Beds Not Found.');
                }
                return bed

            })
    },

    getDoctorsByHosId: (args) => {
        return Doctors.find({ hospitalId: args.hospitalId })
            .then(doc => {
                if (!doc) {
                    throw new Error('Doctors Not Found.');
                }
                return doc

            })
    },

    getBedTypeByHosId: (args) => {
        return Beds.findOne({ hospitalId: args.hospitalId, wardsName: args.wardName })
            .then(bedType => {
                if (!bedType) {
                    throw new Error('Bed Not Found.');
                }
                return bedType

            })
    },


    createPatientAdmit: args => {

        return HospitalModel.findOne({ _id: args.hospitalId })
            .then(hospital => {
                if (!hospital) {
                    throw new Error('Hospital Not Found.');
                }
                return Beds.findOne({ _id: args.bedId })
                    .then(bed => {
                        if (!bed) {
                            throw new Error('Bed Not Found.');
                        }
                        const patient = new PatientAdmit({
                            hospitalId: args.hospitalId,
                            bedId: args.bedId,
                            fname: args.input.fname,
                            lname: args.input.lname,
                            aadharNo: args.input.aadharNo,
                            contactNo: args.input.contactNo,
                            email: args.input.email,
                            dob: args.input.dob,
                            gender: args.input.gender,
                            marital: args.input.marital,
                            disease: args.input.disease,
                            age: args.input.age,
                            address: args.input.address,
                            state: args.input.state,
                            district: args.input.district,
                            city: args.input.city,
                            pincode: args.input.pincode,
                            ward: args.input.ward,
                            bedtype: args.input.bedtype

                        })
                        return patient.save()
                    })


            })

    },

    updateBedsByWardName: args => {
        return Beds.findOne({ hospitalId: args.hospitalId, wardsName: args.wardName })
            .then(bed => {
                if (!bed) {
                    throw new Error('Hospital Not Found.');
                }
                const filter = { hospitalId: args.hospitalId, wardsName: args.wardName };
                const update = { privateBeds: args.BedInput.privateBeds, generalBeds: args.BedInput.generalBeds };
                return Beds.findOneAndUpdate(filter, update)
            })
    },

    getAllAdmitPatient: (args) => {
        return PatientAdmit.find({ hospitalId: args.hospitalId })
            .then(hos => {
                if (!hos) {
                    throw new Error('Hospital Not Found.');
                }
                return hos
            })
    },

    getAdmitPatientByOwnId: args => {
        return PatientAdmit.findById({ _id: args.id })
    },

    updateAdmitBedPlus: args => {
        return Beds.findOne({ _id: args.bedId })
            .then(bed => {
                if (!bed) {
                    throw new Error('Bed Not Found.');
                }
                const filter = { _id: args.bedId };
                const update = { privateBeds: args.BedInput.privateBeds, generalBeds: args.BedInput.generalBeds };
                return Beds.findOneAndUpdate(filter, update)
            })
    },


    createPatientDischarge: args => {

        return HospitalModel.findOne({ _id: args.hospitalId })
            .then(hospital => {
                if (!hospital) {
                    throw new Error('Hospital Not Found.');
                }
                return Beds.findOne({ _id: args.bedId })
                    .then(bed => {
                        if (!bed) {
                            throw new Error('Bed Not Found.');
                        }
                        const patientDis = new PatientDischarge({
                            hospitalId: args.hospitalId,
                            bedId: args.bedId,
                            fname: args.input.fname,
                            lname: args.input.lname,
                            aadharNo: args.input.aadharNo,
                            contactNo: args.input.contactNo,
                            email: args.input.email,
                            dob: args.input.dob,
                            gender: args.input.gender,
                            marital: args.input.marital,
                            disease: args.input.disease,
                            age: args.input.age,
                            address: args.input.address,
                            state: args.input.state,
                            district: args.input.district,
                            city: args.input.city,
                            pincode: args.input.pincode,
                            ward: args.input.ward,
                            bedtype: args.input.bedtype

                        })
                        return patientDis.save()
                    })


            })

    },

    deleteAdmitPatient: args => {
        return PatientAdmit.findByIdAndRemove({ _id: args.patientId })
    },

}

export default resolvers;

